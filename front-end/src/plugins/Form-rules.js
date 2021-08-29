export default {
  email: (v) => !!(v || "").match(/@/) || "Please enter a valid email",
  length: (len) => (v) =>
    (v || "").length >= len || `Invalid character length, required ${len}`,
  password: (v) =>
    !!(v || "").match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/) ||
    "Password must contain an upper case letter, a numeric character, and a special character",
  required: (v) => !!v || "This field is required",
  NameRequired: (v) => !!v || "please enter the name ",
  nameLength: (v) =>
    (v && v.length <= 10) || "name should be less than 10 characters",
  minNameLen: (len) => (v) =>
    (v || "").length >= len || ` should be more than ${len} characters`,
};
