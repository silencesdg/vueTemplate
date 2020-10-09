import utils from "@/common/utils";
import api from "@/api";
import config from "@/config";
import http from "@/common/http";
import infiniteScroll from "vue-infinite-scroll";

// 不一定需要挂载到Vue上，请根据实际需求设计, 并尽量放到plugins目录下
export default [utils, api, config, http, infiniteScroll];
