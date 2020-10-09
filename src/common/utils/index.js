// utils for house

import dateTime from "./datetime";

import assertIDCard from "./assert_id_card";
import assertName from "./assert_name";
import desensitize from "./desensitize";
import desensitizeURL from "./desensitize_url";
import getQuery from "./get_query";
import uidEmpty from "./assert_id_empty";
import coordTrans from "./coordinate_translation";
import assertDate from "./assert_date";
import platform from "./platform";
import formateParams from "./params";
import trap from "./trap";
import cookie from "./cookie";

// 使用方法：this.$utils.formateImgUrl()

const utils = {
  assertIDCard,
  assertName,
  desensitize,
  desensitizeURL,
  getQuery,
  uidEmpty,
  coordTrans,
  assertDate,
  dateTime,
  platform,
  formateParams,
  trap,
  cookie
};

const install = (Vue, options) => {
  Vue.$utils = Vue.prototype.$utils = utils;
};

export default {
  install
};
