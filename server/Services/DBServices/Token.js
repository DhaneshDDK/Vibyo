const Token = require('../../Models/Token');
const jwt = require('jsonwebtoken');
 
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

exports.generateAccessToken = (user)=>{
return jwt.sign(user, ACCESS_TOKEN_SECRET, { expiresIn: '1hr' });
}

exports.generateRefreshToken = async (user)=>{
  const refreshToken = jwt.sign(user, REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
  try {
    const existingToken = await Token.findOne({ user: user._id });
    if(existingToken){
        existingToken.refresh_token = refreshToken;
        existingToken.expires_at = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
        await existingToken.save();
    }else{
      const newToken = new Token({
      user: user._id,
      refresh_token: refreshToken,
      expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
      });
      await newToken.save();
    }
    return refreshToken;
  } catch (error) {
    console.error("Error inserting token:", error);
    throw error;
  }
}

exports.verifyAccessToken = async (token) =>{
    try {
        const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);
        const {GetUserByEmail} = require('./Auth')
        const user = await GetUserByEmail(decoded.email);
        if(!user) throw new Error("User not longer exists")
        return decoded;
    } catch (error) {
        console.error("Error verifying access token:", error);
        throw error;
    }
}

exports.verifyRefreshToken = async (token) =>{
    try {
        const decoded = jwt.verify(token, REFRESH_TOKEN_SECRET);
        const storedToken = await Token.findOne({ refresh_token: token });
        if (!storedToken) {
            throw new Error("Refresh token not found");
        }
        const {GetUserByEmail} = require('./Auth')
        const user = await GetUserByEmail(decoded.email);
        if(!user) throw new Error("User not longer exists")
        return decoded;
    } catch (error) {
        console.error("Error verifying refresh token:", error);
        throw error;
    }
}

exports.deleteRefreshToken = async (token) => {
    try {
        const deletedToken = await Token.findOneAndDelete({ refresh_token: token });
        if (!deletedToken) {
            throw new Error("Refresh token not found");
        }   
        return deletedToken;
    } catch (error) {
        console.error("Error deleting refresh token:", error);
        throw error;
    }   
}

exports.deleteRefreshTokenByUserId = async (userId) => {
    try {
        const deletedToken = await Token.findOneAndDelete({ user: userId });
        if (!deletedToken) {
            throw new Error("Refresh token not found");
        }   
        return deletedToken;
    } catch (error) {
        console.error("Error deleting refresh token:", error);
        throw error;
    }   
}

exports.fetchRefreshToken = async (token)=>{
    try {
        const refreshToken = await Token.findOne({refresh_token : token});
        if(!refreshToken) throw new Error("Refresh token not found");
        return refreshToken;
    } catch (error) {
        console.log("Error fetching the refresh token", error);
        throw error;
    }
}