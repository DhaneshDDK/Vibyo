const USER = require('../../Models/User');
const {deleteRefreshTokenByUserId} = require('./Token');
const {deleteOTP} = require('./OTP')

exports.InsertUser = async (user) => {
    try {
        const newUser = new USER(user);
        await newUser.save();
        return newUser.toObject();
    } catch (error) {
        console.error("Error inserting user:", error);
        throw error;
    }
}

exports.GetUserByEmail = async (email) => {
    try {
        const user = await USER.findOne({ email:email }).lean();
        return user;    
    }
    catch (error) {
        console.error("Error fetching user by email:", error);
        throw error;
    }   
}

exports.DeleteUserByUserId = async (userId) => {
    try {
        deleteOTP(userId);
        deleteRefreshTokenByUserId(userId);
        const user = await USER.findOneAndDelete
        ({ _id : userId }).lean();
        return user;        
    }
    catch (error) {
        console.error("Error deleting user by email:", error);
        throw error;
    }
}

exports.updateUserProfile = async (userId, updateData) => {
  try {
    const disallowedFields = ['email', 'phone_number', 'password', '_id'];
    disallowedFields.forEach(field => delete updateData[field]);

    const user = await USER.findById(userId);
    if (!user) throw new Error('User not found');

    // Top-level direct fields
    const topFields = [
      'username', 'verified', 'display_name', 'profile_photo_url',
      'bio', 'is_online', 'last_seen', 'is_discoverable'
    ];
    topFields.forEach(field => {
      if (updateData[field] !== undefined) {
        user[field] = updateData[field];
      }
    });

    // Handle top-level blocked_contacts (merge without duplicates)
    if (Array.isArray(updateData.blocked_contacts)) {
      updateData.blocked_contacts.forEach(id => {
        const exists = user.blocked_contacts.some(
          existing => existing.toString() === id.toString()
        );
        if (!exists) user.blocked_contacts.push(id);
      });
    }

    // Deep merge settings
    if (updateData.settings && typeof updateData.settings === 'object') {
      for (const [category, values] of Object.entries(updateData.settings)) {
        if (typeof values === 'object' && values !== null) {
          for (const [key, val] of Object.entries(values)) {
            user.settings[category][key] = val;
          }
        } else {
          user.settings[category] = values;
        }
      }
    }

    // Handle contacts (append new if not already added)
    if (Array.isArray(updateData.contacts)) {
      updateData.contacts.forEach(newContact => {
        const exists = user.contacts.some(
          c => c.contact_user.toString() === newContact.contact_user.toString()
        );
        if (!exists) user.contacts.push(newContact);
      });
    }

    await user.save();
    const updatedUser = await USER.findById(userId).lean();
    return updatedUser;

  } catch (err) {
    console.error('Error updating user profile:', err.message);
    throw new Error('Failed to update user profile');
  }
};
