import axios from './MainApi';

class Category {

//   for category 
static createCategory(data) {
    return axios().post(`add-category`,data);
  }
  static editCategory(data){
    return axios().post(`category-edit`,data);

  }
  static deleteCategory(id) {
    return axios().post(`delete-category/${id}`);
  }
  
   static getCategories() {
     return axios().get(`get-category`);
   }
  
}
export default Category
