import ApiServices from '../../server/Card-Api'
export  default{
    data() {
      return {
        errors:null,
         overlay:false,
      }
    },
    computed:{
      drawer: {
        get() {
          return this.$store.getters.drawer;
        },
        set(value) {
          this.$store.dispatch("toggleDrawer", value);
        }
      },
      rightDrawer: {
        get() {
          return this.$store.getters.rightDrawer;
        },
        set(value) {
          this.$store.dispatch("toggleRightDrawer", value);
        }
      },
    },
    methods: {
      alertDisplay(icon,msg,time) {
        const Toast = this.$swal.mixin({
             toast: true,
             position: 'top',
             showConfirmButton: false,
             timer: time,
             timerProgressBar: true,
             didOpen: (toast) => {
               toast.addEventListener('mouseenter', this.$swal.stopTimer)
               toast.addEventListener('mouseleave', this.$swal.resumeTimer)
             }
  })
  
             Toast.fire({
             icon: icon,
             title: msg,
              showClass: {
     popup: 'animate__animated animate__fadeInDown'
   },
   hideClass: {
     popup: 'animate__animated animate__fadeOutUp'
   }
           })
       },
       alertError(error){
        const er = error.response.data.errors;
          this.dialogNotifyError(er)
          this.loading = false;
  
      },
      dialogNotifySuccess(msg){
        this.$dialog.notify.success(msg, {
          position: 'top-right',
          timeout: 5000
        })
      },
      dialogNotifyError(msg){
        this.$dialog.notify.error(msg, {
          position: 'top-right',
          timeout: 5000
        })
      },
  
       async addToCart(products){
        try {
         const response = await ApiServices.addTocart({...products,user:this.user})
         console.log(response);
          this.alertDisplay('success','added to cart',2000)
          this.$store.commit('cartCount')
          this.rightDrawer =!this.rightDrawer
          this.$store.dispatch('findCart',response.data.userId)
  
  
        } catch (error) {
          this.errors = error
          this.alertDisplay('error',error.response.data.msg,2500)
  
        }
      },
    },
    
  
  
  
}