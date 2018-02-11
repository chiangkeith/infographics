import './index.styl'
import { addClass, elmYPosition, getClientOS, renderChart, removeClass, hasClass } from './comm'
import { currentYPosition, smoothScrollTo } from 'kc-scroll'
import { find } from 'lodash'
import HashTable from 'jshashtable'
import verge from 'verge'

const debug = require('debug')('FERTILITY:DEFAULT')
const debugScroll = require('debug')('FERTILITY:SCROLL')
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
    this.setScrollManager = this.setScrollManager.bind(this)
    this.resetScrollManager = this.resetScrollManager.bind(this)
  }
  init () {
    debug('INIT ARTICLE')
    renderChart(document.querySelector(`.chart-container.a1m01 .hichart`), '1')
    // renderChart(document.querySelector(`.a1m18 .hichart`), '11')
    renderChart(document.querySelector(`.chart-container.a1m18 .hichart`), 'm18')
    renderChart(document.querySelector(`.chart-container.a2m18 .hichart`), '11')
    // renderChart(document.querySelector(`.chart-container.a2m13 .hichart`), '11')
    renderChart(document.querySelector(`.chart-container.a2m14 .hichart`), 'm14')
    renderChart(document.querySelector(`.chart-container.a3m15 .hichart`), 'm15')
    renderChart(document.querySelector(`.chart-container.a3t12 .hichart`), 't12')
    renderChart(document.querySelector(`.chart-container.a3m18 .hichart`), 'm18')
    renderChart(document.querySelector(`.chart-container.a4m22 .hichart`), 'm22')
    renderChart(document.querySelector(`.chart-container.a4m25 .hichart`), 'm25')
    renderChart(document.querySelector(`.chart-container.a4m28 .hichart`), 'm28')
    // renderChart(document.querySelector(`.chart-container.a4m26 .hichart`), 'm26')
    // renderChart(document.querySelector(`.chart-container.a4m27 .hichart`), 'm27')
    renderChart(document.querySelector(`.chart-container.a4t15 .hichart`), 't15')
    renderChart(document.querySelector(`.chart-container.a4t18 .hichart`), 't18')
    renderChart(document.querySelector(`.chart-container.a4t20 .hichart`), 't20')
    document.querySelector('.exception').setAttribute('style', 'opacity: 1;')
    Promise.all([
      this.preCalc(),
      this.setScrollManager()
    ]).then(() => {
      debug('INIT FUNISHED')
    })
  }
  preCalc () {
    return new Promise((resolve) => {
      const domSects = [...document.querySelectorAll('section')]
      const articles = [...document.querySelectorAll('.articlewpr')]

      articles.map((article, index) => {
        const sects = [...article.querySelectorAll('section')]
        sects.map((sect, ind) => {
          addClass(sect, `article${index}-section${ind}`)
        })
      })

      debug('Abt to write all section basic info to hash.')
      domSects.map((sect, index) => {
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
      debugScroll('chartContainer', chartContainer.clientWidth)
      const flag = chartContainer.querySelector('.ratiowpr__chart') || false
      const chart = flag || chartContainer.querySelector('.hichart') 
      if (!chart) { return }
      const height = chart.clientHeight
      const width = chart.clientWidth
      if (flag) {
        chart.setAttribute('style', `top: 50%; left: 50%; margin-top: -${height / 2}px; margin-left: -${width / 2}px; width: ${chart.clientWidth}px; height: ${chart.clientHeight}px;`)
      } else {
        chart.setAttribute('style', `top: 50%; margin-top: -${height / 2}px; width: ${chart.clientWidth}px; height: ${chart.clientHeight}px;`)
      }
      resolve()
    })
  }
  setSectFadeIn (sect) {
    return new Promsie((resolve) => {
      removeClass(sect, 'fadein')
      resolve()
    })
  }
  scrollHandler (event) {
    const deviceHeight = verge.viewportH()
    const curr = currentYPosition()
    const middle = curr + deviceHeight / 2
    const sects = this.hashSects.values()
    const lastSect = document.querySelector('section.fadein')
    let currSect = find(sects, (sect) => (sect.top <= middle && sect.bottom >= middle))

    if (currSect && lastSect !== currSect.ele) {
      if (currSect && currSect.chart) {
        this.setupChartPos(currSect.chart).then(() => (currSect.ele && addClass(currSect.ele, 'fadein')))
      } else {
        currSect.ele && addClass(currSect.ele, 'fadein')
      }
      lastSect && removeClass(lastSect, 'fadein')
      debugScroll('currSect', currSect.selector)
    }
    if (curr > 1) {
      document.querySelector('.exception').setAttribute('style', 'position: fixed;')
    } else {
      document.querySelector('.exception').removeAttribute('style')
    }
  }
  setScrollManager () {
    return new Promise((resolve) => {
      window.addEventListener('scroll', this.scrollHandler)
      resolve()
    })
  }
  resetScrollManager () {
    return Promise.all([
      new Promise((resolve) => {
        windoe.removeEventListener('scroll', this.scrollHandler)
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
window.addEventListener('DOMContentLoaded', () => {
  window.addEventListener('layoutDone', () => {
    window.localStorage.debug = 'FERTILITY:*,FERTILITY:SCROLL,COMM'
    debug(location.href)
    const fertility = location.href.indexOf('article') === -1 ? new Fertility() : new Article()
    fertility.init()
  })
})