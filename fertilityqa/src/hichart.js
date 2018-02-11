export const M01 = {
  chart: {
    type: 'line',
    borderWidth: 0,
    marginTop:20,
    marginBottom: 40,
    backgroundColor: '#f8f3d6',
  },
  credits: {
    enabled: false
  },
  legend: {
    enabled: false
  },
  title: {
    text: ''
  },
  subtitle: {
    text: ''
  },
  xAxis: {
    categories: ['1996', '1997', '1998', '1999', '2000', '2001','2002','2003','2004','2005','2006','2007','2008','2009','2010','2011', '2012', '2013', '2014', '2015', '2016', '2017']
  },
  yAxis: {
    title: {
      text: '出生人數'
    }
  },
  tooltip: {
  //borderColor: null
    pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> 人<br/>',
    shared: false,
    backgroundColor: '#ffffff',
    borderWidth: 0,
    enabled:true
  },
  plotOptions: {
    line: {
      dataLabels: {
        enabled: false,
        color: '#1A1A1A',
          style:{
          fontSize: '9px',
          textOutline: '0px'
        }
      },
      enableMouseTracking: true
    }
  },
  series: [{
    name: '出生人數',
    data: [325545, 326002, 271450, 283661, 305312, 260354, 247530, 227070, 216419, 205854, 204459, 204414, 198733,191310,166886,196627,229481,199113,210383,213598,208440],
    color: '#C1272D'
  }]
}
export const M141 = {
  chart: {
      type: 'column',
      borderWidth: 0,
      marginTop:20,
      marginBottom: 40,
      backgroundColor: '#f8f3d6',
  },
  credits: {
      enabled: false
  },
  legend: {
      enabled: false
  },
  title: {
      text: ''
  },
  xAxis: {
      categories: ['女性', '育有 2 歲以下兒童 OECD 平均工時', '育有 2 歲以下兒童 歐盟平均工時', '育有 3-5 歲兒童 OECD 平均工時', '育有 3-5 歲兒童 歐盟平均工時']
  },
  yAxis: {
      min: 0,
      gridLineColor: '#e6e6e6',
      gridLineWidth: 1,
      title: {
          text: ''
      }
  },
  tooltip: {
  //borderColor: null
      pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
      shared: false,
      backgroundColor: '#ffffff',
      borderWidth: 0,
      enabled:false
  },
  plotOptions: {
      column: {
          stacking: 'percent',
          pointPadding: 0,
          borderWidth: 0,
          dataLabels:{
          enabled:true,
          format:'{point.y:.1f}%',
          color: '#1A1A1A',
          style:{
             fontSize: '12px',
             textOutline: '0px'
             }
          }
      }
  },
  series: [{
      name: '1-29',
      data: [3.39, 24.52, 20.96, 25.27, 22.31],
      color:'#0083C8'
  }, {
      name: '30-39',
      data: [3.95, 26.01, 25.20, 25.95, 25.48],
      color:'#BA8A00'
  }, {
      name: '40-44',
      data: [68.15, 38.31, 45.62, 38.43, 44.97],
      color:'#C1272D'
  }, {
      name: '45小時以上',
      data: [24.51, 8.77, 5.72, 9.61, 6.50],
      color:'#808080'
  }, {
      name: '其他',
      data: [0, 2.38, 2.51, 0.74, 0.73],
      color:'#1A1A1A'
  }]
}
export const M131 = {
  chart: {
      type: 'bar',
      borderWidth: 0,
      marginTop:20,
      marginBottom: 40,
      backgroundColor: '#f8f3d6',
  },
  credits: {
      enabled: false
  },
  legend: {
      enabled: false
  },
  title: {
      text: ''
  },
  subtitle: {
      text: ''
  },
  xAxis: {
      categories: ['申請安胎休養', '申請產檢假', '申請流產假', '申請產假', '申請陪產假', '申請哺乳時間', '申請家庭照顧假', '申請育嬰留職停薪'],
      title: {
          text: null
      }
  },
  yAxis: {
      min: 0,
      gridLineColor: '#e6e6e6',
      gridLineWidth: 1,
      title: {
          text: '',
          align: 'high'
      },
      labels: {
          overflow: 'justify'
      }
  },
  tooltip: {
      valueSuffix: '%',
      enabled: false
  },
  plotOptions: {
      bar: {
          pointPadding: 0.1,
          borderWidth: 0,
          dataLabels: {
              format:'{point.y:.1f}%',
              enabled: true,
              color: '#1A1A1A',
               style:{
               fontSize: '16px',
               textOutline: '0px'
              }
          }
      }
  },
  series: [{
      name: '不同意原因',
      data: [8.2, 17.4, 8.3, 5.3, 14.1, 19.7, 22.9, 19.5],
      color: '#C1272D'
  }]
}
export const M14 = {
  chart: {
      plotBackgroundColor: '#f8f3d6',
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie'
  },
  credits: {
      enabled: false
  },
  legend: {
      enabled: false
  },
  title: {
      text: ''
  },
  
  tooltip: {
      enabled:false,
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
  },
  plotOptions: {
      pie: {
          pointPadding: 0.1,
          borderWidth: 0,
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
              enabled: true,
              format: '<b>{point.name}</b>: {point.percentage:.1f} %',
              color: '#1A1A1A',
               style:{
                   fontSize: '12px',
                   textOutline: '0px'
                  }
          }
      }
  },
  series: [{
      name: '比例',
      colorByPoint: true,
      data: [{
          name: '不同意員工申請',
          y: 15.8,
          color:'#C1272D'
      }, {
          name: '會同意員工申請',
          y: 84.2,
          color:'#808080',
          sliced: true,
          selected: true
      }]
  }]
}
export const M15 = {
  chart: {
      type: 'bar',
      borderWidth: 0,
      marginTop:20,
      marginBottom: 40,
      backgroundColor: '#f8f3d6',
  },
  credits: {
      enabled: false
  },
  legend: {
      enabled: false
  },
  title: {
      text: ''
  },
  subtitle: {
      text: ''
  },
  xAxis: {
      categories: ['可以請，但必須自己找<br/>職務代理人', '直接被拒絕', '可以請，但領完津貼之後<br/>就要離職', '可以請，但必須減薪或降職', '其他'],
      title: {
          text: null
      }
  },
  yAxis: {
      min: 0,
      gridLineColor: '#e6e6e6',
      gridLineWidth: 1,
      title: {
          text: '',
          align: 'high'
      },
      labels: {
          overflow: 'justify'
      }
  },
  tooltip: {
      valueSuffix: '%',
      enabled:false
  },
  plotOptions: {
      bar: {
          pointPadding: 0.1,
          borderWidth: 0,
          dataLabels: {
              format:'{point.y:.1f}%',
              enabled: true,
              color: '#1A1A1A',
               style:{
               fontSize: '16px',
               textOutline: '0px'
              }
          }
      }
  },
  series: [{
      name: '刁難原因',
      data: [29, 27, 22, 20, 17],
      color: '#C1272D'
  }]
}
export const M20 = {
  chart: {
      type: 'bar',
      borderWidth: 0,
      marginTop:20,
      marginBottom: 40,
      backgroundColor: '#f8f3d6',
  },
  credits: {
      enabled: false
  },
  legend: {
      enabled: false
  },
  title: {
      text: ''
  },
  subtitle: {
      text: ''
  },
  xAxis: {
      categories: ['可能會丟工作', '考績可能受影響', '升遷會受影響', '收入可能會減少', '下次調薪可能沒我的份', '我的同事對請育嬰假的人<br/>不太友善', '其他'],
      title: {
          text: null
      },
      
  },
  yAxis: {
      min: 0,
      gridLineColor: '#e6e6e6',
      gridLineWidth: 1,
      title: {
          text: '',
          align: 'high'
      },
      labels: {
          overflow: 'justify'
      }
  },
  tooltip: {
      valueSuffix: '%',
      enabled: false
  },
  plotOptions: {
      bar: {
          pointPadding: 0.1,
          borderWidth: 0,
          dataLabels: {
              format:'{point.y:.1f}%',
              enabled: true,
              color: '#1A1A1A',
               style:{
               fontSize: '16px',
               textOutline: '0px'
              }
          }
      },
      
  },
  series: [{
      name: '擔心受到哪些歧視',
      data: [45, 40, 33, 32, 21, 19, 45],
      color: '#C1272D'
  }]
}
export const M18 = {
  chart: {
      type: 'bar',
      borderWidth: 0,
      marginTop:20,
      marginBottom: 40,
      backgroundColor: '#f8f3d6',
  },
  credits: {
      enabled: false
  },
  legend: {
      enabled: false
  },
  title: {
      text: ''
  },
  subtitle: {
      text: ''
  },
  xAxis: {
      categories: ['要求員工懷孕須接受<br/>主管進行職務調動', '要求員工懷孕就必須留職停薪', '要求員工懷孕便自動離職', '要求員工懷孕就減薪', '其他'],
      title: {
          text: null
      }
  },
  yAxis: {
      min: 0,
      gridLineColor: '#e6e6e6',
      gridLineWidth: 1,
      title: {
          text: '',
          align: 'high'
      },
      labels: {
          overflow: 'justify'
      }
  },
  tooltip: {
      valueSuffix: '%',
      enabled: false
  },
  plotOptions: {
      bar: {
          pointPadding: 0.1,
          borderWidth: 0,
          dataLabels: {
              format:'{point.y:.1f}%',
              enabled: true,
              color: '#1A1A1A',
              style:{
              fontSize: '16px',
              textOutline: '0px'
              }
          }
      }
  },
  series: [{
      name: '刁難原因',
      data: [49, 19, 15, 3, 31],
      color: '#C1272D'
  }]
}