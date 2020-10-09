
const routes = [
  {
    path: "/",
    name: "list",
    component: resolve => require(['@/views/list/list.vue'], resolve),
    meta: {
      trap: {
        pt: "h5-ysq-list",
      },
      share: false
    },
  },
  {
    path: "/list",
    name: "list",
    component: resolve => require(['@/views/list/list.vue'], resolve),
    meta: {
      trap: {
        pt: "h5-ysq-list",
      },
      share: false
    },
  },
  {
    path: "/advanceDetail",
    name: "advanceDetail",
    component: () => import("@/views/advanceDetail/index.vue"),
    meta: {
      trap: {
        pt: "advanceDetail",
      },
    },
  },
  {
    path: "/departDetail",
    name: "departDetail",
    component: () => import("@/views/departDetail/index.vue"),
    meta: {
      trap: {
        pt: "h5-addition-detail",
      },
    },
  },
  {
    path: "/citySelect",
    name: "citySelect",
    component: () => import("@/views/citySelect/citySelect.vue"),
    meta: {
      trap: {
        pt: "h5-ysq-city",
      },
    },
  },
  {
    path: "/keywordSearch",
    name: "keywordSearch",
    component: () => import("@/views/keywordSearch/index.vue"),
    meta: {
      trap: {
        pt: "h5-ysq-search",
      },
    },
  },
];

export default routes;

