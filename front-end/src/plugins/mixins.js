import FormRules from "./Form-rules";
import moment from "moment";
export default {
  data() {
    return {
      errors: null,
      allRules: FormRules,
    };
  },
  computed: {
    drawer: {
      get() {
        return this.$store.getters.drawer;
      },
      set(value) {
        this.$store.dispatch("toggleDrawer", value);
      },
    },
    rightDrawer: {
      get() {
        return this.$store.getters.rightDrawer;
      },
      set(value) {
        this.$store.dispatch("toggleRightDrawer", value);
      },
    },
    showOverlay: {
      get() {
        return this.$store.getters.overlay;
      },
      set(value) {
        this.$store.commit("setOverLay", value);
      },
    },

    currentUser() {
      return this.$store.getters.getUser;
    },
  },
  methods: {
    formateDateWithMoment(date, format) {
      moment(date).format(format);
    },
    alertDisplay(icon, msg, time) {
      const Toast = this.$swal.mixin({
        toast: true,
        position: "top",
        showConfirmButton: false,
        timer: time,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", this.$swal.stopTimer);
          toast.addEventListener("mouseleave", this.$swal.resumeTimer);
        },
      });

      Toast.fire({
        icon: icon,
        title: msg,
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
      });
    },
    alertError(error) {
      const er = error.response.data.errors;
      this.dialogNotifyError(er);
      this.loading = false;
    },
    dialogNotifySuccess(msg) {
      this.$dialog.notify.success(msg, {
        position: "top-right",
        timeout: 5000,
      });
    },
    dialogNotifyError(msg) {
      this.$dialog.notify.error(msg, {
        position: "top-right",
        timeout: 5000,
      });
    },
  },
};
