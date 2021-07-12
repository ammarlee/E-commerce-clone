import axios from './MainApi';

class Category {

//   for category 
static createCategory(data) {
    return axios().post(`createCategory`, { name: data.name, img: data.pic });
  }
  static deleteCategory(id) {
    return axios().post(`delete-category/${id}`);
  }
  
   static getCat() {
     return axios().get(`get-category`);
   }
  

}
export default Category
