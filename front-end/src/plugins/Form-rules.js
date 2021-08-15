export default {
    validEmail: (v) => /.+@.+\..+/.test(v) || "البريد الالكترونى يجب أن يكون صحيحا",
    NameRequired:(v) => !!v || "من فضلك ادخل الاسم ",
    nameLength:(v) => (v && v.length <= 10) || "يجب عليك ادخال اسم لا يزيد عن عشرة أحرف",
    minNameLen: (len) => (v) =>
      (v || "").length >= len ||
      ` يجب ان يكون الاسم لا يقل عن  ${len} احرف`,
    length: (len) => (v) =>
      (v || "").length >= len ||
      ` عدد غير كافى مطلوب ${len} ارقام`,
    password: (v) =>
      !!(v || "").match(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/
      ) ||
      "يجب ان يحتوى على حرف كبير وحرف صغير ورقم  وحرف خاص مثل !",
      
    required: (v) => !!v || "مطلوب",
    confirmPassword: (value) =>
      value === this.user.password ||
      "الرقم السرى غير متطابق",
  }
 

