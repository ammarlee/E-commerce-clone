import axios from "./MainApi";

class Order {
  // THE CARD ROUTES

  //    orders routes
  static getOrders(userId) {
    return axios().get(`get/orders/${userId}`);
  }
  static changeOrderState(data) {
    return axios().post(`changestate`, data);
  }
  static getSingleOrders(id) {
    return axios().get(`get/single-order/${id}`);
  }
  static downloadOrder(order) {
    return axios().post(`download`, { orders: order });
  }
  static makeOrder(payload) {
    console.log(payload);
    return axios().post(`make/makeOrder`, payload);
  }
}
export default Order;
