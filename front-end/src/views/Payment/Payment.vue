<template>
  <div></div>
</template>

<script>
import Functions from "../../../server/Card-Api";
import OrderFunctions from "../../../server/Order_Api";
import CardFunctions from "../../../server/Card-Api";

export default {
  async mounted() {
    try {
      await Functions.checkPayment({
        id: this.$route.params.id,
        userId: this.currentUser._id,
      });
      this.makeorder({ cart: this.cart, total: this.total });
      this.clearCart(this.cart);
      this.$router.push("/orders");
    } catch (error) {
      this.dialogNotifyError(error.response.data.msg);
      this.$router.push("/card");
    }
  },
  computed: {
    userCart() {
      return this.$store.getters.getCart;
    },
    cart() {
      return this.$store.getters.getCart;
    },
    total() {
      return this.$store.getters.getTotalPrice;
    },
    sum() {
      return this.$store.getters.getCartCount;
    },
    shipping() {
      return this.$store.getters.shipping;
      
    }
  },
  methods: {
    async makeorder() {
      try {
        let location = localStorage.getItem("orderLocation");
        let orderLocation = JSON.parse(location);

        await OrderFunctions.makeOrder({
          cart: this.cart,
          total: this.total,
          location: orderLocation || {},
          shipping: this.shipping,
        });
        this.$store.commit("setShippingData",null)

      } catch (error) {
        this.errors = error;
      }
    },
    updateCardInfo(a, b, c) {
      this.$store.commit("setCart", a);
      this.$store.commit("setTotalPrice", b);
      this.$store.commit("resetcartCount", c);
    },
    async clearCart(cart) {
      try {
        this.overlay = true;
        await CardFunctions.clearTheCart(cart);
        this.updateCardInfo(null, null, 0);
        this.dialogNotifySuccess("thanks for your payment ");
      } catch (error) {
        this.errors = error.response.data;
        this.overlay = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
