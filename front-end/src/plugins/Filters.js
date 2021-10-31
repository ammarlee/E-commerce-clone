import Vue from "vue";
import Enums from "./Enums";

function getEnumMember(enumClass, enumValue) {
  for (var val in enumClass) {
    if (enumClass[val].value == enumValue) return enumClass[val];
  }
  return {};
}

Vue.filter("SizeFilter", function(enumValue) {
  var enumObj = getEnumMember(Enums.Sizes, enumValue);
  return enumObj.text;
});

Vue.filter("stateFilter", function(enumValue) {
  var enumObj = getEnumMember(Enums.State, enumValue);
  return enumObj.text;
});
Vue.filter("stateColorFilter", function(enumValue) {
  var enumObj = getEnumMember(Enums.State, enumValue);
  return enumObj.color;
});

Vue.filter("ColorFilter", function(enumValue) {
  var enumObj = getEnumMember(Enums.Colors, enumValue);
  return enumObj.text;
});
Vue.filter("GenderFilter", function(enumValue) {
  var enumObj = getEnumMember(Enums.Genders, enumValue);
  return enumObj.text;
});
