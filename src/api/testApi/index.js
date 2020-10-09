import ui from "@/common/ui";

// http 配置于 config.http
export default (http, Vue) => {
  return {
    async testFetch() {
      http
        .get("www.baidu.com")
        .then(res => {
          return res;
        })
        .catch(e => {
          console.log("error:", e);
        });
    }
  };
};
