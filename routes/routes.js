const express = require('express')
const router = express.Router()
const passport= require('passport')
const userController = require('../controllers/userController')
const { AddProfile, FindAllProfiles, FindSingleProfile, DeleteProfile } = require("../controllers/profileController");
const {Testing,LoginRedux,RegisterRedux}= require('../controllers/userController')
const {inRole, ROLES } = require('../security/RoleMiddleware')
//les routes publique 
router.post('/loginRedux',LoginRedux)
router.post('/signupRedux',RegisterRedux)
/* add profile route */
router.post("/profiles", 
passport.authenticate("jwt", { session: false }),
AddProfile);
/* get all profiles */
router.get("/profiles", 
passport.authenticate("jwt", { session: false }),
inRole(ROLES.COORDINATRICE),
FindAllProfiles);
/* get one profiles */
router.get("/profile", 
passport.authenticate("jwt", { session: false }),
FindSingleProfile);
/* delete profiles */
router.delete("/profiles/:id", 
passport.authenticate("jwt", { session: false }),
inRole(ROLES.COORDINATRICE),
DeleteProfile);
//router.get('/test',Testing)
// les routes privés pour la coordinatrice
router.get('/test',passport.authenticate('jwt',{session:false}),inRole(ROLES.COORDINATRICE),Testing)
module.exports = router 