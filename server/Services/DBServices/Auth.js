const USER = require('../../Models/User');

exports.InsertUser = async (user) => {
    try {
        const newUser = new USER(user);
        await newUser.save();
        return newUser;
    } catch (error) {
        console.error("Error inserting user:", error);
        throw error;
    }
}

exports.GetUserByEmail = async (email) => {
    try {
        const user = await USER.findOne({ email });
        return user;    
    }
    catch (error) {
        console.error("Error fetching user by email:", error);
        throw error;
    }   
}

exports.DeleteUserByEmail = async (email) => {
    try {
        const user = await USER.findOneAndDelete
        ({ email });
        return user;        
    }
    catch (error) {
        console.error("Error deleting user by email:", error);
        throw error;
    }
}