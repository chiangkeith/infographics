import './index.styl'
import { FertilityD3 } from './d3'
import { addClass, elmYPosition, getClientOS, getPosition, renderChart, removeClass, hasClass } from './comm'
import { currentYPosition, smoothScrollTo } from 'kc-scroll'
import { find, map } from 'lodash'
import HashTable from 'jshashtable'
import verge from 'verge'

const debugRaw = require('debug')
const debug = require('debug')('FERTILITY:DEFAULT')
const debugScroll = require('debug')('FERTILITY:SCROLL')
const debugLayoutDone = require('debug')('FERTILITY:layoutDone')
const debugMobile = require('debug')('FERTILITY:MOBILE')
let deviceHeight, deviceWidth

class Fertility {
  init () {
    this.blocks = {}
    this.playground = document.querySelector('.outerwpr')
    this.device = getClientOS()
    this.scrollStep = this.device !== 'iOS' && this.device !== 'Android' ? 10 : 30

    Promise.all([
      this.reviseOpts(),
      this.setupOpening()
    ]).then(() => {
      // renderChart(document.querySelector(`article[data-key="1"] .hichart`), '1')
      // renderChart(document.querySelector(`article[data-key="81"] .hichart`), '81')
      // renderChart(document.querySelector(`article[data-key="11"] .hichart`), '11')
      // renderChart(document.querySelector(`article[data-key="811"] .hichart`), '811')
      // renderChart(document.querySelector(`article[data-key="141"] .hichart`), '141')
      // renderChart(document.querySelector(`article[data-key="14"] .hichart`), '14')
      // renderChart(document.querySelector(`article[data-key="814"] .hichart`), '814')
      // renderChart(document.querySelector(`article[data-key="16112"] .hichart`), '16112')
      // renderChart(document.querySelector(`article[data-key="816112"] .hichart`), '816112')
      // renderChart(document.querySelector(`article[data-key="16251"] .hichart`), '16251')
      // renderChart(document.querySelector(`article[data-key="816251"] .hichart`), '816251')
      // renderChart(document.querySelector(`article[data-key="131"] .hichart`), '131')
      // renderChart(document.querySelector(`article[data-key="8131"] .hichart`), '8131')
      // renderChart(document.querySelector(`article[data-key="23"] .hichart`), '23')
      // renderChart(document.querySelector(`article[data-key="823"] .hichart`), '823')
      // renderChart(document.querySelector(`article[data-key="16123"] .hichart`), '16123')
      // renderChart(document.querySelector(`article[data-key="816123"] .hichart`), '816123')
      return this.suckBlocks().then(() => {
        return this.removeBlocks().then(() => {
          // console.log(this.blocks)
        })
      })
    })
  }
  reviseOpts () {
    return new Promise((resolve) => {
      const options = [ ...document.querySelectorAll('.choices > li') ]
      options.map((opt) => {
        const optText = opt.innerText
        opt.setAttribute('data-key', optText.replace(/^[A-Za-z0-9.*+?^=!:${}()#%~&_@\-`|\[\]\/\\]*[^(\(\d+\))]*/g, '').replace(/[\s()]*/g, ''))
        opt.innerText = optText.replace(/[\(\d+\)]*$/, '')
      })
      resolve()
    })
  }
  removeBlocks () {
    return new Promise((resolve) => {
      const blocks = [ ...document.querySelectorAll('article') ]
      blocks.map((block) => {
        this.playground.removeChild(block)
      })
      resolve()
    })
  }
  setupOpening () {
    return new Promise((resolve) => {
      const btnStart = document.querySelector('.opening .choices li')
      const btnClickHandler = () => {
        this.playground.appendChild(this.blocks[ 0 ])
        this.setupNextQAHandler(this.blocks[ 0 ], 0)
        btnStart.removeEventListener('click', btnClickHandler)
        const targetY = elmYPosition(`article[data-key="0"]`)
        smoothScrollTo({ yPos: targetY, steps: this.scrollStep })
      }
      btnStart.addEventListener('click', btnClickHandler)
      resolve()
    })
  }
  suckBlocks () {
    return new Promise((resolve) => {
      const blocks = [ ...document.querySelectorAll('article') ]
      blocks.map((block) => {
        this.blocks[ block.getAttribute('data-key') ] = block
      })
      resolve()
    })
  }
  setupNextQAHandler (block, lastqNum) {
    return new Promise((resolve) => {
      const btns = [ ...block.querySelectorAll('.choices > li') ]
      const btnClickHandler = (e) => {
        const thisBlock = block.getAttribute('data-key')
        const targKey = e.target.getAttribute('data-key')
        this.playground.appendChild(this.blocks[ targKey ])
        this.setupNextQAHandler(this.blocks[ targKey ], thisBlock).then(() => {
          this.sendAnswer(`${lastqNum}-${thisBlock}-${targKey}`, targKey)
        })
        btns.map((btn) => {
          btn.removeEventListener('click', btnClickHandler)
          addClass(btn, 'invalid')
        })
        renderChart(document.querySelector(`article[data-key="${targKey}"] .hichart`), targKey)
        smoothScrollTo({ yPos: elmYPosition(`article[data-key="${targKey}"]`), steps: this.scrollStep })
      }
      btns.map((btn) => {
        btn.addEventListener('click', btnClickHandler)
      })
      resolve()
    })
  }
  sendAnswer (qcom, nextqNum) {
    const xhttp = new XMLHttpRequest()
    xhttp.onreadystatechange = () => {
      if (xhttp.readyState === 4 && xhttp.status === 200) {
        const data = JSON.parse(xhttp.responseText)
        const last_qa_result = {}
        let total_count = 0
        for(let rs in data.result) {
          const rsArr = rs.split('-')
          const qcomArr = qcom.split('-')
          if (rsArr[ 0 ] === qcomArr[ 0 ] && rsArr[ 1 ] === qcomArr[ 1 ]) {
            last_qa_result[ rs ] = data.result[ rs ]
            total_count += Number(data.result[ rs ])
          }
        }
        console.log('last_qa_result', last_qa_result)
        const theSameRate = Math.round(((Number(last_qa_result[ qcom ]) * 1000) / total_count)) / 10 + '%'
        const next_feedback_place = this.blocks[ nextqNum ].querySelector('.feedback > .count')
        if (next_feedback_place) {
          this.blocks[ nextqNum ].querySelector('.feedback > .count').innerText = theSameRate
        }
      }
    }
    const url = `https://www.mirrormedia.mg/gorest/poll_increase?qid=stork01162&field=${qcom}`
    xhttp.open('GET', url, true)
    xhttp.send()
  }
}
class Article {
  constructor () {
    // this.hashArticles = new HashTable()
    this.hashSects = new HashTable()
    this.init = this.init.bind(this)
    this.preCalc = this.preCalc.bind(this)
    this.scrollHandler = this.scrollHandler.bind(this)
    this.scrollHandlerForFix = this.scrollHandlerForFix.bind(this)
    this.scrollHandlerForLongFix = this.scrollHandlerForLongFix.bind(this)
    this.setScrollManager = this.setScrollManager.bind(this)
    this.resetScrollManager = this.resetScrollManager.bind(this)
    this.scrollHandlerTriggerD3Auto = this.scrollHandlerTriggerD3Auto.bind(this)
  }
  init () {
    debug('INIT ARTICLE')

    document.querySelector('.exception').setAttribute('style', 'opacity: 1;')
    document.querySelector('.source-set').setAttribute('style', 'opacity: 1;')
    Promise.all([
      this.preCalc(),
      this.renderHichart(),
      this.setScrollManager(),
    ]).then(() => {
      debug('INIT FUNISHED')
      this.d3 = new FertilityD3()
      this.d3.init('#chart-d3-1')
    })
  }
  renderHichart () {
    return Promise.all(
      map([
        renderChart(document.querySelector(`.chart-container.a1m01 .hichart`), '1'),
        renderChart(document.querySelector(`.chart-container.a2m08 .hichart`), 'm08'),
        renderChart(document.querySelector(`.chart-container.a2m08-2 .hichart`), 'm08'),
        renderChart(document.querySelector(`.chart-container.a2m18-2 .hichart`), '11'),
        renderChart(document.querySelector(`.chart-container.a2m18-3 .hichart`), '11'),
        renderChart(document.querySelector(`.chart-container.a2m14 .hichart`), 'm14'),
        renderChart(document.querySelector(`.chart-container.a3m15 .hichart`), 'm15'),
        renderChart(document.querySelector(`.chart-container.a3m15-2 .hichart`), 'm15'),
        renderChart(document.querySelector(`.chart-container.a3t12 .hichart`), 't12'),
        renderChart(document.querySelector(`.chart-container.a3t12-2 .hichart`), 't12'),
        renderChart(document.querySelector(`.chart-container.a4m18 .hichart`), 'm18'),
        renderChart(document.querySelector(`.chart-container.a4m18-2 .hichart`), 'm18'),
        renderChart(document.querySelector(`.chart-container.a4m22 .hichart`), 'm22'),
        renderChart(document.querySelector(`.chart-container.a4m25 .hichart`), 'm25'),
        renderChart(document.querySelector(`.chart-container.a4m28 .hichart`), 'm28'),
        renderChart(document.querySelector(`.chart-container.a4t15 .hichart`), 't15'),
        renderChart(document.querySelector(`.chart-container.a4t18 .hichart`), 't18'),
        renderChart(document.querySelector(`.chart-container.a4t20 .hichart`), 't20'),
        renderChart(document.querySelector(`.chart-container.a4t20-2 .hichart`), 't20'),
      ], new Promise(resolve => resolve()))
    )
  }
  preCalc () {
    return new Promise((resolve) => {
      const domSects = [...document.querySelectorAll('section')]
      const articles = [...document.querySelectorAll('.articlewpr')]

      map(articles, (article, index) => {
        const sects = [...article.querySelectorAll('section')]
        map(sects, (sect, ind) => {
          addClass(sect, `article${index}-section${ind}`)
        })
      })

      debug('Abt to write all section basic info to hash.')
      map(domSects, (sect, index) => {
        const className = sect.getAttribute('class')
        if (!className) { return }
        const height = sect.clientHeight
        const top = elmYPosition({ ele: sect })
        const chart = sect.querySelector('.chart-container')
        // chart && chart.setAttribute('style', `width: ${chart.clientWidth}px;`)
        chart && this.setChartFixed(chart)

        this.hashSects.put(`s${index}`, { 
          ele: sect, height,
          top, bottom: height + top,
          selector: `.${className.split(' ').join('.')}`,
          chart
        })
      })
      debug('this.hashSects')
      debug(this.hashSects.values())
      resolve()
    })
  }
  setChartFixed (chart) {
    return new Promise((resolve) => {
      addClass(chart, 'fix')
      resolve()
    })
  }
  setupChartPos (chartContainer) {
    return new Promise((resolve) => {
      const sourceSet = chartContainer.parentNode.querySelector('.source-set')
      debugScroll('chartContainer', chartContainer.clientWidth)
      debugScroll('chartContainer sibling', sourceSet)
      const flag = chartContainer.querySelector('.ratiowpr__chart') || false
      const chart = flag || chartContainer.querySelector('.combo') || chartContainer.querySelector('.hichart') 
      if (!chart) { return }
      chart.setAttribute('style', 'position: relative;')
      debug('chart.clientWidth', chart.clientWidth, chart.getAttribute('style'))
      const height = chart.clientHeight
      const width = chart.clientWidth
      const top = `top: calc(50% - ${height / 2}px);`
      const left = `left: calc(50% - ${width / 2}px);`
      debug('width', width)
      if (flag) {
        chart.setAttribute('style', `${top}${left} width: ${width}px; z-index: 1;position: fixed;`)
      } else {
        chart.setAttribute('style', `${top} width: ${width}px; z-index: 1;position: fixed;`)
      }
      if (sourceSet) {        
        sourceSet.removeAttribute('style')
        // const sourcePos = getPosition(sourceSet)
        const align = sourceSet.getAttribute('textalign')
        const textAlign = align ? align === 'right'
        ? `text-align: center;`
        : `text-align: ${align};`
        : ``
        const sourceHight = sourceSet.clientHeight
        const sourceWidth = sourceSet.clientWidth
        const sourceTop = `top: calc(50% - ${height / 2}px - ${align ? 40 : 0}px);`
        const sourceLeft = flag ? align !== 'right' 
                                ? left
                                : `left: 50%;`
                                : ''
        // const sourceLeft = left
        sourceSet.setAttribute('style', `${sourceTop}${sourceLeft}width: ${sourceWidth}px; height: ${sourceHight}px;position: fixed;z-index: 2;${textAlign}`)
      }
      resolve()
    })
  }
  setCoverout (line) {
    return new Promise((resolve) => {
      addClass(line, 'active')
      resolve()
    })
  }
  setSectFadeIn (sect) {
    return new Promsie((resolve) => {
      removeClass(sect, 'fadein')
      resolve()
    })
  }
  scrollHandlerTriggerD3Auto () {
    const sects = this.hashSects.values()
    const curr = currentYPosition()
    const currSect = find(sects, (sect) => (sect.top <= curr && sect.bottom >= curr))
    // currSect && debug('currSect.selector.indexOf', currSect.selector.indexOf('trigger-d3-auto'))

    if (this.triggered || (currSect && currSect.selector.indexOf('trigger-d3-auto') === -1)) { return }
    let i = 1
    const playD3 = setInterval(() => {
      let year
      switch (i) {
        case 0:
          year = '1980'
          break
        case 1:
          year = '1986'
          break
        case 2:
          year = '1992'
          break
        case 3:
          year = '1998'
          break
        case 4:
          year = '2004'
          break
        case 5:
          year = '2010'
          break
        case 6:
          year = '2016'
      }
      debug('play d3:', year)
      this.d3.update(year)
      i++
      if (i > 6) {
        window.clearInterval(playD3)
      }
    }, 1500)
    this.triggered = true
  }
  scrollHandlerForLongFix () {
    const sects = this.hashSects.values()
    const curr = currentYPosition()
    const currSect = find(sects, (sect) => (sect.top <= curr && sect.bottom >= curr))
    this.longshowStart = this.longshowStart || document.querySelector('.longshow.start')
    this.longshowEnd = this.longshowEnd || document.querySelector('.longshow.end')
    if (!this.longshowStart || !this.longshowEnd) { return }
    this.longfix = this.longfix || this.longshowStart.querySelector('.ratiowpr__chart')
    if (!this.longfix) { return }
    const longshowStartTop = elmYPosition({ ele: this.longshowStart })
    const londshowEndTop = elmYPosition({ ele: this.longshowEnd })
    if (longshowStartTop <= curr && londshowEndTop + this.longshowEnd.clientHeight >= curr + deviceHeight) {
      addClass(this.longfix, 'keepshow')
    } else {
      removeClass(this.longfix, 'keepshow')
    }
  }
  scrollHandlerForFix (event) {
    const sects = this.hashSects.values()
    const curr = currentYPosition()
    const middle = curr + deviceHeight / 3
    let currSect = find(sects, (sect) => (sect.top <= middle && sect.bottom >= middle))

    const fixup = (container) => new Promise((resolve) => {
      container.removeAttribute('style')
      const chartContainerWidth = container.clientWidth
      const chartContainerHeight = container.clientHeight
      const width = `width: ${chartContainerWidth}px;`
      const height = `height: ${chartContainerHeight}px;`
      const top = `top: ${deviceHeight / 3}px;`
      container.setAttribute('style', `position: fixed; ${top}${width}${height}`)
      resolve()
    })
    const destroyFixup = (container) => new Promise((resolve) => {
      container.removeAttribute('style')
      resolve()
    })
    const goWithParent = (container) => new Promise((resolve) => {
      container.removeAttribute('style')
      const chartContainerWidth = container.clientWidth
      const chartContainerHeight = container.clientHeight
      const width = `width: ${chartContainerWidth}px;`
      const height = `height: ${chartContainerHeight}px;`
      container.setAttribute('style', `position: absolute; bottom: 0;${width}${height}`)
      resolve()
    })
    const goWithSibling = (container, marginBtm) => new Promise((resolve) => {
      container.removeAttribute('style')
      const chartContainerWidth = container.clientWidth
      const chartContainerHeight = container.clientHeight
      const width = `width: ${chartContainerWidth}px;`
      const height = `height: ${chartContainerHeight}px;`
      container.setAttribute('style', `position: absolute; bottom: ${marginBtm}px;${width}${height}`)
      resolve()
    })
    if (currSect && currSect.ele.className && currSect.ele.className.indexOf('fix') > -1) {
      const sectHeight = currSect.ele.clientWidth
      currSect.ele.setAttribute('style', `height: ${sectHeight}px;`)

      const chartContainer = currSect.ele.querySelector('.chart-container')
      const textContainer = currSect.ele.querySelector('.text-container')
      const ratiowpr = chartContainer.querySelector('.ratiowpr > div')
      const ratiowprTop = elmYPosition({ ele: ratiowpr })
      const firstChild = textContainer.firstElementChild
      const lastChild = textContainer.lastElementChild
      const firstChildTop = elmYPosition({ ele: firstChild })
      const lastChildTop = elmYPosition({ ele: lastChild })
      const lastChildBtm = lastChildTop + lastChild.clientHeight
      const currSectBtm = elmYPosition({ ele: currSect.ele }) + currSect.ele.clientHeight
      debug('currSectBtm', currSectBtm)
      debug('ratiowprTop', ratiowprTop)
      debug('lastChildBtm', lastChildBtm)
      debug('ratiowprTop + ratiowpr.clientHeight', ratiowprTop + ratiowpr.clientHeight, middle)
      if (ratiowpr && ratiowprTop <= middle && middle + ratiowpr.clientHeight <= lastChildBtm && firstChildTop <= middle) {
        fixup(ratiowpr)
      } else if (middle + ratiowpr.clientHeight >= lastChildBtm) {
        goWithSibling(ratiowpr, currSectBtm - lastChildBtm)
      } else {
        destroyFixup(ratiowpr)
      }
    } else if (currSect && currSect.ele.className.indexOf('fix') === -1) {
      const fixSection = [...document.querySelectorAll('section.fix')]
      map(fixSection, (section) => {
        const ratiowpr = section.querySelector('.chart-container .ratiowpr > div')
        const ratiowprTop = elmYPosition({ ele: ratiowpr })
        const textContainer = section.querySelector('.text-container')
        const lastChild = textContainer.lastElementChild
        const firstChild = textContainer.firstElementChild
        const firstChildTop = elmYPosition({ ele: firstChild })
        const lastChildTop = elmYPosition({ ele: lastChild })
        const lastChildBtm = lastChildTop + lastChild.clientHeight
        const currSectBtm = elmYPosition({ ele: section }) + section.clientHeight
        // if (firstChildTop <= middle) {
        //   destroyFixup(ratiowpr)
        // } else if (lastChildBtm >= middle){
        //   // goWithSibling(ratiowpr, currSectBtm - lastChildBtm)
        // }
        if (ratiowpr && ratiowprTop <= middle && middle + ratiowpr.clientHeight <= lastChildBtm && firstChildTop <= middle) {
          fixup(ratiowpr)
        } else if (middle + ratiowpr.clientHeight >= lastChildBtm) {
          goWithSibling(ratiowpr, currSectBtm - lastChildBtm)
        } else {
          destroyFixup(ratiowpr)
        }
      })
    }
  }
  scrollHandler (event) {
    const curr = currentYPosition()
    const middle = curr + deviceHeight / 2
    const sects = this.hashSects.values()
    const lastSect = document.querySelector('section.fadein')
    let currSect = find(sects, (sect) => (sect.top <= middle && sect.bottom >= middle))

    const fadein = () => {
      currSect.ele && addClass(currSect.ele, 'fadein')
      const line = currSect.ele.querySelector('.ratiowpr__chart__img.line')
      line && this.setCoverout(line)
    }
    if (currSect && lastSect !== currSect.ele) {
      if (currSect && currSect.chart) {
        this.setupChartPos(currSect.chart).then(() => fadein())
      } else {
        fadein()
      }
      lastSect && removeClass(lastSect, 'fadein')
      debugScroll('currSect', currSect.selector)
    }
    if (curr > 1) {
      const sourceSet = document.querySelector('.source-set')
      const exception = document.querySelector('.exception')
      if (sourceSet) {
        sourceSet.removeAttribute('style')
        exception.removeAttribute('style')
        const sourceHight = sourceSet.clientHeight
        const sourceWidth = sourceSet.clientWidth
        const sourcePos = getPosition(sourceSet)
        const sourceTop = `top: ${sourcePos.y}px;`
        const sourceLeft = ``
        sourceSet.setAttribute('style', `position: fixed;${sourceTop}${sourceLeft} width: ${sourceWidth}px; height: ${sourceHight}px;`)
        exception.setAttribute('style', `position: fixed;top: ${sourcePos.y + sourceHight}px;`)
      } else {
        exception.setAttribute('style', `position: fixed;`)
      }
    } else {
      document.querySelector('.exception').removeAttribute('style')
      document.querySelector('.source-set').removeAttribute('style')
      // document.querySelector('.source-set').removeAttribute('style')
    }
  }
  setScrollManager () {
    return new Promise((resolve) => {
      window.addEventListener('scroll', this.scrollHandler)
      window.addEventListener('scroll', this.scrollHandlerForFix)
      window.addEventListener('scroll', this.scrollHandlerForLongFix)
      window.addEventListener('scroll', this.scrollHandlerTriggerD3Auto)
      resolve()
    })
  }
  resetScrollManager () {
    return Promise.all([
      new Promise((resolve) => {
        window.removeEventListener('scroll', this.scrollHandler)
        window.removeEventListener('scroll', this.scrollHandlerForFix)
        window.removeEventListener('scroll', this.scrollHandlerForLongFix)
        window.removeEventListener('scroll', this.scrollHandlerTriggerD3Auto)
        resolve()
      }),
      this.setScrollManager()
    ])
  }
  fixSectChart (chart) {
    return new Promise((resolve) => {
      addClass(chart, 'fix')
      resolve()
    })
  }
}
class ArticleMobile extends Article{
  constructor () {
    super()
    this.setupScrollManager =  this.setupScrollManager.bind(this)
    this.triggerAnimation = this.triggerAnimation.bind(this)
  }
  init () {
    Promise.all([
      this.preCalc(),
      this.renderHichart(),
      this.setupScrollManager(),
    ]).then(() => {
      this.d3 = new FertilityD3()
      this.d3.init('#chart-d3-1')
      this.d35 = new FertilityD3()
      this.d35.init('#chart-d3-5', '2016')
    })
  }
  preCalc () {
    return new Promise((resolve) => {
      const domSects = [...document.querySelectorAll('section')]
      const articles = [...document.querySelectorAll('.articlewpr')]
  
      map(articles, (article, index) => {
        const sects = [...article.querySelectorAll('section')]
        map(sects, (sect, ind) => {
          addClass(sect, `article${index}-section${ind}`)
        })
      })
  
      debugRaw('FERTILITY:MOBILE:PreCalc')('Abt to write all section basic info to hash.')
      map(domSects, (sect, index) => {
        const className = sect.getAttribute('class')
        if (!className) { return }
        const height = sect.clientHeight
        const top = elmYPosition({ ele: sect })
        const selector = `.${className.split(' ').join('.')}`
        this.hashSects.put(`${selector}`, { 
          ele: sect,
          height,
          top,
          bottom: height + top,
          selector
        })
      })
      debugRaw('FERTILITY:MOBILE:PreCalc')(this.hashSects.values())
      resolve()
    })
  }
  triggerAnimation () {
    const curr = currentYPosition()
    const base = curr + deviceHeight / 3
    const sects = this.hashSects.values()
    const lastSect = document.querySelector('section.fadein')
    let currSect = find(sects, (sect) => {
      const sectTop = elmYPosition({ ele: sect.ele })
      const sectBtm = sectTop + sect.ele.clientHeight
      // debugRaw('FERTILITY:MOBILE:REVISE')(`${sect.height} >>`, `${sect.ele.clientHeight}`)
      // debugRaw('FERTILITY:MOBILE:REVISE')(`${sect.top} >>`, `${sectTop}`)
      // debugRaw('FERTILITY:MOBILE:REVISE')(`${sect.bottom} >>`, `${sectBtm}`)
      this.hashSects.put(sect.selector, {
        ele: sect.ele,
        height: sect.ele.clientHeight,
        top: sectTop,
        bottom: sectBtm,
        selector: sect.selector
      })
      return sectTop <= base && sectBtm >= base
    })
    const fadein = () => {
      currSect.ele && addClass(currSect.ele, 'fadein')
    }
    if (currSect && lastSect !== currSect.ele) {
      fadein()
      lastSect && removeClass(lastSect, 'fadein')
      debugMobile('currSect', currSect.selector)
    } else if (currSect) {
      const line = currSect.ele.querySelector('.ratiowpr__chart__img.line')
      if (line) {
        const lineTop = elmYPosition({ ele: line })
        if (lineTop < curr + deviceHeight / 3) {
          this.setCoverout(line)
        }
      }
    }
  }
  setupScrollManager () {
    return new Promise((resolve) => {
      window.addEventListener('scroll', this.triggerAnimation)
      resolve()
    })
  }
}
window.addEventListener('DOMContentLoaded', () => {
  let fertility
  window.addEventListener('layoutDone', () => {
    window.localStorage.debug = 'FERTILITY:*,FERTILITY:SCROLL,COMM,d3'
    deviceHeight = verge.viewportH()
    deviceWidth =  verge.viewportW()
    /**
     * checkout the device type by viewport
     */

    debugLayoutDone(location.href)
    debugLayoutDone('viewport', deviceWidth, deviceHeight)
    if (deviceWidth < 1001) {
      debugLayoutDone('render mobile version')
      fertility = new ArticleMobile()
    } else {
      debugLayoutDone('abt to init dertility')
      fertility = location.href.indexOf('article') === -1 ? new Fertility() : new Article()
    }
    fertility.init()
  })
  window.addEventListener('resize', () => {
    // fertility.destroy()
    location.reload()
  })
})