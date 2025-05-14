const router = require("express").Router();
const {Login, Register,Remove, Logout} = require('../Controllers/Registration.js');
const {verifyToken} = require('../Middlewares/Auth.js')

router.post("/login",Login);
router.post("/register",Register);
router.delete("/remove",Remove);
router.get("/logout",Logout);

router.post('/protectedRoute',verifyToken,(req,res)=>{
    res.status(200).json({
        message : "You can access this route",
        data : req.user
    })
})

module.exports = router;