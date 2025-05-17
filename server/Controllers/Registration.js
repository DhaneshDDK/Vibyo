const {InsertUser, GetUserByEmail, DeleteUserByUserId, updateUserProfile} = require('../Services/DBServices/Auth.js');
const {generateAccessToken, generateRefreshToken, deleteRefreshToken} = require('../Services/DBServices/Token.js');
const bcrypt = require('bcryptjs');
const {SendOTP, FetchOTP} = require('../Services/OTPService/OTP.js')

const PasswordChecker = (password)=>{
    if(password.length < 8) return false;
    const hasUppercase = /[A-Z]/; // Uppercase letters
    const hasLowercase = /[a-z]/; // Lowercase letters
    const hasNumber = /[0-9]/;    // Numbers
    if(!hasUppercase.test(password) || !hasLowercase.test(password) || !hasNumber.test(password)) return false;
    return true;
}

const EmailChecker = (email)=>{
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

const LoginChecker = async (req)=>{
   const {email, password} = req.body;
        if(!email || !password) {
            return {success : "false", message: 'All fields are required' };
        }
        if(!EmailChecker(email)) {
            return {success : "false", message: 'Invalid email format' };
        }
        if(!PasswordChecker(password)) {
            return {success : "false", message: 'Password does not meet requirements' };
        }
        const user = await GetUserByEmail(email);
        if (!user) {
            return {success : "false", message: 'User not found' };
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return {success : "false", message: 'Incorrect password' };
        }
        const {password: _, ...userWithoutPassword} = user._doc;
        return {success : "true", message: 'Login successful', user: userWithoutPassword};       
}

exports.Login = async (req,res)=>{
    try {
        const loginResponse = await LoginChecker(req);
        if (loginResponse.success === "false") {
            return res.status(400).json({ message: loginResponse.message });
        }
        const accessToken = generateAccessToken(loginResponse.user);
        const refreshToken = await generateRefreshToken(loginResponse.user);
        res.cookie('accessToken', accessToken, { httpOnly: true });
        res.cookie('refreshToken', refreshToken, { httpOnly: true });
        if(!loginResponse.user.verified) return res.status(403).json({message : "User is not verified", user : loginResponse.user, token : accessToken})
        console.log('User logged in successfully:', loginResponse.user);
        return res.status(200).json({message: 'Login successful', user: loginResponse.user, token : accessToken});      
    } catch (error) {
        console.error('Error during login request:', error);
        return res.status(500).json({ error: 'Failed to send login request' });
    }
}

exports.Register = async (req,res)=>{
    try {
        const {username, email, password} = req.body;
        if(!username || !email || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        
        if(!EmailChecker(email)) {
            return res.status(400).json({ error: 'Invalid email format' });
        } 

        const existingUser = await GetUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        if(!PasswordChecker(password)) {
            return res.status(400).json({ error: 'Password does not meet requirements' });
        }

        const hashedPassword  = await bcrypt.hash(password, 10);    
        const newUser = await InsertUser({
            username : username,
            email : email,
            password : hashedPassword
        })

        if (!newUser) {
            return res.status(500).json({ error: 'Failed to create user' });
        }
        const {password: _, ...userWithoutPassword} = newUser._doc;
        console.log('User registered successfully:', userWithoutPassword);
        const accessToken = generateAccessToken(userWithoutPassword);
        const refreshToken = await generateRefreshToken(userWithoutPassword);
        SendOTP(userWithoutPassword.email,userWithoutPassword._id);
        res.cookie('accessToken', accessToken, { httpOnly: true});
        res.cookie('refreshToken', refreshToken, { httpOnly: true });
        return res.status(200).json({message: 'Registration successful', user: userWithoutPassword, token : accessToken});
    } catch (error) {
        console.error('Error during registration request:', error);
        return res.status(500).json({ error: 'Failed to send registration request' });
    }
}

exports.Remove = async (req,res)=>{
    try {
        const loginResponse = await LoginChecker(req);
        if (loginResponse.success === "false") {
            return res.status(400).json({ message : "Deleting user is denied", error: loginResponse.message });
        }
        const userId = loginResponse.user._id;
        const deletedUser = await DeleteUserByUserId(userId);
        if (!deletedUser) {
            return res.status(400).json({ message : "Deleting user is denied", error: 'User not found' });
        }
        return res.status(200).json({message: 'User deleted successfully'});
    } catch (error) {
        console.error('Error during user deletion request:', error);
        return res.status(500).json({ error: 'Failed to send user deletion request' });
    }
}

const LogoutService = async (req)=>{
    const {refreshToken} = req.cookies;
    if (!refreshToken) {
        return {success : "false", message: 'No refresh token provided' };
    }
    await deleteRefreshToken(refreshToken);
    return {success : "true", message: 'Logout successful'};
}

exports.Logout = async (req,res)=>{
    try {
        const logoutResponse = await LogoutService(req);
        if (logoutResponse.success === "false") {
            return res.status(400).json({ error: logoutResponse.message });
        }
        res.clearCookie('accessToken');
        res.clearCookie('refreshToken');
        console.log('User logged out successfully');
        return res.status(200).json({message: 'Logout successful'});
    } catch (error) {
        console.error('Error during logout request:', error);
        return res.status(500).json({ error: 'Failed to send logout request' });
    }
}

exports.ResendOTP = async (req,res)=>{
    try {
        console.log("sending")
        const {email,_id} = req.user;
        SendOTP(email,_id);
        return res.status(200).json({
            message : `Successfully sent OTP to ${email}`
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({message : "Error while resending OTP", error : error})
    }
}

exports.VerifyOTP = async (req,res)=>{
    try {
        const {otp} = req.body;
        const OTPFromDB = await FetchOTP(req.user._id);
        if(!OTPFromDB) return res.status(403).json({message : "OTP expired"})
        if(OTPFromDB.otp != otp) return res.status(403).json({message : "Invalid OTP"}) 
        const updatedUser = await updateUserProfile(req.user._id,{verified:true})
        return res.status(200).json({
            message : "OTP verified",
            user : updatedUser
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Failed verifying OTP"})
    }
}

exports.UpdateProfile = async (req,res)=>{
    try {
        const body = req.body;
        await updateUserProfile(req.user._id,body);
        return res.status(200).json({message : "Updated your profile"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message : "Error updating profile"});
    }
}