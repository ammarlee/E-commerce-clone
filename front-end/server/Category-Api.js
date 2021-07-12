import axios from './MainApi';

class Category {

//   for category 
static createCategory(data) {
  console.log(data);
    return axios().post(`add-category`, { name: data.name, img: data.pic });
  }
  static editCategory(data){
    return axios().post(`category-edit`,data);

  }
  static deleteCategory(id) {
    return axios().post(`delete-category/${id}`);
  }
  
   static getCat() {
     return axios().get(`get-category`);
   }
  
}
export default Category
