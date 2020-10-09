<template>
  <div class="app-scroll-shutter">
    <slot name="header"></slot>
    <slot name="content"></slot>
    <slot name="footer"></slot>
  </div>
</template>
<script>
  /**
   * 卷帘门效果
   *
   * props:
   *
   * - enabled [Boolean]{true} 是否启用
   * - throttleTime [Number]{200} 滚动时间阈值
   * - throttlePx [Number]{20} 滚动距离阈值
   * - throttleStartPx [Number]{0} 开始生效的距离阈值
   * - keepscroll [Boolean]{false} 记住滚动位置
   *
   * events:
   *
   * - toggle(expanded) 显示隐藏的回调。
   *
   * methods:
   *
   * - resetScrollTop(top = 0) 重置滚动条到指定距离
   */
  import _ from 'lodash';
  export default {
    data(){
      return {
        // 当前距离顶部多少
        scrollTop: 0,
        binded: false
      }
    },
    props: {
      enabled: {
        type: Boolean,
        default: true
      },
      throttleTime: {
        type: Number,
        default: 200
      },
      throttlePx: {
        type: Number,
        default: 40
      },
      throttleStartPx: {
        type: Number,
        default: 0
      },
      keepscroll: {
        type: Boolean,
        default: false
      }
    },
    mounted(){
      this.init();
      this.bind();
    },
    destroyed(){
      this.unbind();
    },
    activated(){
      this.bind();
    },
    deactivated(){
      this.unbind();
    },
    methods: {
      /**
       * 初始化设置
       * @return {[type]} [description]
       */
      init(){
        this.$header = this.getSlotDom('header');
        this.$content = this.getSlotDom('content');
        this.$footer = this.getSlotDom('footer');

        this.$header && this.$header.classList.add('app-scroll-shutter-header')
        this.$content && this.$content.classList.add('app-scroll-shutter-content')
        this.$footer && this.$footer.classList.add('app-scroll-shutter-footer')
      },
      /**
       * 重置scroll top
       * @param  {Number} top [description]
       * @return {[type]}     [description]
       */
      resetScrollTop(top = 0){
        try{
          this.$content.scrollTop = top
        }catch(e){}
      },
      /**
       * 进行初始化
       * @return {[type]} [description]
       */
      bind(){
        if(!this.enabled || this.binded) return;
        this.binded = true;
        // 添加滚动绑定。
        this.$content.addEventListener('scroll', this.getEventListener(), false);
      },
      /**
       * 解绑
       * @return {[type]} [description]
       */
      unbind(){
        if(!this.binded) return;
        this.$content.removeEventListener('scroll', this.getEventListener(), false);
        this.binded = false;
      },
      /**
       * 获取绑定的滚动事件
       * @return {[type]} [description]
       */
      getEventListener(){
        if(!this.$eventListenter){
          this.$eventListenter = _.throttle((e) => {
            let el = this.$content;
            let top = el.scrollTop;
            let down = top > el._lastScrollTop;
            if((down && top < el._lastScrollTop + this.throttlePx)
              || (down && top < this.throttleStartPx)
              || (!down && top > el._lastScrollTop - this.throttlePx && top > this.throttleStartPx)){
              return;
            }
            el._lastScrollTop = top;
            this.toggleShut(down);
          }, this.throttleTime)
        }
        return this.$eventListenter;
      },
      /**
       * 获取slot对应的dom
       * @param  {[type]} name [description]
       * @return {[type]}      [description]
       */
      getSlotDom(name){
        let dom = this.$slots[name] && this.$slots[name][0] && this.$slots[name][0].elm;
        return dom;
      },
      toggleShut(shut = true){
        let toggle = shut ? 'add' : 'remove'
        this.$emit('toggleShut', toggle)
        this.$header && this.$header.classList[toggle]('shut');
        this.$footer && this.$footer.classList[toggle]('shut');
      }
    }
  }
</script>
<style scoped>
  .app-scroll-shutter{display: flex; flex: 1; flex-direction: column; position: relative;}
  .app-scroll-shutter >>> .app-scroll-shutter-header,
  .app-scroll-shutter >>> .app-scroll-shutter-footer{position: absolute;left: 0; right: 0; transition: all 0.26s ease-in-out; z-index: 1;}
  .app-scroll-shutter >>> .app-scroll-shutter-header{top: 0; transform: translate3d(0, 0, 0);}
  .app-scroll-shutter >>> .app-scroll-shutter-footer{bottom: 0; transform: translate3d(0, 0, 0);}
  .app-scroll-shutter >>> .app-scroll-shutter-header.shut{transform: translate3d(0, 0, 0);}
  .app-scroll-shutter >>> .app-scroll-shutter-footer.shut{transform: translate3d(0, 100%, 0);}
</style>
