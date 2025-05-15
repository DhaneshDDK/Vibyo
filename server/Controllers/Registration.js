const {InsertUser, GetUserByEmail, DeleteUserByEmail} = require('../Services/DBServices/Auth.js');
const {generateAccessToken, generateRefreshToken, deleteRefreshToken} = require('../Services/DBServices/Token.js');
const bcrypt = require('bcryptjs');

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
            return {success : "false", message: 'Invalid password' };
        }
        const {password: _, ...userWithoutPassword} = user._doc;
        return {success : "true", message: 'Login successful', user: userWithoutPassword};       
}

exports.Login = async (req,res)=>{
    try {
        const loginResponse = await LoginChecker(req);
        if (loginResponse.success === "false") {
            return res.status(400).json({ error: loginResponse.message });
        }
        if(!loginResponse.user.verified) return res.status(403).json({message : "User is not verified"})
        const accessToken = generateAccessToken(loginResponse.user);
        const refreshToken = await generateRefreshToken(loginResponse.user);
        res.cookie('accessToken', accessToken, { httpOnly: true });
        res.cookie('refreshToken', refreshToken, { httpOnly: true });
        console.log('User logged in successfully:', loginResponse.user);
        res.status(200).json({message: 'Login successful', user: loginResponse.user});      
    } catch (error) {
        console.error('Error during login request:', error);
        res.status(500).json({ error: 'Failed to send login request' });
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

        if(!PasswordChecker(password)) {
            return res.status(400).json({ error: 'Password does not meet requirements' });
        }
        const existingUser = await GetUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
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

        res.cookie('accessToken', accessToken, { httpOnly: true});
        res.cookie('refreshToken', refreshToken, { httpOnly: true });
        res.status(200).json({message: 'Registration successful', user: userWithoutPassword});
    } catch (error) {
        console.error('Error during registration request:', error);
        res.status(500).json({ error: 'Failed to send registration request' });
    }
}

exports.Remove = async (req,res)=>{
    try {
        const loginResponse = await LoginChecker(req);
        if (loginResponse.success === "false") {
            return res.status(400).json({ message : "Deleting user is denied", error: loginResponse.message });
        }
        const {email} = req.body;
        const deletedUser = await DeleteUserByEmail(email);
        if (!deletedUser) {
            return res.status(400).json({ message : "Deleting user is denied", error: 'User not found' });
        }
        await LogoutService(req);
        res.status(200).json({message: 'User deleted successfully'});
    } catch (error) {
        console.error('Error during user deletion request:', error);
        res.status(500).json({ error: 'Failed to send user deletion request' });
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
        res.status(200).json({message: 'Logout successful'});
    } catch (error) {
        console.error('Error during logout request:', error);
        res.status(500).json({ error: 'Failed to send logout request' });
    }
}

