const express = require('express');
const router = express.Router();

const {authCtrl, proCtrl, buyerCtrl } = require('../../controllers/index')
const {userMw,proMw } = require('../../middlewares/index')


router.get("/check" , (req, res) => {
  return res.json({ message: " Go Server is good to Go " });
});


// authentication 
router.post( "/signup", userMw.signupAndLogin, authCtrl.signup );
router.post( "/login", userMw.signupAndLogin, authCtrl.signin );
router.get( "/veriyToken", userMw.verifyToken, authCtrl.veriyToken );
router.post( "/refresh-token", userMw.verifyRefreshToken, authCtrl.refreshToken );
router.post( "/logout", authCtrl.logout );

// agent 
router.post( "/property",proMw.validateAdd,   proCtrl.add );
router.delete( "/property/:id", proMw.validateDelete, proCtrl.delete );
router.patch( "/property/:id", proMw.validateUpdate, proCtrl.update );
router.get( "/propertyAgent",  proCtrl.getAllByUserId );


// buyer 
router.post( "/favorite/:id",proMw.validateDelete, buyerCtrl.like   );
router.delete( "/favorite/:id",proMw.validateDelete,  buyerCtrl.dislike );
router.get( "/favorite",   buyerCtrl.favorite );

router.get( "/property",  proCtrl.getAll );
router.get( "/property/:id",   proCtrl.getById );


 
 
module.exports = router;