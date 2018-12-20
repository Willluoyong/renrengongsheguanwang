(function (window) {
  
let useMobilePage = /Android|iPhone|BlackBerry/i.test(window.navigator.userAgent);
  if (useMobilePage) {
    var a = 'touch'
  }
  
    const l = 50, // 滑块边长
      r = 10, // 滑块半径
      w = 320, // canvas宽度
      h = 160, // canvas高度
      PI = Math.PI
    const L = l + r * 2 // 滑块实际边长
  
    function getRandomNumberByRange(start, end) {
      return Math.round(Math.random() * (end - start) + start)
    }
  
    function createCanvas(width, height) {
      const canvas = createElement('canvas')
      canvas.width = width
      canvas.height = height
      return canvas
    }
  
    function createImg(onload) {
      const img = createElement('img')
      img.crossOrigin = "Anonymous"
      img.onload = onload
      img.onerror = () => {
        // img.src = getRandomImg()
        console.log(getRandomImg());
      }
      img.src = "data:image/png;base64,"+sessionStorage.getItem('image')
      return img
    }
    
    function createElement(tagName) {
      let element = document.getElementById(tagName)
    if(element == null || element instanceof undefined)
    {
        return document.createElement(tagName)
    }
    return element;
    }
  
    function addClass(tag, className) {
      tag.classList.add(className)
    }
  
    function removeClass(tag, className) {
      tag.classList.remove(className)
    }
    var userApi = require('../../../service/userApi')
    
    function getRandomImg(callback) {
        console.log(new Date()+'开始');
      userApi.getAuthBlockToken().then(res => {
        if (res.data.status == 200) {
           sessionStorage.setItem('image',res.data.data.image)
           sessionStorage.setItem('blockImage',res.data.data.blockImage)
           sessionStorage.setItem('blockToken',res.data.data.blockToken)
           callback();
           console.log(new Date()+'结束');
        }
      })
      // return 'https://picsum.photos/300/150/?image=' + getRandomNumberByRange(0, 100)
    }
  
    function draw(ctx, operation, x, y) {
      ctx.beginPath()
      ctx.moveTo(x, y)
      ctx.lineTo(x + l / 2, y)
      ctx.arc(x + l / 2, y - r + 2, r, 0, 2 * PI)
      ctx.lineTo(x + l / 2, y)
      ctx.lineTo(x + l, y)
      ctx.lineTo(x + l, y + l / 2)
      ctx.arc(x + l + r - 2, y + l / 2, r, 0, 2 * PI)
      ctx.lineTo(x + l, y + l / 2)
      ctx.lineTo(x + l, y + l)
      ctx.lineTo(x, y + l)
      ctx.lineTo(x, y)
      ctx.fillStyle = '#fff'
      ctx[operation]()
      ctx.beginPath()
      ctx.arc(x, y + l / 2, r, 1.5 * PI, 0.5 * PI)
      ctx.globalCompositeOperation = "xor"
      ctx.fill()
    }
  
    function sum(x, y) {
      return x + y
    }
  
    function square(x) {
      return x * x
    }
    function createBlockImg(onload) {
      const img2= createElement('img')
      img2.crossOrigin = "Anonymous"
      img2.onload = onload
      img2.onerror = () => {
        // img.src = getRandomImg()
        console.log(getRandomImg());
      }
      img2.src = "data:image/png;base64,"+sessionStorage.getItem('blockImage')
      return img2
    }
  
    class jigsaw {
      constructor(el, success, fail) {
        this.el = el
        this.success = success
        this.fail = fail
      }
  
      init() {
        this.initDOM()
        let self = this;
        getRandomImg(()=>{
          self.initImg()
        self.bindEvents()
        })
      }
  
      initDOM() {
        const canvas = createCanvas(w, h) // 画布
        const block = canvas.cloneNode(true) // 滑块
        const sliderContainer = createElement('div')
        const refreshIcon = createElement('div')
        const sliderMask = createElement('div')
        const slider = createElement('div')
        const sliderIcon = createElement('span')
        const text = createElement('span')
  
        block.className = 'block'
        sliderContainer.className = 'sliderContainer'
        refreshIcon.className = 'refreshIcon'
        sliderMask.className = 'sliderMask'
        slider.className = 'slider'
        sliderIcon.className = 'sliderIcon'
        text.innerHTML = '向右滑动滑块填充拼图'
        text.className = 'sliderText'
  
        const el = this.el
        el.appendChild(canvas)
        el.appendChild(refreshIcon)
        el.appendChild(block)
        slider.appendChild(sliderIcon)
        sliderMask.appendChild(slider)
        sliderContainer.appendChild(sliderMask)
        sliderContainer.appendChild(text)
        el.appendChild(sliderContainer)
  
        Object.assign(this, {
          canvas,
          block,
          sliderContainer,
          refreshIcon,
          slider,
          sliderMask,
          sliderIcon,
          text,
          canvasCtx: canvas.getContext('2d'),
          blockCtx: block.getContext('2d')
        })
      }
  
      initImg() {
        const img = createImg(() => {
          this.canvasCtx.drawImage(img, 0, 0, w, h)
          const y = this.y - r * 2 + 2
          // const ImageData = this.blockCtx.getImageData(this.x, y, L, L)
          // const ImageData = createBlockImg();
          // // this.block.width = L
          // this.blockCtx.putImageData(ImageData, 0, y)
          // const imageData = 
          
        })
        const img2 = createBlockImg(() =>{
          this.blockCtx.drawImage(img2, 0, 0,58,163)
          const y = this.y - r * 2 + 2
          // const ImageData = createBlockImg();
          // this.blockCtx.putImageData(ImageData, 0, y)
        })
        this.img = img
        this.img2 = img2
      }
  
      
  
      clean() {
        this.canvasCtx.clearRect(0, 0, w, h)
        this.blockCtx.clearRect(0, 0, w, h)
        this.block.width = w
      }
  
      bindEvents() {
        this.el.onselectstart = () => false
        this.refreshIcon.onclick = () => {
          this.reset()
        }
  
        let originX, originY, trail = [], isMouseDown = false
        this.slider.addEventListener('touchstart', function (e) {
          e.preventDefault();
          console.log('====================================');
          console.log(e.x,e.y);
          console.log('====================================');
          originX = e.touches[0].clientX, originY = e.touches[0].clientY
          isMouseDown = true
        })
        document.addEventListener('touchmove', (e) => {
          if (!isMouseDown) return false
          const moveX = e.touches[0].clientX - originX
          const moveY = e.touches[0].clientY - originY
          if (moveX < 0 || moveX + 48 >= w) return false
          this.slider.style.left = moveX + 'px'
          var blockLeft = (w - 40) / (w - 40) * moveX
          this.block.style.left = blockLeft + 'px'

          addClass(this.sliderContainer, 'sliderContainer_active')
          this.sliderMask.style.width = moveX + 5 + 'px'
          trail.push(moveY)
        })
        document.addEventListener('touchend', (e) => {
          if (!isMouseDown) return false
          isMouseDown = false
          if (e.x == originX) return false
          removeClass(this.sliderContainer, 'sliderContainer_active')
          this.trail = trail
          const {spliced, TuringTest,left} = this.verify()
          var left1 = parseInt(left*3.6)
          let data = new FormData()
          data.append('BlockToken',sessionStorage.getItem('blockToken'))
          data.append('xint',left1)
          userApi.checkBlockToken(data).then(res=>{
            if (res.data.status == 200) {
              addClass(this.sliderContainer, 'sliderContainer_success')
              setTimeout(() => {
                this.success(left1,sessionStorage.getItem('blockToken'))
              }, 1000)
            }else{
              addClass(this.sliderContainer, 'sliderContainer_fail')
              this.text.innerHTML = '再试一次'
              setTimeout(() => {
                    this.reset()
                  }, 1000)
            }
          })
  
  
  
  
          // if (spliced) {
          //   if (TuringTest) {
          //     addClass(this.sliderContainer, 'sliderContainer_success')
          //     this.success && this.success()
          //   } else {
          //     addClass(this.sliderContainer, 'sliderContainer_fail')
          //     this.text.innerHTML = '再试一次'
          //     this.reset()
          //   }
          // } else {
          //   addClass(this.sliderContainer, 'sliderContainer_fail')
          //   this.fail && this.fail()
          //   
          // }
        })
      }
  
      verify() {
        const arr = this.trail // 拖动时y轴的移动距离
        const average = arr.reduce(sum) / arr.length // 平均值
        const deviations = arr.map(x => x - average) // 偏差数组
        const stddev = Math.sqrt(deviations.map(square).reduce(sum) / arr.length) // 标准差
        const left = parseInt(this.block.style.left)
        return {
          spliced: Math.abs(left - this.x) < 5,
          TuringTest: average !== stddev, // 只是简单的验证拖动轨迹，相等时一般为0，表示可能非人为操作
          left:left
        }
      }
  
      reset() {
         this.sliderContainer.className = 'sliderContainer'
         this.slider.style.left = 0
         this.block.style.left = 0
         this.sliderMask.style.width = 0
         this.clean()
        let self = this;
        getRandomImg(()=>{
          self.initImg()
        })
      }
  
    }
  
    window.jigsawM = {
      init: function (element, success, fail) {
        new jigsaw(element, success, fail).init()
      }
    }
  }(window))