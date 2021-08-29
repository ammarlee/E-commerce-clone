<template>
  <v-app>
    <!-- drawers -->
    <app-Left-Drawer></app-Left-Drawer>
    <app-Right-Drawer></app-Right-Drawer>
    <app-overlay></app-overlay>

    <router-view name="header"> </router-view>
    <v-main>
      <!-- <transition name="slide" mode="out-in">
         <router-view></router-view>
      </transition> -->
      <transition
        appear
        enter-active-class="animate__animated animate__fadeInRight"
        leave-active-class="animate__animated animate__fadeOut"
        mode="out-in"
      >
        <router-view></router-view>
      </transition>
    </v-main>
    <!-- footer -->
    <router-view name="footer"></router-view>
  </v-app>
</template>

<script>
import LeftDrawerVue from "./views/shared/LeftDrawer.vue";
import rightDrawerVue from "./views/shared/RighDrawer";

export default {
  components: {
    "app-Left-Drawer": LeftDrawerVue,
    "app-Right-Drawer": rightDrawerVue,
  },
};
</script>
<style scoped lang="scss">
.slide-enter {
  opacity: 0;
}
.slide-enter-active {
  animation: slide-in 0.5s ease-out forwards;
  transition: opacity 0.5s;
}

.slide-leave-active {
  animation: slide-out 0.5s ease-in reverse;
  transition: opacity 0.5s;
  opacity: 0;
}
@keyframes slide-in {
  from {
    transform: translateY(20px);
  }
  to {
    transform: translateY(0);
  }
}
@keyframes slide-out {
  to {
    transform: translateY(0);
  }
  from {
    transform: translateY(20px);
  }
}
/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 600px) {
  .theme--light.v-btn:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined) {
    height: 37px;
    width: 60px;
  }
}
</style>
