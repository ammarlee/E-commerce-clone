import axios from './MainApi';

class Order {
// THE CARD ROUTES 
 

//    orders routes 
static getOrders(userId) {
    return axios().get(`get/orders/${userId}`);
  }
  static getSingleOrders(id){
    return axios().get(`get/single-order/${id}`);

  }
  static downloadOrder(order) {
    return axios().post(`download`, { orders: order });
  }
  static makeOrder(payload) {
    return axios().post(`make/makeOrder`, payload);
  }
  

}
export default Order
