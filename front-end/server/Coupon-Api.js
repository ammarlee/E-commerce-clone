import axios from './MainApi';

class Category {

//   for category 
static createCoupon(data) {
    return axios().post(`create-coupon`, { percentage:data.percentage});
  }
  static editCoupon(data){
    return axios().post(`edit-coupon`,data);

  }
  static deleteCoupon(id) {
    return axios().post(`delete-coupon/${id}`);
  }
  
  static checkCoupon(data) {
    return axios().post(`checkCoupon`,data);
  }
  
   static getCoupons() {
     return axios().get(`fetch-coupons`);
   }
  
}
export default Category
