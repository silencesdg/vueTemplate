<template>
  <transition name="popup">
    <div class="app-drawer"
      v-transfer-dom
      v-show="shown">
      <div class="drawer-mask" @click="hide"></div>
      <div :class="['drawer-content', from]">
        <div class="drawer-space" :style="spaceStyle" @click="hide"></div>
        <div class="drawer-content-inner">
          <slot></slot>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
  /**
   * app-drawer，模拟页面的进出。不用mt-popup的原因是性能和transition引起的position fixed bug
   * 
   * props:
   *
   * - hashname [String]('') hash名，URLhash值跟drawer shown的状态强关联，查看isSameHash()
   * - shown [Boolean](false) 页面是否显示。
   * - from [String]('bottom') 页面从哪来(left, bottom, right, top)
   *   果是小于1的数字，则会换算成百分比。
   * - space [Number](0) 预留空间。大于1时单位为像素，小于1时为百分比。
   *
   * events:
   *
   * - input(shown)
   *
   * @todo 支持其他from模式
   */
  //
  export default {
    name: 'app-drawer',
    model:{
      prop: 'shown'
    },
    data(){
      return {
        screenWidth: 0,
        screenHeight: 0,
        enableHashChange: true,
        timer: null
      }
    },
    props: {
      from: {
        type: String,
        default: 'bottom'
      },
      shown: {
        type: Boolean,
        default: false
      },
      space: {
        type: Number,
        default: 0
      },
      hashname: {
        type: String,
        default: ''
      }
    },
    watch: {
      shown(){
        this.resetHash();
        this.emitAlreadyShownEvent();
      }
    },
    computed: {
      spaceStyle(){
        let size = this.space > 1 ? this.space + 'px' : this.space * 100 + '%',
            sizeDirection = this.from == 'bottom' || this.from == 'top' ? 'height' : 'width';
        return {
          [sizeDirection]: size
        }
      }
    },
    mounted(){
      this.resetHash();
      this.toggleHashChange();
      this.screenResize();
      this.emitAlreadyShownEvent();
    },
    activated(){
      this.toggleHashChange();
      this.enableHashChange = true;
    },
    deactivated(){
      this.toggleHashChange(false);
      this.enableHashChange = false;
    },
    destroyed(){
      this.toggleHashChange(false);
      this.enableHashChange = false;
      this.timer && clearTimeout(this.timer);
    },
    methods: {
      show(){
        if(!this.shown){
          this.$emit('input', true);
        }
      },
      hide(){
        if(this.shown){
          this.$emit('input', false);
        }
      },
      screenResize(){
        this.screenHeight = document.body.clientHeight;
        this.screenWidth = window.screen.width;
      },
      /*
      * 重置hash
      */
      resetHash(){
        this.shown ? this.addHash() : this.removeHash();
      },
      /*
      * 新增hash
      */
      addHash(){
        if(this.enableHashChange) {
          // this.addHashList(this.hashname);
          location.hash = this.hashname;
        }
      },
      /*
      * 移除hash
      */
      removeHash(){
        if (this.enableHashChange && location.hash != "" && this.isSameHash()) {
          // this.removeHashList(this.hashname);
          window.history.back();
        }
      },
      /*
      * hashchange事件
      */
      onHashChange(){
        if(this.isSameHash()){
          this.show();
        }else{
          this.hide();
        }
      },
      /*
      * 监听hashchange事件
      */
      toggleHashChange(flag = true){
        if(!this.hashname) return;
        window[flag ? 'addEventListener' : 'removeEventListener']('hashchange', this.onHashChange, false);
      },

      /**
       * 是否跟当前的URL hash值匹配
       * 
       * hashname  |  location.hash  | same
       * ----------|-----------------|----------
       * foo       | #foo            | true
       * foo       | #foo/bar        | true
       * foo       | #bar/foo        | true
       * foo/bar   | #foo/bar        | true
       * foo/zoo   | #foo/bar        | false
       * 
       * 其他类型是false
       */
      isSameHash(){
        let hashnames = location.hash;
        if(hashnames == '' || hashnames == '#'){
          hashnames = '';
        }else{
          hashnames = hashnames.substr(1);
        }
        if(hashnames == this.hashname) return true;
        hashnames = hashnames.split('/');
        let same = false;
        for(let i = 0; i < hashnames.length; i++){
          if(hashnames[i] == this.hashname){
            same = true;
            break;
          }
        }
        return same;
      },
      emitAlreadyShownEvent(){
        this.timer && clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.$emit('alreadyShown', this.shown)
        }, 260);
      }
    }
  }
</script>
<style scoped>
  .app-drawer,
  .drawer-content,
  .drawer-mask{position: absolute; top: 0; left: 0; right: 0; bottom: 0;}
  .app-drawer{z-index: 999; position: fixed;}
  .drawer-mask{background: #000; opacity: 0.5;}
  .drawer-content{display: flex;flex-direction: column;}
  .drawer-content .drawer-content-inner{flex: 1; overflow:scroll;}
  .drawer-content.left{flex-direction: row-reverse;}
  .drawer-content.right{flex-direction: row;}
  .drawer-content.top{flex-direction: column-reverse;}

  /**
   * 动画，默认为bottom
   * @tofix 动画优化，要使用单位px
   */
  .popup-enter-active,
  .popup-enter-active .drawer-content,
  .popup-enter-active .drawer-mask{transition: all 0.26s ease;}
  .popup-enter .drawer-content{transform: translateY(100%);}
  .popup-enter .drawer-mask{opacity: 0;}
  .popup-enter-to .drawer-content{transform: translateY(0%);}
  .popup-enter-to .drawer-mask{opacity: 0.5;}
  .popup-leave-active,
  .popup-leave-active .drawer-content,
  .popup-leave-active .drawer-mask{transition: all 0.26s ease;}
  .popup-leave .drawer-content{transform: translateY(0%);}
  .popup-leave .drawer-mask{opacity: 0.5}
  .popup-leave-to .drawer-content{transform: translateY(100%);}
  .popup-leave-to .drawer-mask{opacity: 0}

  /* right */
  .popup-enter .drawer-content.right,
  .popup-leave-to .drawer-content.right{transform: translateX(100%);}
  .popup-enter-to .drawer-content.right,
  .popup-leave .drawer-content.right{transform: translateX(0%);}

  /* left */
  .popup-enter .drawer-content.left,
  .popup-leave-to .drawer-content.left{transform: translateX(-100%);}
  .popup-enter-to .drawer-content.left,
  .popup-leave .drawer-content.left{transform: translateX(0%);}

  /*top*/
  .popup-enter .drawer-content.top,
  .popup-leave-to .drawer-content.top{transform: translateY(-100%);}
  .popup-enter-to .drawer-content.top,
  .popup-leave .drawer-content.top{transform: translateY(0%);}
</style>
