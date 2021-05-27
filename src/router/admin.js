import store from "../store";

export default (to, from, next) => {
  if (store.getters.getUser.email ==='ammarlee16@gmail.com')
  {
    next();
  } else {
    next("/");
  }
};
