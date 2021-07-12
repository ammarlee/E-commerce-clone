import axios from './MainApi';

class Card {
// THE CARD ROUTES 
  
static addTocart(payload) {
    return axios().post(`add/addCart`, payload);
  }
  static checkPayment(payload) {
    return axios().post(`checkPayment`,payload);
  }
  static getCardItems(payload) {
    return axios().get(`single/cart/${payload.userId}`);
  }
  static removeFromCard(productId) {
    return axios().post(`delete/cart`, productId);
  }

  static clearTheCart(cart) {
    return axios().post(`delete/clear`, cart);
  }

}
export default Card
