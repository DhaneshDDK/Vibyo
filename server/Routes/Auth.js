const router = require("express").Router();
const {Login, Register,Remove, Logout, ResendOTP, VerifyOTP, UpdateProfile} = require('../Controllers/Registration.js');
const {verifyToken} = require('../Middlewares/Auth.js')

router.post("/login",Login);
router.post("/register",Register);
router.delete("/remove",Remove);
router.get("/logout",Logout);
router.post('/updateProfile', verifyToken, UpdateProfile)

router.get('/verifyToken',verifyToken,(req,res)=>{
    res.status(200).json({
        message : "You can access this route",
        user : req.user
    })
})

router.get('/resendOTP', (req,res,next)=>{req.otp = true; next()}, verifyToken, ResendOTP)
router.post('/verifyOTP', (req,res,next)=>{req.otp = true; next()}, verifyToken, VerifyOTP)


module.exports = router;