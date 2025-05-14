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
  let {accessToken} = req.cookies;
  try {
     if(!accessToken){
        await refreshAccessToken(req,res);
     }
     const user = verifyAccessToken(req.cookies?.accessToken);
     req.user = user;
     next();
  } catch (error) {
      const isAccessTokenRefreshed = await refreshAccessToken(req,res);
      if(isAccessTokenRefreshed) next();
      else{
        // res.clearCookie('accessToken');
        // res.clearCookie('refreshToken');
        res.status(500).json({ error: 'Invalid Token' });
      }
  }

}