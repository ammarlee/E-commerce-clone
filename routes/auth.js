const path = require('path')
var express = require('express');
var router = express.Router();
const AuthController=require(path.join(__dirname,'../controlles/auth/auth'))
const protectRoutes = require(path.join(__dirname,'./protect/protect'))
const { body, validationResult } = require("express-validator");
const { check } = require("express-validator");
const bycript = require('bcryptjs')
const User = require(path.join(__dirname,'../models/user'))


router.post('/user/signup',[
 
  body("email")
    .isEmail()
    .withMessage("it should be an valide email ")
    .custom((value) => {
      return User.find({ email: value }).then((user) => {
        if (user.email == value) {
          console.log(user);
          return Promise.reject("E-mail already in use");
        } 
      });
    }),
  body("password")
    .isLength({ min: 8, max: 20 })
    .withMessage("your passwor at least 7 numbers"),
],AuthController.signUp)
  router.post('/user/forget',AuthController.forForgetPassword)
  router.get('/user/:token',AuthController.getUserToken)
  router.post('/out/logout',AuthController.logOut)
  router.post('/user/login',[
    body("email")
      .isEmail()
      .withMessage("it should be an valide email ")
      .custom((value) => {
        return User.findOne({ email: value }).then((user) => {
          if (!user) {
            return Promise.reject("E-mail is not existe yet");
          }
        });
      }),
    body("password").custom((value, { req }) => {
      return User.findOne({ email: req.body.email }).then((user) => {
        if (user) {
          return bycript.compare(value, user.password).then((correct) => {
            if (correct) {
              return user ;
            } else {
              return Promise.reject("password is wrong ");
            }
          });
        }
      });
    }),
  ],AuthController.login)
module.exports = router;
