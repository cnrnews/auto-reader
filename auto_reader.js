// 自动阅读插件
;(function () {
  var sHeight = getViewportSize().height, //文档高度
    wHeight = getScrollSize().height, // 屏幕高度
    playing = false,
    t = null // 定时器
  var AutoReader = function (opt) {
    this.playBtn = opt.playBtn
    this.sTopBtn = opt.sTopBtn
    this.playImg = opt.playImg
    this.pauseImg = opt.pauseImg

    var _self = this
    // 回到顶端按钮事件监听
    addEvent(this.sTopBtn, 'click', function () {
      window.scrollTo(0, 0)
      // 清除定时器，设备播放按钮背景，重置播放标志位
      clearInterval(t)
      _self.style.backgroundImage = 'url(' + this.playImg + ')'
      playing = false
    })
    // 屏幕滚动事件
    addEvent(window, 'scroll', function () {
      // call 改变 this 指向(AutoReader)
      _self.sTopBtnShow.call(_self)
    })
    // 播放按钮点击事件
    addEvent(this.playBtn, 'click', function () {
      // call 改变 this 指向(AutoReader)
      _self.setAutoPlay.call(_self.playBtn)
    })
  }
  // 原型： 在这里写扩展方法
  AutoReader.prototype = {
    // 自动播放
    setAutoPlay: function () {
      var sTop = getScrollOffset().top
      // 文档高度 = 屏幕高度 + 滚动距离
      if (sHeight === wHeight + sTop) {
        return
      }
      // 没有在播放
      if (!playing) {
        t = setInterval(function () {
          var sTop = getScrollOffset().top
          // 文档高度 = 屏幕高度 + 滚动距离
          if (sHeight === wHeight + sTop) {
            // 清除定时器
            clearInterval(t)
            // 设备播放按钮背景图
            _self.style.backgroundImage = 'url(' + this.playImg + ')'
            playing = false
          } else {
            window.scrollBy(0, 10)
            _self.style.backgroundImage = 'url(' + this.pauseImg + ')'
          }
        }, 1)

        playing = true
      } else {
        // 已经在播放，则清除定时器，设备播放按钮背景，重置播放标志位
        clearInterval(t)
        _self.style.backgroundImage = 'url(' + this.playImg + ')'
        playing = false
      }
    },
    // 控制回到顶部按钮显示隐藏
    sTopBtnShow: function () {
      // 滚动距离
      var sTop = getScrollOffset().top,
        // this 指代的是 AutoReader
        sTopBtn = this.sTopBtn

      sTopBtn.style.display = sTop > 0 ? 'block' : 'none'
    },
  }

  // 挂载到全局变量
  window.AutoReader = AutoReader
})()
