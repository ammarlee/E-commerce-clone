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
  
  static deleteSubChildCategory(data) {
    return axios().post(`delete-sub-category`,data);
  }
  
   static getCategories() {
     return axios().get(`get-category`);
   }
   static addSubChildTOCategory(data){
    return axios().post(`add-sub-child`,data);
     
   }
   
   static editsubChild(data){
    return axios().post(`edit-sub-child`,data);
     
   }
  
}
export default Category
