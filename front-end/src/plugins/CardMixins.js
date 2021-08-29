import ApiServices from "../../server/Card-Api";

export const CardMixins = {
    data(){
        return {
            
        }
    }
    ,
    methods: {
        async addToCart(products) {
            const user = this.currentUser;
            if (!user) {
              this.alertDisplay(
                "error",
                "please login to be able to add to card",
                2500
              );
            } else {
              try {
                const response = await ApiServices.addTocart({ ...products, user });
                this.alertDisplay("success", "added to cart", 2000);
                this.$store.commit("cartCount");
                this.$emit("closeDia");
                this.rightDrawer = !this.rightDrawer;
                this.$store.dispatch("findCart", response.data.userId);
              } catch (error) {
                this.errors = error;
                this.alertDisplay("error", error.response.data.msg, 2500);
              }
            }
          },
    }
}