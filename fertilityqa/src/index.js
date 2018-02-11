import './index.styl'
import { addClass, getClientOS, renderChart } from './comm'
import { smoothScrollTo, elmYPosition } from 'kc-scroll'
import * as config from './hichart'

const debug = require('debug')('FERTILITY')
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
  init () {
    debug('INIT ARTICLE')
    renderChart(document.querySelector(`article[data-key="1"] .hichart`), '1')
  }
}
window.addEventListener('DOMContentLoaded', () => {
  window.addEventListener('layoutDone', () => {
    debug(location.href)
    const fertility = location.href.indexOf('article') === -1 ? new Fertility() : new Article()
    fertility.init()
  })
})