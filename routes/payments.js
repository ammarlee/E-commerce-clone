const express = require('express')
const path = require('path')
const router = express.Router()
const PaymentsController = require(path.join(__dirname,'../controlles/payments/Payments.js'))
const Protect = require(path.join(__dirname,'./protect/protect'))


router.post('/create-session',PaymentsController.createSession)
router.post('/checkPayment',PaymentsController.checkPayment)

module.exports =router