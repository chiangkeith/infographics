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
  }
  debug('targKey', targKey, typeof(targKey), ele)
  debug('configKey', configKey)
  if (!configKey) { return }
  Highcharts.chart(ele, config[ configKey ])
}