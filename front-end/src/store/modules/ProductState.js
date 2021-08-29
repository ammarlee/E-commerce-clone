import productsFunctions from "../../../server/Products-Api";
const state = {
  products: null,
};
const getters = {
  getProducts(state) {
    return state.products;
  },
  // get single product with id
  singleProduct(state) {
    return (singleId) => {
      return state.products.find((p) => {
        return p._id == singleId;
      });
    };
  },
};
const mutations = {
  pushProduct(state, payload) {
    state.products.posts.push(payload);
  },
  removeProduct(state, payload) {
    const posts = state.products.posts.filter((p) => {
      return p._id !== payload;
    });
    state.products.posts = posts;
  },
  setProducts(state, payload) {
    state.products = payload;
  },
  getProducts(state, data) {
    state.products = data;
  },
};
const actions = {
  removeProduct({ commit }, payload) {
    commit("removeProduct", payload);
  },
  pushProduct({ commit }, payload) {
    commit("pushProduct", payload);
  },
  // CREATE NEW PRODUCT AND THEN ADD IT TO THE DATABASE
  async creatProduct({ commit }, payload) {
    try {
      let newone = await productsFunctions.postProduct(payload);

      commit("setProducts", newone);
    } catch (err) {
      console.log(err);
    }
  },
  // DELETE A SINGLE PRODUCT FROM THE DATABASE
  async deleteProduct({ dispatch }, id) {
    try {
      await productsFunctions.deleteProduct(id);
      dispatch("getProducts");
    } catch (err) {
      console.log(err);
    }
  },
  // FETCH ALL PRODUCTS FROM DATABASE
  async getProducts({ commit, dispatch }) {
    try {
      const data = await productsFunctions.fetchProducts();
      commit("setProducts", data.data);
      await dispatch("fetchCategory");
    } catch (error) {
      console.log(error);
      commit("setErros", error);
    }
  },
};
export default {
  state,
  getters,
  mutations,
  actions,
};
