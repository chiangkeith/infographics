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
export const M14_REAL = {
  chart: {
      zoomType: 'xy',
      borderWidth: 0,
      marginTop: 20,
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
  xAxis: [{
      categories: ['一般保母（不含親屬保母）', '私立托嬰中心', '公私協力托嬰中心'],
      crosshair: true
  }],
  yAxis: [{ // Primary yAxis
      min: 0,
      gridLineColor: '#e6e6e6',
      gridLineWidth: 1,
      labels: {
          format: '{value}',
          style: {
              color: '#0083C8'
          }
      },
      title: {
          text: '數量',
          style: {
              color: '#0083C8'
          }
      }
  }, { // Secondary yAxis
      title: {
          text: '使用率（%）',
          style: {
              color: '#BA8A00'
          }
      },
      labels: {
          format: '{value} ',
          style: {
              color: '#BA8A00'
          }
      },
      opposite: true
  }],
  tooltip: {
      enabled: false
  },
  plotOptions: {
  column: {
    pointPadding: 0.1,
    borderWidth: 0,
    dataLabels:{
       enabled:true,
       color: '#1A1A1A',
       style:{
       fontSize: '12px',
       textOutline: '0px'
       }
     }
  }
},
  series: [{
      name: '使用率',
      type: 'column',
      yAxis: 1,
      data: [48.7, 52.7, 98.6],
      color: '#BA8A00',
      tooltip: {
          valueSuffix: '%',
          enabled: false
      }

  }, {
      name: '數量',
      type: 'column',
      data: [24259, 710, 98],
      color: '#0083C8',
      tooltip: {
          valueSuffix: '數量',
          enabled: false
      }
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
export const T12 = {
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
    subtitle: {
        text: ''
    },
    xAxis: {
        categories: [
      '24-45歲勞參率', '24-45歲有6歲以下子女勞參率'
    ],
    crosshair: false
    },
    yAxis: {
        min: 0,
        max: 110,
        gridLineColor: '#e6e6e6',
        gridLineWidth: 1,
        title: {
          text: '勞參率(%)'
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
      pointPadding: 0.2,
      borderWidth: 0,
      dataLabels:{
         format:'{point.y:.1f}%',
         enabled:true,
         color: '#1A1A1A',
         style:{
         fontSize: '16px',
         textOutline: '0px'
         }
       }
    }
  },
  series: [{
    name: '男',
    data: [94.85, 98.75],
    color: '#BA8A00'
  }, {
    name: '女',
    data: [81.01, 68.77],
    color: '#C1272D'
  },]
}
export const M22 = {
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
export const M25 = {
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
export const M28 = {
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
export const M26 = {}
export const T15 = {
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
export const T18 = {
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
export const T20 = {
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
export const M18_REAL = {
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
      categories: ['韓國', '丹麥', '盧森堡', '葡萄牙', '瑞典','法國','德國','奧地利','比利時','希臘','冰島','匈牙利','英國','愛沙尼亞','瑞士','挪威','波蘭','西班牙','荷蘭','OCED 平均','澳洲','斯洛維尼亞','芬蘭','台灣','紐西蘭','日本','以色列','捷克','斯洛伐克','加拿大','愛爾蘭','美國'],
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
              enabled:true,
              format:'{point.y:.1f} %',
              color: '#1A1A1A',
               style:{
               fontSize: '10px',
               textOutline: '0px'
              }
          }
      }
  },
  series: [{
      name: '百分比',
      data: [0,2.9,3.2,3.8,4.2,4.4,5.2,5.6,5.9,6.1,6.9,7.7,7.9,10.2,10.6,11.1,11.4,12.1,12.9,13.5,14.1,16.1,17.1,18.03,20.5,22.3,22.4,23,24.4,32.3,41.6,52.7],
      color: '#C1272D'
  }]
}
export const M08 = {
  chart: {
      type: 'bar',
      borderWidth: 0,
      marginTop: 20,
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
      categories: ['發放生育或教育津貼', '給予托育費用補助', '提供鼓勵生育工作環境', '給予未成年子女教養支出之<br/>稅負減免', '給予養育 2 名及以上子女家庭優先承購國宅、<br/>申請外傭或購屋貸款利息補貼','配偶或家人願分擔家務<br/>及育兒工作','給予人工生殖補助','其他'],
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
      name: '因素',
      data: [28.87, 27.68, 14.52, 10.53, 7.3, 5.85, 4.47, 0.77],
      color: '#C1272D'
  }]
}
export const M15_REAL = {
  chart: {
      borderWidth: 0,
      marginTop: 50,
      marginBottom: 50,
      backgroundColor: '#f8f3d6',
  },
  title: {
      text: ''
  },
  credits: {
      enabled: false
  },
  legend: {
    align: 'right', 
    verticalAlign: 'top',
    y: -20
  },
  plotOptions: {
    series: {
      dataLabels: {
        enabled: true,
        format: "{point.name}",
        align: 'right',
        verticalAlign: 'middle',
        x: -2,
        y: -1,
        style: {
          textOutline: 0
        }
      }
    }
  },
  tooltip: {
    enabled: true,
    headerFormat: '<b>{point.key}</b><br>',
    pointFormat: '生育率: {point.x} %<br>托育率: {point.y} %'
  },
  exporting: { enabled: false },
  xAxis: {
      min: 1,
      max: 2,
      title: { text: '生育率 (個)' },
  },
  yAxis: {
      min: 0,
      max: 80,
      title: { text: '托育率 (%)' },
  },
  series: [
    {
        type: 'line',
        name: '線性迴歸',
        data: [[1.07, 15.43], [2, 48.41]],
        color: '#1a1a1a',
        dashStyle: 'Dash',
        marker: {
            enabled: false
        },
        states: {
            hover: {
                lineWidth: 0
            }
        },
        enableMouseTracking: false
    },
    {
      type: 'scatter',
      name: '生育率低於 1.5',
      marker: { radius: 3, fillColor: '#BA8A00', symbol: 'circle' },
      data: [
        { x: 1.2, y: 43.4, name: "葡萄牙" },
        { x: 1.5, y: 41.0, name: "瑞士" },
        { x: 1.3, y: 36.0, name: "西班牙" },
        { x: 1.2, y: 34.3, name: "韓國" },
        { x: 1.4, y: 29.4, name: "日本" },
        { x: 1.4, y: 29.3, name: "德國" },
        { x: 1.5, y: 23.3, name: "拉脫維亞" },
        { x: 1.4, y: 23.1, name: "以色列" },
        { x: 1.5, y: 22.8, name: "愛沙尼亞" },
        { x: 1.4, y: 19.3, name: "奧地利" },
        { x: 1.3, y: 16.9, name: "希臘" },
        { x: 1.3, y: 14.2, name: "匈牙利" },
        { x: 1.07, y: 9.83, name: "台灣" },
        { x: 1.3, y: 9.3, name: "波蘭" },
        { x: 1.5, y: 4.3, name: "捷克" },
        { x: 1.3, y: 3.1, name: "斯洛伐克" },
      ]
    },
    {
      type: 'scatter',
      name: '生育率高於 1.5',
      marker: { radius: 3, fillColor: '#C1272D', symbol: 'circle' },
      data: [
        { x: 1.7, y: 67.1, name: "丹麥" },
        { x: 1.9, y: 58.6, name: "冰島" },
        { x: 1.8, y: 54.8, name: "挪威" },
        { x: 1.7, y: 54.6, name: "荷蘭" },
        { x: 1.6, y: 53.6, name: "盧森堡" },
        { x: 2, y: 50.6, name: "法國" },
        { x: 1.7, y: 47.8, name: "比利時" },
        { x: 1.9, y: 47.6, name: "瑞典" },
        { x: 1.6, y: 41.6, name: "斯洛維尼亞" },
        { x: 2, y: 40.9, name: "紐西蘭" },
        { x: 1.8, y: 34.4, name: "英國" },
        { x: 1.7, y: 33.8, name: "OECD平均" },
        { x: 2, y: 32.9, name: "愛爾蘭" },
        { x: 1.8, y: 28.2, name: "芬蘭" },
        { x: 1.8, y: 18.4, name: "智利" },
      ]
    }
  ]
}