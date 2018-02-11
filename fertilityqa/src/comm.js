import * as config from './hichart'
const debug = require('debug')('COMM')

export function trim(str) {
  return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
}

export function addClass(ele, cls) {
  if (!hasClass(ele, cls)) {
    ele.className += ' ' + cls;
  }
  ele.className = trim(ele.className)
}

export function hasClass(ele, cls) {
  if (ele.className) {
    // console.log(cls, ele.className)
    return ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
  } else {
    return ele.className = cls;
  }
}

export function removeClass(ele, cls) {
  if (hasClass(ele, cls)) {
    const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
    ele.className = ele.className.replace(reg, ' ');
  }
  ele.className = trim(ele.className)
}

export function getClientOS () {
  const userAgent = window.navigator.userAgent
  const platform = window.navigator.platform
  const macosPlatforms = [ 'Macintosh', 'MacIntel', 'MacPPC', 'Mac68K' ]
  const windowsPlatforms = [ 'Win32', 'Win64', 'Windows', 'WinCE' ]
  const iosPlatforms = [ 'iPhone', 'iPad', 'iPod' ]
  let os = null

  if (macosPlatforms.indexOf(platform) !== -1) {
    os = 'Mac OS'
  } else if (iosPlatforms.indexOf(platform) !== -1) {
    os = 'iOS'
  } else if (windowsPlatforms.indexOf(platform) !== -1) {
    os = 'Windows'
  } else if (/Android/.test(userAgent)) {
    os = 'Android'
  } else if (!os && /Linux/.test(platform)) {
    os = 'Linux'
  }
  return os
}

export function renderChart (ele, targKey) {
  let configKey = ''
  switch (targKey) {
    case '1':
    case '81':
      configKey = 'M01'
      break
    case '11':
    case '811':
      configKey = 'M18'
      break
    case '14':
    case '814':
      configKey = 'M14'
      break
    case '141':
    case '8141':
      configKey = 'M141'
      break
    case '16112':
    case '816112':
    case '16251':
    case '816251':
    case 'm15':
      configKey = 'M15'
      break
    case '131':
    case '8131':
      configKey = 'M131'
      break
    case '23':
    case '823':
      configKey = 'M18'
      break
    case '16123':
    case '816123':
      configKey = 'M20'
      break
    case 'm08':
      configKey = 'M08'
      break
    case 'm13':
      configKey = 'M13'
      break
    case 'm14':
      configKey = 'M14_REAL'
      break
    case 't12':
      configKey = 'T12'
      break
    case 't13':
      configKey = 'T13'
      break
    case 'm22':
      configKey = 'M22'
      break
    case 'm25':
      configKey = 'M25'
      break
    case 'm28':
      configKey = 'M28'
      break
    case 'm26':
      configKey = 'M26'
      break
    case 'm27':
      configKey = 'M27'
      break
    case 't15':
      configKey = 'T15'
      break
    case 't18':
      configKey = 'T18'
      break
    case 't20':
      configKey = 'T20'
      break
    case 'm18':
      configKey = 'M18_REAL'
      break
  }
  debug('targKey', targKey, typeof(targKey), ele)
  debug('configKey', configKey)
  if (!configKey) { return }
  Highcharts.chart(ele, config[ configKey ])
}

export function elmYPosition({ ele, eID, errHandler }) {
  let elm = ele ? ele : document.querySelector(eID);
  if (!elm) { 
    errHandler && errHandler({
      message: 'cannot find element' + eID
    })
    return
  }
  let y = elm.offsetTop;
  let node = elm;
  while (node.offsetParent && node.offsetParent != document.body) {
      node = node.offsetParent;
      y += node.offsetTop;
  }
  return y;
}