import axios from 'axios';
const url = "https://full-meven-stack.herokuapp.com/"
const find= function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}
function eraseCookie(name) {   
    document.cookie = name+'=; Max-Age=-99999999;';  
}
let axiosConfig = {
    headers: {
        'authorization':`Bearer ${find('TokenUser')}`
    }
  };

class Functions{
static async getUserData(userId){
        return await axios.get(`${url}userdata/${userId}`,axiosConfig)
    }
static async  updateUserData(data){
     
        return await axios.post(`${url}userdata`,{pic:data.pic,profile:data.profile})
           
   }
   static async  deleteCategory(id){
     
    return await axios.post(`${url}delete-category/${id}`)
       
}
   
static async  updateUserPassword(data){
    return await axios.post(`${url}changePassword`,
    {id:data.id,email:data.email,old:data.old,new:data.new,})
}
static async  resetAfterForget(data){
     
    return await axios.post(`${url}resetAfterForget`,
    {password:data.password,user:data.user,token:data.token})
       
}
static async  createCategory(data){
     
    return await axios.post(`${url}createCategory`,
    {name:data.name,img:data.pic})
       
}
static async getCat(){
    return await axios.get(`${url}get-category`)
}
   
static async getSingleProduct(id){
        return  await axios.get(`${url}p/${id}`)
    }

 static async fetchProducts(){
            return await axios.get(`${url}zoom`)
        }
static async fetchUserProducts(user){
    return await axios.get(`${url}user-products/${user._id}`)
}
    
static async getOrders(userId){
            return await axios.get(`${url}get/orders/${userId}`,axiosConfig)
            
    }
static async  downloadOrder(order){
        return await axios.post(`${url}download`,{orders:order})
   }
   static async  searchingbar(search){
    return await axios.post(`${url}search`,{name:search})
}
static async getresetToken(token){
    return await axios.get(` ${url}user/${token}
    `)
}
static async postProduct(product){
        try {
            await axios.post(`${url}post`,product,axiosConfig)
           return await this.fetchProducts()
            
        } catch (error) {
            console.log(error);
            
        }

    }

static async  deleteProduct(productId){
         return await axios.post(`${url}${productId}`,axiosConfig)
    }
    static async  createReview(data){
        return await axios.post(`${url}review`,data,axiosConfig)
   }
    // FUNCTIONS FOR THE USER AND AUTHANTICATIONS 
    static async forgetPw(payload){
        console.log('fund');
        return axios.post(`${url}user/forget`,payload)
    }
    static async singup({...user}){
      return await axios.post(`${url}user/signup`,user,axiosConfig)
         
    }
    static logOut(){
        eraseCookie('TokenUser') 
       return axios.post(`${url}out/logout`)
    }
    static async login(user){
         return  axios.post(`${url}user/login`,user,axiosConfig)
    }
    static async addTocart(payload){
        return await axios.post(`${url}add/addCart`,payload,axiosConfig)
    }
    static async makeOrder(payload){
        return await axios.post(`${url}make/makeOrder`,payload,axiosConfig)

    }
    static async getCardItems(payload){
        return await axios.get(`${url}single/cart/${payload.userId}`,axiosConfig)
    }
    static async removeFromCard(productId){
        return axios.post(`${url}delete/cart`,productId,axiosConfig)
    }
    
    static async clearTheCart(cart){
        return await axios.post(`${url}delete/clear`,cart,axiosConfig)
    }
    static async getAdminProducts(userId){
        return await axios.get(`${url}admin/${userId}`,axiosConfig)
    }
    static async editProduct(formdata){
        const id = formdata.get('id')
        console.log(id);
        return  axios.post(`${url}file/edit/${id}`,formdata,axiosConfig)
   }
}
export default Functions
