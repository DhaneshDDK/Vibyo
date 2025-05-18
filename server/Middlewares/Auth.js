const {verifyAccessToken, verifyRefreshToken,generateAccessToken, fetchRefreshToken} = require('../Services/DBServices/Token');

const refreshAccessToken = async (req,res)=>{
    const {refreshToken} = req.cookies;
    try {
        console.log("Refreshing access token...")
        const user = await verifyRefreshToken(refreshToken);
        const refreshTokenFromDB = await fetchRefreshToken(refreshToken);
        if(refreshTokenFromDB.refresh_token !== refreshToken) {
            console.log("Tokens not matched")
        }
        const { iat, exp, ...userData } = user
        const newAccessToken = generateAccessToken(userData);
        req.user = user;
        res.cookie('accessToken', newAccessToken, { httpOnly: true });
        console.log("refreshed token")
        return true;
    } catch (error) {
        return false;
    }    
}
exports.verifyToken = async (req,res,next)=>{
  let accessToken = req.headers.authorization?.split(' ')[1] || req.cookies.token;
  try {
     if(!accessToken){
        await refreshAccessToken(req,res);
     }
     const user = await verifyAccessToken(accessToken);
     req.user = user;
     if(!user.verified && (!req.otp)) return res.status(403).json({message : "User is not verified", user : user})

     next();
  } catch (error) {
     if (error.name === 'JsonWebTokenError') {
          console.warn(`JWT error: ${error.message}`);
          return res.status(403).json({message : "Invalid token"})
     }
      const isAccessTokenRefreshed = await refreshAccessToken(req,res);
      if(isAccessTokenRefreshed) next();
      else{
        res.clearCookie('accessToken');
        res.clearCookie('refreshToken');
        return res.status(403).json({ error: 'Invalid Token' });
      }
  }

}