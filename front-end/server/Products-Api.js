import axios from './MainApi';

class Products {

//    THE PRODUCTS ROUTES 
static getAdminProducts(userId) {
    return axios().get(`admin/${userId}`);
  }
  static editProduct(formdata) {
    const id = formdata.get("id");
    return axios.post(`file/edit/${id}`, formdata);
  }

   static postProduct(product) {
    try {
      axios().post(`post`, product);
      return this.fetchProducts();
    } catch (error) {
      console.log(error);
    }
  }

  static deleteProduct(productId) {
    return axios().post(`${productId}`);
  }
  static getSingleProduct(id) {
    return axios().get(`p/${id}`);
  }

  static fetchProducts() {
    return axios().get(`zoom`);
  }
  static fetchUserProducts(user) {
    return axios().get(`user-products/${user._id}`);
  }

}
export default Products
