const express = require('express')
const router = express.Router()
const CouponController = require('../controlles/coupon/Coupon.js')
const Protect = require('./protect/protect')


router.post('/create-coupon',CouponController.createCoupon)
router.post('/checkCoupon',CouponController.checkCoupon)

router.get('/fetch-coupons',CouponController.fetchCoupons)
router.post('/edit-coupon',CouponController.editCoupon)

router.post('/delete-coupon/:id',CouponController.deleteCoupon)
router.post('/coupon-details',Protect.protect,CouponController.getCouponDetails)
router.post('/search-details',Protect.protect,CouponController.searchForDetails)

module.exports =router