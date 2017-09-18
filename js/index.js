var Index = function() {
    var handleActive = function(param) {
        //var echarts3 = echarts;
        //head gauge
        var ec_option = function(current, total, name) {
            var option = {
                tooltip : {
                    show : false,
                },
                toolbox : {
                    show : false,
                },
                series : [{
                    name : '网络层攻击',
                    type : 'gauge',
                    z : 3,
                    min : 0,
                    max : 1,
                    splitNumber : 0,
                    startAngle : 230,
                    endAngle : -50,
                    axisLine : {
                        lineStyle : {// 属性lineStyle控制线条样式
                            width : 12
                        }
                    },
                    axisLabel : {
                        show : false,
                    },
                    splitLine : {// 分隔线
                        length : 0, // 属性length控制线长
                        show : false,
                        lineStyle : {// 属性lineStyle（详见lineStyle）控制线条样式
                            color : '#047bea',
                            width : 0,
                            type : 'solid'
                        }
                    },
                    pointer : {
                        length : 0,
                        width : 0,
                        show : false,
                    },
                    title : {
                        textStyle : {// 其余属性默认使用全局文本样式，详见TEXTSTYLE
                            fontSize : 12,
                            offsetCenter : [0, '-12%'],
                            color : '#5d7081'
                        }
                    },
                    detail : {
                        offsetCenter : [0, '15%'],
                        textStyle : {// 其余属性默认使用全局文本样式，详见TEXTSTYLE
                            fontSize : 24,
                            color : '#047bea'
                        }
                    },
                    data : [{
                        value : 0,
                        name : '网络层攻击'
                    }]
                }]
            };
            if(name){
                option.series[0].name = name;
                option.series[0].data[0].name = name
            }
            option.series[0].axisLine.lineStyle.color = [[(current / total).toFixed(2), '#047bea'], [1, '#2b4253']];
            option.series[0].data[0].value = current;
            return option;
        };
        
        var buildUL = function(current, total, cls, pcls){
            var ul = '';
            var percent = parseInt(current/total*11);
            for(var i=1;i<=11;i++){
                var li = '';
                var color = pcls;
                if(percent > 0) color = cls;
                ul += '<li class="'+color+'"><s class="top___sRza5"></s><s class="foot___1WFgY"></s></li>';
                percent --;
            }
            return ul;
        };
        
        var fn_head = function(){
            var ret = datasource.ddos.head;

            $('#totalAttack').html(ret.totalAttack);
            $('#protect').html(ret.protect);
            $('#attacked_ul').html(buildUL(ret.attacked, ret.protect, 'bluefence___3sYoA', 'pbluefence___JSGmO'));
            $('#attacked').html(ret.attacked);
            
            $('#clearTotal').html(ret.clearTotal);
            $('#netDDos_ul').html(buildUL(ret.netDDos, ret.clearTotal, 'redfence___2UJBd', 'predfence___2UJBd'));
            $('#netDDos').html(ret.netDDos);
            $('#serviceDDos_ul').html(buildUL(ret.serviceDDos, ret.clearTotal, 'redfence___2UJBd', 'predfence___2UJBd'));
            $('#serviceDDos').html(ret.serviceDDos);
            $('#slowDDos_ul').html(buildUL(ret.slowDDos, ret.clearTotal, 'redfence___2UJBd', 'predfence___2UJBd'));
            $('#slowDDos').html(ret.slowDDos);
            $('#reflectDDos_ul').html(buildUL(ret.reflectDDos, ret.clearTotal, 'redfence___2UJBd', 'predfence___2UJBd'));
            $('#reflectDDos').html(ret.reflectDDos);
            
            var gauge1_ec = echarts.init(document.getElementById('gauge1'));
            gauge1_ec.setOption(ec_option(ret.netDDos, ret.clearTotal));
            var gauge2_ec = echarts.init(document.getElementById('gauge2'));
            gauge2_ec.setOption(ec_option(ret.serviceDDos, ret.clearTotal, '应用层攻击'));
            var gauge3_ec = echarts.init(document.getElementById('gauge3'));
            gauge3_ec.setOption(ec_option(ret.slowDDos, ret.clearTotal, '慢速攻击'));
            var gauge4_ec = echarts.init(document.getElementById('gauge4'));
            gauge4_ec.setOption(ec_option(ret.reflectDDos, ret.clearTotal, '反射攻击'));
        }();
        
        var buildLeft1 = function(arr){
            var content = '';
            for(var i in arr){
                content += '<div class="one___3CPQL"><div class="bar___2Hv0t"></div><div class="icon___15vmP">'+arr[i].value+'</div>'+arr[i].name+'</div>';
            }
            $('#type').html(content);
        };
        
        var buildLeft2 = function(arr){
            if(arr){
                if(arr.length < 2){
                    $('#source1 div.name___1pgQK').html(arr[0].name);
                    $('#source1 div.value___2ejsw').html(arr[0].value);
                    $('#source2').hide();
                    $('#source3').hide();
                }
                else if(arr.length < 3){
                    $('#source1 div.name___1pgQK').html(arr[0].name);
                    $('#source1 div.value___2ejsw').html(arr[0].value);
                    $('#source2 div.name___1pgQK').html(arr[1].name);
                    $('#source2 div.value___2ejsw').html(arr[1].value);
                    $('#source2w').width((40+parseInt(60*arr[1].value/arr[0].value)) + '%');
                    $('#source3').hide();
                }
                else{
                    $('#source1 div.name___1pgQK').html(arr[0].name);
                    $('#source1 div.value___2ejsw').html(arr[0].value);
                    $('#source2 div.name___1pgQK').html(arr[1].name);
                    $('#source2 div.value___2ejsw').html(arr[1].value);
                    $('#source2w').width((40+parseInt(60*arr[1].value/arr[0].value)) + '%');
                    $('#source3 div.name___1pgQK').html(arr[2].name);
                    $('#source3 div.value___2ejsw').html(arr[2].value);
                    $('#source3w').width((40+parseInt(60*arr[2].value/arr[0].value)) + '%');
                }
            }else{
                $('div.leftStrip___1p65Y').hide();
            }
        }
        
        var buildLeft3 = function(arr){
            if(arr){
                if(arr.length < 2){
                    $('#top1 p.left3p1').html(arr[0].ip);
                    $('#top1 p.left3p2').html(arr[0].area);
                    $('#top1 div.value___2ejsw').html(arr[0].value);
                    $('#top2').hide();
                    $('#top3').hide();
                    $('#top4').hide();
                    $('#top5').hide();
                }
                else if(arr.length < 3){
                    $('#top1 p.left3p1').html(arr[0].ip);
                    $('#top1 p.left3p2').html(arr[0].area);
                    $('#top1 div.value___2ejsw').html(arr[0].value);
                    $('#top2 p.left3p1').html(arr[1].ip);
                    $('#top2 p.left3p2').html(arr[1].area);
                    $('#top2 div.value___2ejsw').html(arr[1].value);
                    $('#top2w').width((30+parseInt(66*arr[1].value/arr[0].value)) + '%');
                    $('#top3').hide();
                    $('#top4').hide();
                    $('#top5').hide();
                }
                else if(arr.length < 4){
                    $('#top1 p.left3p1').html(arr[0].ip);
                    $('#top1 p.left3p2').html(arr[0].area);
                    $('#top1 div.value___2ejsw').html(arr[0].value);
                    $('#top2 p.left3p1').html(arr[1].ip);
                    $('#top2 p.left3p2').html(arr[1].area);
                    $('#top2 div.value___2ejsw').html(arr[1].value);
                    $('#top2w').width((30+parseInt(66*arr[1].value/arr[0].value)) + '%');
                    $('#top3 p.left3p1').html(arr[2].ip);
                    $('#top3 p.left3p2').html(arr[2].area);
                    $('#top3 div.value___2ejsw').html(arr[2].value);
                    $('#top3w').width((30+parseInt(66*arr[2].value/arr[0].value)) + '%');
                    $('#top4').hide();
                    $('#top5').hide();
                }
                else if(arr.length < 5){
                    $('#top1 p.left3p1').html(arr[0].ip);
                    $('#top1 p.left3p2').html(arr[0].area);
                    $('#top1 div.value___2ejsw').html(arr[0].value);
                    $('#top2 p.left3p1').html(arr[1].ip);
                    $('#top2 p.left3p2').html(arr[1].area);
                    $('#top2 div.value___2ejsw').html(arr[1].value);
                    $('#top2w').width((30+parseInt(66*arr[1].value/arr[0].value)) + '%');
                    $('#top3 p.left3p1').html(arr[2].ip);
                    $('#top3 p.left3p2').html(arr[2].area);
                    $('#top3 div.value___2ejsw').html(arr[2].value);
                    $('#top3w').width((30+parseInt(66*arr[2].value/arr[0].value)) + '%');
                    $('#top4 p.left3p1').html(arr[3].ip);
                    $('#top4 p.left3p2').html(arr[3].area);
                    $('#top4 div.value___2ejsw').html(arr[3].value);
                    $('#top4w').width((30+parseInt(66*arr[3].value/arr[0].value)) + '%');
                    $('#top5').hide();
                }else{
                    $('#top1 p.left3p1').html(arr[0].ip);
                    $('#top1 p.left3p2').html(arr[0].area);
                    $('#top1 div.value___2ejsw').html(arr[0].value);
                    $('#top2 p.left3p1').html(arr[1].ip);
                    $('#top2 p.left3p2').html(arr[1].area);
                    $('#top2 div.value___2ejsw').html(arr[1].value);
                    $('#top2w').width((30+parseInt(66*arr[1].value/arr[0].value)) + '%');
                    $('#top3 p.left3p1').html(arr[2].ip);
                    $('#top3 p.left3p2').html(arr[2].area);
                    $('#top3 div.value___2ejsw').html(arr[2].value);
                    $('#top3w').width((30+parseInt(66*arr[2].value/arr[0].value)) + '%');
                    $('#top4 p.left3p1').html(arr[3].ip);
                    $('#top4 p.left3p2').html(arr[3].area);
                    $('#top4 div.value___2ejsw').html(arr[3].value);
                    $('#top4w').width((30+parseInt(66*arr[3].value/arr[0].value)) + '%');
                    $('#top5 p.left3p1').html(arr[4].ip);
                    $('#top5 p.left3p2').html(arr[4].area);
                    $('#top5 div.value___2ejsw').html(arr[4].value);
                    $('#top5w').width((30+parseInt(66*arr[4].value/arr[0].value)) + '%');
                }
            }else{
                $('div.leftBar___3vSY1').hide();
            }
        }
        
        var fn_left = function(){
            var ret = datasource.ddos.left;

            if(ret.type){
                buildLeft1(ret.type.allrisk);
                $('.selectArea___q979J span').click(function(){
                    var myclick = $(this);
                    var dv = myclick.attr('data-value');
                    if(!myclick.hasClass('active___3A89X')){
                        buildLeft1(ret.type[dv]);
                        $('.selectArea___q979J span').each(function(){
                            $(this).removeClass('active___3A89X');
                        });
                        myclick.addClass('active___3A89X');
                    }
                });
            }
            buildLeft2(ret.source);
            buildLeft3(ret.top10);
        }();
        
        //center line
        //right line
        var ec_option5 = function(xAxis, visits, attacks) {
            var option = {
              tooltip : {
                  trigger: 'axis'
              },
              grid: {
                  left: 0,
                  right: 0,
                  bottom: 0,
                  top: 60
              },
              xAxis : [
                  {
                      type : 'category',
                      show: true,
                      type: 'category',
                      boundaryGap: false,
                      axisLine: {
                        show: true,
                        lineStyle: {
                          color: '#fff',
                          width: 1,
                        }
                      },
                      splitLine: {
                        show: false,
                      },
                      data : xAxis
                  }
              ],
              yAxis : [
                {
                  //max: 50,
                  width: '',
                  show: false,
                  type: 'value',
                  axisLine: {
                    show: true,
                    lineStyle: {
                      color: '#fff',
                      width: 1,
                    }
                  },
                  splitLine: {
                    show: false,
                  },
                  axisLabel: {
                    textStyle: {
                      color: '#A9B0B3',
                    }
                  }
                }
              ],
              series: [
                {
                  name: '访问流量',
                  type: 'line',
                  symbol: 'none',
                  smooth: true,
                  itemStyle: {
                    normal: {
                      areaStyle: {
                        color: 'rgba(46, 123, 256, 0.4)',
                      },
                      lineStyle: {
                        color: '#2e7bff',
                        width: 1
                      }
                    }
                  },
                  data: visits
                },
                {
                  name: '攻击流量',
                  type: 'line',
                  symbol: 'none',
                  smooth: true,
                  itemStyle: {
                    normal: {
                      areaStyle: {
                        color: 'rgba(255, 255, 0, 0.4)',
                      },
                      lineStyle: {
                        color: '#ffff00',
                        width: 1
                      }
                    }
                  },
                  data: attacks
                }
              ]
            };
            return option;
        };
        var ecc = echarts.init(document.getElementById('ecc'));
        
        var right_interval = null;
        
        var fn_right12 = function(){
            var ret = datasource.ddos.right12;

            var index = 0;
            var center_time = [];
            var center_visit = [];
            var center_attack = [];
            right_interval = self.setInterval(function(){
                if(ret.right1.length > index) {
                    //update center chart
                    $('.cluseterc_m_span').html('TIME ' + ret.right1[index].time);
                    //if(index%2==0) $('.clusterspl').css('border', '2px dashed #2e7bff');
                    //else $('.clusterspl').css('border', '2px dashed #ffff00');
                    if(index > 10){
                        center_time.pop();
                        center_time.unshift(ret.right1[index].time);
                        center_visit.pop();
                        center_visit.unshift(ret.right1[index].visit);
                        center_attack.pop();
                        center_attack.unshift(ret.right1[index].attack);
                    }else{
                        center_time.unshift(ret.right1[index].time);
                        center_visit.unshift(ret.right1[index].visit);
                        center_attack.unshift(ret.right1[index].attack);
                    }
                    ecc.setOption(ec_option5(center_time, center_visit, center_attack));
                    index ++;
                }
                else {
                    index = 0;
                    center_time = [];
                    center_visit = [];
                    center_attack = [];
                    //window.clearInterval(right_interval);
                    //right_interval = null;
                }
            }, 1000);
        }();
        var ec3 = echarts.init(document.getElementById('ec3'));
        var ec4 = echarts.init(document.getElementById('ec4'));
        var ec5 = echarts.init(document.getElementById('ec5'));
        var ec6 = echarts.init(document.getElementById('ec6'));
        var bottom_reload = function(ip){
            if(ip){
                $('.current___1-ZzK').html('当前IP：' + ip);
                $('.btcurrent___1-ZzK').html('当前IP：' + ip);
            }
            //bottom line
            //right line
            var ec_option3 = function(name, color, xAxis, yAxis) {
                var option = {
                  tooltip : {
                      trigger: 'axis',
                  },
                  grid: {
                      left: 0,
                      right: 0,
                      bottom: 0,
                      top: 0
                  },
                  xAxis : [
                      {
                          type : 'category',
                          boundaryGap : false,
                          show: false,
                          type: 'category',
                          boundaryGap: false,
                          axisLine: {
                            show: true,
                            lineStyle: {
                              color: '#fff',
                              width: 1,
                            }
                          },
                          splitLine: {
                            show: false,
                          },
                          axisLabel: {
                            textStyle: {
                              color: '#A9B0B3',
                            }
                          },
                          data : xAxis || []
                      }
                  ],
                  yAxis : [
                    {
                      width: '',
                      show: false,
                      type: 'value',
                      axisLine: {
                        show: true,
                        lineStyle: {
                          color: '#fff',
                          width: 1,
                        }
                      },
                      splitLine: {
                        show: false,
                      },
                      axisLabel: {
                        textStyle: {
                          color: '#A9B0B3',
                        }
                      },
                    },
                  ],
                  series: [
                    {
                      name: name || '访问流量',
                      type: 'line',
                      symbol: 'none',
                      smooth: true,
                      itemStyle: {
                        normal: {
                          areaStyle: {
                            color: color || 'rgba(46, 123, 256, 0.4)',
                          },
                          lineStyle: {
                            color: color || '#2e7bff',
                            width: 1
                          }
                        }
                      },
                      data: yAxis || []
                    }/*,
                    {
                      name: '攻击流量',
                      type: 'line',
                      symbol: 'none',
                      smooth: true,
                      itemStyle: {
                        normal: {
                          areaStyle: {
                            color: 'rgba(255, 255, 0, 0.4)',
                          },
                          lineStyle: {
                            color: '#ffff00',
                            width: 1
                          }
                        }
                      },
                      data: visits
                    }*/
                  ]
                };
                return option;
            };
            ec3.showLoading();
            ec4.showLoading();
            
            var fn_bottom1 = function(){
                var ret = datasource.ddos.bottom1;

                var bottom1_time = [];
                var bottom1_visit = [];
                var bottom1_attack = [];
                for(var i in ret.data){
                    bottom1_time.push(ret.data[i].time);
                    bottom1_visit.push(ret.data[i].visit);
                    bottom1_attack.push(ret.data[i].attack);
                }
                 ec3.setOption(ec_option3('访问流量', 'rgba(46, 123, 256, 0.4)', bottom1_time, bottom1_visit));
                 ec3.hideLoading();
                 ec4.setOption(ec_option3('攻击流量', 'rgba(255, 255, 0, 0.4)', bottom1_time, bottom1_attack));
                 ec4.hideLoading();
                 $('.current___1-ZzK').html('当前IP：' + (ret.ip == '-'? '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' : ret.ip ));
            }();
            //ec3.setOption(ec_option3('访问流量', 'rgba(46, 123, 256, 0.4)', ['2014-14-22', '2014-14-22', '2014-14-22', '2014-14-22','2014-14-22', '2014-14-22', '2014-14-22', '2014-14-22','2014-14-22', '2014-14-22', '2014-14-22', '2014-14-22'], [100,200,300,150,100,66,300,210,150,260,380,320]));
            //ec4.setOption(ec_option3('攻击流量', 'rgba(255, 255, 0, 0.4)', ['2014-14-22', '2014-14-22', '2014-14-22', '2014-14-22','2014-14-22', '2014-14-22', '2014-14-22', '2014-14-22','2014-14-22', '2014-14-22', '2014-14-22', '2014-14-22'], [12,35,121,65,123,12,21,11,54,66,99,12]));
            
            //bottom sankey
            var ec_option4 = function(nodes, links, right, left){
                var option = {
                  title: {
                    text: ''
                  },
                  tooltip: {
                    trigger: 'item',
                    triggerOn: 'mousemove'
                  },
                  series: [{
                    type: 'sankey',
                    layout: 'none',
                    right: right||'14%',
                    left: left||'5%',
                    data: nodes,
                    links: links,
                    itemStyle: {
                      normal: {
                        borderWidth: 1,
                        borderColor: '#1d4fa6',
                        color: '#1d4fa6',
                        borderType: 'solid',
                        opacity: 1
                        
                      }
                    },
                    label:{
                          normal:{
                              show: true,
                              position: 'insideLeft',
                              textStyle:{
                                  color: '#fff'
                              }
                          }
                      },
                    lineStyle: {
                      normal: {
                        curveness: 0.5,
                        color: '#1d4fa6',
                        opacity: 1
                      }
                    }
                  }]
                };
                return option;
            };
            ec5.showLoading();
            ec6.showLoading();

            var fn_bottom2 = function() {
                var ret = datasource.ddos.bottom2;
                 ec5.setOption(ec_option4(ret.nodes, ret.links_in));
                 ec5.hideLoading();
                 ec6.setOption(ec_option4(ret.nodes, ret.links_out, '16%', '0%'));
                 ec6.hideLoading();
                 $('.btcurrent___1-ZzK').html('当前IP：' + (ret.ip == '-'? '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' : ret.ip ));
            }();
            //ec5.setOption(ec_option4([{ name: '12.34.56.234' }, { name: 'TCP 443' }, { name: 'TCP 80' }, { name: '34.43.23.98' }, { name: 'TCP 23942' }], [{ source: '12.34.56.234', target: 'TCP 443', value: 5 }, { source: '12.34.56.234', target: 'TCP 80', value: 12 }, { source: '34.43.23.98', target: 'TCP 23942', value: 14 }]));
            //ec6.setOption(ec_option4([{ name: '12.34.56.234' }, { name: 'TCP 443' }, { name: 'TCP 80' }, { name: '34.43.23.98' }, { name: 'TCP 23942' }], [{ source: 'TCP 443', target: '12.34.56.234', value: 8 }, { source: 'TCP 80', target: '12.34.56.234', value: 12 }, { source: 'TCP 23942', target: '34.43.23.98', value: 12 }], '16%', '0%'));
            
        };
        
        bottom_reload();
        //addition js here
        var ec_option1 = function(){
            var option = {
                //color:['#3A0E21', '#322224', '#062349', '#394358'],
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                series: [
                    {
                        name:'僵木蠕事件',
                        type:'pie',
                        selectedMode: 'single',
                        center: ['50%', '50%'],
                        radius: [0, '70%'],
            
                        label: {
                            normal: {
                                position: 'inner'
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data:[
                            {value:335, name:'严重', selected:true},
                            {value:679, name:'高风险'},
                            {value:1548, name:'中风险'},
                            {value:548, name:'低风险'}
                        ]
                    }
                ]
            };
            return option;
        };
        var ec1 = echarts.init(document.getElementById('ec1'));
        ec1.setOption(ec_option1());
        
        var ec_option2 = function(){
            var option = {
                tooltip : {
                    trigger: 'axis',
                    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                legend: {
                    data:['TCP','UDP','SYNC'],
                    textStyle:{
                        color: '#ffffff'
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '20%',
                    top: '3%',
                    containLabel: true
                },
                xAxis : [
                    {
                        type : 'category',
                        axisLabel:{
                            interval: 0,
                            rotate: 30,
                            textStyle:{
                                color: '#ffffff'
                            }
                        },
                        data : ['1.12.133.13','59.108.112.33','172.16.192.11','133.143.11.13','10.1.11.13','1.12.133.13','59.108.112.33','172.16.192.11','133.143.11.13','10.1.11.13']
                    }
                ],
                yAxis : [
                    {
                        type : 'value',
                        axisLabel:{
                            textStyle:{
                                color: '#ffffff'
                            }
                        },
                        splitLine: {
                            show: false
                        }
                    }
                ],
                series : [
                    {
                        name:'TCP',
                        type:'bar',
                        barWidth : 15,
                        stack: 'worm',
                        data:[1,2,3,4,5,6,7,8,9,11]
                    },
                    {
                        name:'UDP',
                        type:'bar',
                        stack: 'worm',
                        data:[1,2,3,4,5,6,7,8,9,11]
                    },
                    {
                        name:'SYNC',
                        type:'bar',
                        stack: 'worm',
                        data:[1,2,3,4,5,6,7,8,9,11]
                    }
                ]
            };
            return option;
        };
        var ec2 = echarts.init(document.getElementById('ec2'));
        ec2.setOption(ec_option2());
        
        var right3 = $('#right3');
        var r3_current = 0;
        var right3_interval = self.setInterval(function(){
            r3_current++;
            if(r3_current>=12) r3_current = 0;
            right3.animate({top: (0-r3_current)*28});
        },2000);
        
        $('#right3 li').click(function(){
            $('.modal').show();
            $('.mask').show();
            console.log($(this));
        });
        $('i.close, .mask').click(function(){
            $('.modal').hide();
            $('.mask').hide();
        });
        //end addtion js
        
        var buildD3 = function(clientIps, serverIps){
            var width = 600;
            var height = 570;
            
            var scluster = d3.layout.cluster().size([-270, width / 2 - 120]).separation(function (a, b) {
              return (a.parent == b.parent ? 1 : 2) / a.depth;
            });
            var sdiagonal = d3.svg.diagonal.radial().projection(function (d) {
              var radius = d.y;
              var angle = d.x / 180 * Math.PI;
    
              return [radius, angle + 45];
            });
            
            var leftSvg = d3.select("#cluseterL").append("svg").attr("width", width).attr("height", height).append("g").attr("transform", "rotate(-14)translate(220, 330)");
            var snodes = scluster.nodes(clientIps);
            var slinks = scluster.links(snodes);
            var slink = leftSvg.selectAll(".link").data(slinks).enter().append("path").attr('fill', 'none').attr('stroke', '#667a8c').attr('stroke-width', '1px').attr("d", sdiagonal);
            var snode = leftSvg.selectAll(".node").data(snodes).enter().append("g").attr('stroke-width', 1).attr("transform", function (d) {
              return "rotate(" + (d.x + 328) + ")translate(" + d.y + ")";
            });
            snode.append("circle").attr("r", 2.5).attr('fill', '#667a8c').attr('transform', function (d) {
              return 'rotate(' + d.x + ')';
            });
            snode.append("text").attr('fill', '#eee').attr('transform', function (d) {
              //return 'rotate(180)translate(-85)';
              return 'translate(10)';
            }).text(function (d) {
              return d.name;
            });
            
            var cluster = d3.layout.cluster().size([90, width / 2 - 100]).separation(function (a, b) {
              return (a.parent == b.parent ? 1 : 2) / a.depth;
            });
            var diagonal = d3.svg.diagonal.radial().projection(function (d) {
              var radius = d.y;
              var angle = d.x / 180 * Math.PI;
    
              return [radius, angle + 45];
            });
            var svg = d3.select("#cluseterR").append("svg").attr("width", width).attr("height", height).append("g").attr("transform", "rotate(-14)translate(180, 320)");
            var nodes = cluster.nodes(serverIps);
            var links = cluster.links(nodes);
            var link = svg.selectAll(".link").data(links).enter().append("path").attr('fill', 'none').attr('stroke', '#667a8c').attr('stroke-width', '1px').attr("d", diagonal);
            var node = svg.selectAll(".node").data(nodes).enter().append("g").attr("class", "node").attr("transform", function (d) {
              return "rotate(" + (d.x - 32) + ")translate(" + d.y + ")";
            });
            node.append("circle").attr("r", 2.5).attr('fill', '#667a8c').attr('transform', function (d) {
              return 'rotate(' + d.x + ')';
            });
            node.append("text").attr({'fill': '#eee', 'cursor': 'pointer'}).attr('transform', function (d) {
              return 'translate(10)';
            }).text(function (d) {
              return d.name;
            });
            var len_serverIps = serverIps.children.length;
            var len_clientIps = clientIps.children.length;
            var d3_index = 0;
            var d3_interval = self.setInterval(function(){
                var random1 = Math.ceil(Math.random()*len_serverIps);
                var random2 = Math.ceil(Math.random()*len_serverIps);
                var random11 = Math.ceil(Math.random()*len_serverIps);
                var random22 = Math.ceil(Math.random()*len_serverIps);
                svg.selectAll('path').attr('stroke', '#667a8c').attr('stroke-width', '1px');
                svg.selectAll('path').each(function(d,i){
                    if(right_interval){
                        if(i == random1){
                            d3.select(this).attr('stroke', '#2e7bff').attr('stroke-width', '3px');
                        }
                        if(i == random2){
                            d3.select(this).attr('stroke', '#ffff00').attr('stroke-width', '3px');
                        }
                        if(i == random11 && d3_index%9 == 0){
                            d3.select(this).attr('stroke', '#c23531').attr('stroke-width', '3px');
                        }
                        if(i == random22 && d3_index%5 == 0){
                            d3.select(this).attr('stroke', '#d48265').attr('stroke-width', '3px');
                        }
                    }
                    
                });
                
                var random3 = Math.ceil(Math.random()*len_clientIps);
                var random4 = Math.ceil(Math.random()*len_clientIps);
                var random5 = Math.ceil(Math.random()*len_clientIps);
                var random6 = Math.ceil(Math.random()*len_clientIps);
                leftSvg.selectAll('path').attr('stroke', '#667a8c').attr('stroke-width', '1px');
                leftSvg.selectAll('path').each(function(d,i){
                    if(right_interval){
                        if(i == random3){
                            d3.select(this).attr('stroke', '#2e7bff').attr('stroke-width', '3px');
                        }
                        if(i == random5){
                            d3.select(this).attr('stroke', '#ffff00').attr('stroke-width', '3px');
                        }
                        if(i == random4 && d3_index%9 == 0){
                            d3.select(this).attr('stroke', '#c23531').attr('stroke-width', '3px');
                        }
                        if(i == random6 && d3_index%5 == 0){
                            d3.select(this).attr('stroke', '#d48265').attr('stroke-width', '3px');
                        }
                    }
                    
                });
                d3_index ++;
            }, 1000);
            svg.selectAll("g").on("click", function(d,i){
                bottom_reload(d.name);
            });
        };
        /*
        var clientIps = {
          'name': '',
          'children': [{ 'name': '2.25.269.35' }, { 'name': '2.25.269.35' }, { 'name': '2.25.269.35' }, { 'name': '2.25.269.35' }, { 'name': '2.25.269.35' }, { 'name': '2.25.269.35' }, { 'name': '2.25.269.35' }, { 'name': '2.25.269.35' }, { 'name': '2.25.269.35' }, { 'name': '2.25.269.35' }, { 'name': '2.25.269.35' }, { 'name': '2.25.269.35' }, { 'name': '2.25.269.35' }, { 'name': '2.25.269.35' }, { 'name': '2.25.269.35' }, { 'name': '2.25.269.35' }, { 'name': '2.25.269.35' }, { 'name': '2.25.269.35' }, { 'name': '2.25.269.35' }, { 'name': '2.25.269.35' }, { 'name': '2.25.269.35' }, { 'name': '2.25.269.35' }, { 'name': '2.25.269.35' }, { 'name': '2.25.269.35' }, { 'name': '2.25.269.35' }, { 'name': '2.25.269.35' }, { 'name': '2.25.269.35' }, { 'name': '2.25.269.35' }, { 'name': '2.25.269.35' }, { 'name': '2.25.269.35' }, { 'name': '2.25.269.35' }, { 'name': '2.25.269.35' }, { 'name': '2.25.269.35' }, { 'name': '2.25.269.35' }, { 'name': '2.25.269.35' }, { 'name': '2.25.269.35' }, { 'name': '2.25.269.35' }, { 'name': '2.25.269.35' }, { 'name': '2.25.269.35' }, { 'name': '2.25.269.35' }, { 'name': '2.25.269.35' }, { 'name': '2.25.269.35' }, { 'name': '2.25.269.35' }, { 'name': '2.25.269.35' }, { 'name': '2.25.269.35' }, { 'name': '2.25.269.35' }, { 'name': '2.25.269.35' }, { 'name': '2.25.269.35' }]
        };
        var serverIps = {
          'name': '',
          'children': [{ 'name': '12.25.269.35' }, { 'name': '12.25.269.3x' }, { 'name': '12.25.269.35' }, { 'name': '2.25.269.35' }, { 'name': '2.25.269.35' }, { 'name': '2.25.269.35' }, { 'name': '2.25.269.35' }, { 'name': '2.25.269.35' }, { 'name': '2.25.269.35' }, { 'name': '2.25.269.35' }, { 'name': '2.25.269.35' }, { 'name': '2.25.269.35' }, { 'name': '2.25.269.35' }, { 'name': '2.25.269.35' }, { 'name': '2.25.269.35' }, { 'name': '2.25.269.35' }, { 'name': '2.25.269.35' }, { 'name': '2.25.269.35' }, { 'name': '2.25.269.35' }, { 'name': '2.25.269.35' }, { 'name': '2.25.269.35' }, { 'name': '2.25.269.35' }, { 'name': '2.25.269.35' }, { 'name': '2.25.269.35' }]
        };
        */


        var fn_center1 = function(){

            var ret = datasource.ddos.center1;
            buildD3(ret.clientIps, ret.serverIps);
        }();
        
        //ecc.setOption(ec_option5(['00:33:30', '00:34:30', '00:43:30', '00:53:30','00:33:30', '00:34:30', '00:43:30', '00:53:30','00:33:30', '00:34:30', '00:43:30', '00:53:30','00:33:30', '00:34:30', '00:43:30', '00:53:30'], [88,54,21,62,88,54,21,62,88,54,21,62,88,54,21,62], [12,23,66,12,12,23,66,12,12,23,66,12,12,23,66,12]));
        

        var ecm;
        var map_option;
        var fn_map = function(){

            var BJData = [
                [{
                    name: '上海',
                    value: 100
                }, {
                    name: '天津'
                }],
                [{
                    name: '广州',
                    value: 70
                }, {
                    name: '天津'
                }],
                [{
                    name: '哈尔滨',
                    value: 30
                }, {
                    name: '天津'
                }],
                [{
                    name: '青岛',
                    value: 50
                }, {
                    name: '天津'
                }],
                [{
                    name: '南昌',
                    value: 20
                }, {
                    name: '天津'
                }],
                [{
                    name: '银川',
                    value: 10
                }, {
                    name: '天津'
                }],
                [{
                    name: '拉萨',
                    value: 80
                }, {
                    name: '天津'
                }],
                [{
                    name: '西安',
                    value: 55
                }, {
                    name: '天津'
                }],
                [{
                    name: '乌鲁木齐',
                    value: 90
                }, {
                    name: '天津'
                }]
            ];
            var convertData = function(data) {
                var res = [];
                for (var i = 0; i < data.length; i++) {
                    var dataItem = data[i];
                    var fromCoord = geoFactory[dataItem[0].name];
                    var toCoord = geoFactory[dataItem[1].name];
                    if (fromCoord && toCoord) {
                        res.push([{
                            coord: fromCoord,
                            value: dataItem[0].value
                        }, {
                            coord: toCoord,
                        }]);
                    }
                }
                return res;
            };

            var color = ['#a6c84c', '#ffa022', '#46bee9'];
            var series = [];
            [
                ['天津', BJData]
            ].forEach(function(item, i) {
                series.push(

                    {
                        type: 'lines',
                        zlevel: 1,
                        effect: {
                            show: true,
                            period: 4,
                            trailLength: 0.2,
                            symbol: 'arrow',
                            symbolSize: 5,
                        },
                        lineStyle: {
                            normal: {
                                width: 1,
                                opacity: 0,
                                curveness: 0.2
                            }
                        },

                        data: convertData(item[1])
                    }, {
                        type: 'effectScatter',
                        coordinateSystem: 'geo',
                        zlevel: 2,
                        rippleEffect: {
                            period: 4,
                            brushType: 'stroke',
                            scale: 4
                        },
                        label: {
                            normal: {
                                show: true,
                                position: 'right',
                                offset: [5, 0],
                                formatter: '{b}'
                            },
                            emphasis: {
                                show: true
                            }
                        },
                        symbol: 'circle',
                        symbolSize: function(val) {
                            return 4 + val[2] / 10;
                        },
                        itemStyle: {
                            normal: {
                                show: false,
                                color: '#f00'
                            }
                        },
                        data: item[1].map(function(dataItem) {
                            return {
                                name: dataItem[0].name,
                                value: geoFactory[dataItem[0].name].concat([dataItem[0].value])
                            };
                        }),
                    },
                    //被攻击点
                    {
                        type: 'scatter',
                        coordinateSystem: 'geo',
                        zlevel: 2,
                        rippleEffect: {
                            period: 4,
                            brushType: 'stroke',
                            scale: 4
                        },
                        label: {
                            normal: {
                                show: true,
                                position: 'right',
                                //                      offset:[5, 0],

                                color: '#00ffff',
                                formatter: '{b}',
                                textStyle: {
                                    color: "#00ffff"
                                }
                            },
                            emphasis: {
                                show: true
                            }
                        },
                        symbol: 'pin',
                        symbolSize: 30,
                        itemStyle: {
                            normal: {
                                show: true,
                                color: '#9966cc'
                            }
                        },
                        data: [{
                            name: item[0],
                            value: geoFactory[item[0]].concat([100]),
                        }],
                    }
                );
            });

            map_option = {
                // backgroundColor: '#404a59',

                visualMap: {
                    min: 0,
                    max: 100,
                    calculable: true,
                    color: ['#ff3333', 'orange', 'yellow', 'lime', 'aqua'],
                    textStyle: {
                        color: '#fff'
                    },
                    show: false
                },
                geo: {
                    map: 'china',
                    label: {
                        emphasis: {
                            show: false
                        }
                    },
                    roam: true,
                    layoutCenter: ['50%', '53%'],
                    layoutSize: "140%",
                    itemStyle: {
                        normal: {
                            color: 'rgba(51, 69, 89, .5)',
                            borderColor: 'rgba(100,149,237,1)'
                        },
                        emphasis: {
                            color: 'rgba(37, 43, 61, .5)'
                        }
                    }
                },

                series: series
            };

            ecm = echarts.init(document.getElementById('ecm'));
              
            ecm.on('dbclick', function (params) {
                console.log(params);
            });
              
            ecm.setOption(map_option);
        
        }();

        
        //click btn
        $('.clusetertab a').click(function(){
            var id = $(this).attr('id');
            if(id == 'map_a'){
                ecm.clear();
                map_option.geo.map = 'china';

                ecm.setOption(map_option, true);
                if($('#map_a img').attr('src').indexOf('d3.png') != -1){
                    $('#map_a').attr('title', '返回至世界地图');
                }else{
                    $('#map_a').attr('title', '切换至地图模式');
                    $('#map_a img').attr('src', 'img/map_ac.png');
                    $('#d3_a img').attr('src', 'img/d3.png');
                    $('#ecm').closest('div.this___qxQh9').css('visibility', 'visible');
                    $('#cluseterL').closest('div.this___qxQh9').css('visibility', 'hidden');
                    $('.md3c').css('visibility', 'hidden');
                }
            }
            else if(id == 'd3_a'){
                if($('#d3_a img').attr('src').indexOf('d3.png') != -1){
                    $('#d3_a img').attr('src', 'img/d3_ac.png');
                    $('#map_a img').attr('src', 'img/map.png');
                    $('#map_a').attr('title', '切换至地图模式');
                    ecm.clear();
                    $('#ecm').closest('div.this___qxQh9').css('visibility', 'hidden');
                    $('#cluseterL').closest('div.this___qxQh9').css('visibility', 'visible');
                    $('.md3c').css('visibility', 'visible');
                }
            }
            
        });
        
    };
    return {
        init : function(param) {
            handleActive(param);
        }
    };
}();
