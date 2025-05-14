const router = require("express").Router();
const {Login, Register,Remove, Logout} = require('../Controllers/Registration.js');

router.post("/login",Login);
router.post("/register",Register);
router.delete("/remove",Remove);
router.get("/logout",Logout);

module.exports = router;