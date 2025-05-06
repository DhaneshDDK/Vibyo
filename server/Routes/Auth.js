const router = require("express").Router();
const {Login} = require('../Controllers/Registration.js');

router.post("/login",Login);

module.exports = router;