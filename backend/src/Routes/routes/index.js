const express = require('express');
const router = express.Router();

const {authCtrl } = require('../../controllers/index')
const {userMw, } = require('../../middlewares/index')


router.get("/check" , (req, res) => {
  return res.json({ message: " Go Server is good to Go " });
});


// authentication 
router.post( "/signup", userMw.signupAndLogin, authCtrl.signup );
router.post( "/login", userMw.signupAndLogin, authCtrl.signin );
router.get( "/veriyToken", userMw.verifyToken, authCtrl.veriyToken );
router.post( "/refresh-token", userMw.verifyRefreshToken, authCtrl.refreshToken );
router.post( "/logout", authCtrl.logout );



 
 
module.exports = router;