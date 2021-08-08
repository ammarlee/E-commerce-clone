const express = require('express')
const router = express.Router()
const PaymentsController = require('../controlles/payments/Payments.js')
const Protect = require('./protect/protect')


router.post('/create-session',PaymentsController.createSession)
router.post('/checkPayment',PaymentsController.checkPayment)

module.exports =router