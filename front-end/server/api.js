import axios from "./MainApi";

// const find= function readCookie(name) {
//     var nameEQ = name + "=";
//     var ca = document.cookie.split(';');
//     for(var i=0;i < ca.length;i++) {
//         var c = ca[i];
//         while (c.charAt(0)==' ') c = c.substring(1,c.length);
//         if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
//     }
//     return null;
// }


class Functions {

  static searchingbar(search) {
    return axios().post(`product/search`, { name: search });
  }

  static createReview(data) {
    return axios().post(`add-review`, data);
  }

  static getUserData(userId) {
    return axios().get(`userdata/${userId}`);
  }
  static updateUserData(data) {
    return axios().post(`userdata`, { pic: data.pic, profile: data.profile });
  }

}
export default Functions;
