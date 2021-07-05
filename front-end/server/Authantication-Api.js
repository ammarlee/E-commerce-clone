import axios from './MainApi';

// delete the cooki 

function eraseCookie() {   
    document.cookie = "TokenUser"+'=; Max-Age=-99999999;';  
}
class Authantication {
//   authantication routes
static getuserToken(token) {
    return axios().get(` user/${token}
    `);
  }
static updateUserPassword(data) {
    return axios().post(`changePassword`, {
      id: data.id,
      email: data.email,
      old: data.old,
      new: data.new,
    });
  }
  static resetPassword(data) {
    return axios().post(`resetAfterForget`, {
      password: data.password,
      user: data.user,
      token: data.token,
    });
  }
  static forgetPassword(payload) {
    return axios().post(`user/forget`, payload);
  }
  static singup({ ...user }) {
    return axios().post(`user/signup`, user);
  }
  static logOut() {
    eraseCookie("TokenUser");
    return axios().post(`out/logout`);
  }
  static login(user) {
    return axios().post(`user/login`, user);
  }
}
export default Authantication
