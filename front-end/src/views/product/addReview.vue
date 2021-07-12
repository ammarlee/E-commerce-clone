<template>
  <div>
    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <v-container class="text-capitalize ">
      <h1 class="font-weight-bold">create review</h1>
      <v-form v-if="getproducts" @submit.prevent="createView()">
        <div class="product">
          <v-row>
            <v-col cols="4">
              <v-img
                :src="getproducts[0].img[0]"
                style="max-height:200px"
                alt="img"
              ></v-img>
            </v-col>
            <v-col cols="4" offset-md="2" offset-sm="2">
              <p>{{ getproducts[0].name }}</p>
            </v-col>
          </v-row>
        </div>
        <v-divider></v-divider>
        <div class="rating ">
          <h3>overall rating</h3>
          <div class="mt-3 mb-3">
            <star-rating v-model="review.rating" />
          </div>

          <div>
            <h2 class="mb-2">
              add photo or vedio
            </h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam,
              assumenda illo harum ducimus fugiat incidunt! Fugit eligendi
              veritatis officia fugiat!
            </p>
            <br />
            
          </div>
          <v-divider></v-divider>

          <div>
            <h3 class="mb-2">add a headline</h3>
            <v-text-field
              v-model="review.header"
              filled
              color="deep-purple"
              label="header"
            ></v-text-field>
            <h3 class="mb-2">write your review</h3>

            <v-textarea
              v-model="review.last"
              filled
              color="deep-purple"
              label="review"
            ></v-textarea>
          </div>
          <v-divider></v-divider>
          <div class="user">
            <p>this is how will appear to others</p>
            <!-- <v-col cols="12"> -->

            <v-avatar>
              <img :src="getUser.img" alt="John" />
            </v-avatar>

            <v-text-field
              v-model="getUser.name"
              filled
              disabled
              class="d-inline-block ml-3"
              color="deep-purple"
              label="user name"
            ></v-text-field>
            <!-- </v-col> -->
          </div>
          <v-btn type="submit">
            submit
          </v-btn>
        </div>
      </v-form>
    </v-container>
  </div>
</template>

<script>
import StarRating from "vue-star-rating";
import Functions from "../../../server/api";
export default {
  components: {
    StarRating,
  },
  data() {
    return {
      review: {
        header: null,
        rating: 5,
        review: null,
        last: null,
      },
      user: null,
      overlay: false,
    };
  },

  methods: {
   
    async createView() {
      this.overlay = true;
      const data = {
        productId: this.getproducts[0]._id,
        userId: this.getUser._id,
        title: this.review.header,
        description: this.review.last,
        rating: this.review.rating,
        errors: null,
      };
      try {
        await Functions.createReview(data);
        this.overlay = false;
          this.dialogNotifySuccess("you have added a review")
        setTimeout(() => {
          this.$router.push("/");
        }, 2000);
      } catch (error) {
          const er=error
          this.alertError(er)
        this.overlay = false;
      }
    },
  },
  computed: {
    getproducts() {
      return this.$store.getters.getProducts.posts.filter((p) => {
        return p._id == this.$route.params.id;
      });
    },
    getUser() {
      return this.$store.getters.getUser;
    },
  },
};
</script>

<style lang="scss" scoped></style>
