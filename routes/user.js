const express=require('express');
const profileController=require('../controller/user_controll');

const router=express.Router();




router.get('/profile',profileController.profile);

router.get('/sign_in',profileController.signin);

router.get('/sign_up',profileController.signup);


// For the signing up
router.post('/create',profileController.create);


//for the signing in
router.post('/create-session',profileController.session);

router.get('/clear-cookie',profileController.Signout);
module.exports=router;