<template>
    <div id="home" :style="{'background-color':color}">

        <div id="div1">
            <div class="img">
                <img :src="img" alt="">
            </div>
            <el-divider><i class="el-icon-user"></i></el-divider>
            <p class="address" @click="getPosition">登录地点： <span>{{(province+city)||'请选择所在区域'}}</span></p>
            <br>
            <p>当前时间： <span>{{date}}</span></p>
        </div>
        <div id="div2"></div>
        <div id="div3"></div>
        <div id="div4"></div>
    </div>
</template>

<script>
    export default {
        name: 'BackstageHome',

        data() {
            return {
                date: "",
                chartPie: null,
                chartLine: null,
                img: sessionStorage.getItem("img"),
                hint: sessionStorage.getItem("hint"),
                longitude: 0,//经度
                latitude: 0,//维度
                city: '',//城市
                province: '',//省
                time: "",
                color: "",

            };
        },

        mounted() {
            this.drawChart()
            this.drawPieChart()
            this.drawLineChart()
            this.time = setInterval(() => {
                this.date = new Date().toLocaleTimeString()
                this.color = this.$store.state.colors
            }, 1000);
        },

        methods: {

            //获取定位
            getLocation() {
                var geolocation = new window.qq.maps.Geolocation("PUHBZ-IW2KK-BTQJ7-AQUZT-JKKBT-EABVC", "myapp");
                geolocation.getLocation(this.showPosition, this.errorPosition);
            },
            showPosition(position) {
                // console.log(position);
                this.longitude = position.lng;
                this.latitude = position.lat;
                this.city = position.city;
                this.province = position.province;
            },
            errorPosition() {
                console.log('定位失败');
                //继续定位
                this.getLocation();
            },
            getPosition() {//点击一次获取一次
                this.getLocation()
            },


            drawChart() {
                // 基于准备好的dom，初始化echarts实例
                var myChart = this.$echarts.init(document.getElementById('div4'));
                myChart.setOption({
                    title: {
                        text: '添加学生所在地'
                    },
                    tooltip: {},
                    xAxis: {
                        data: ['北京', '安徽', '上海', '江西', '湖南', '甘肃']
                    },
                    yAxis: {},
                    series: [
                        {
                            name: '人数',
                            type: 'bar',
                            data: [5, 20, 36, 10, 10, 20]
                        }
                    ]
                });

                window.onresize = function () {
                    myChart.resize()
                }

            },



            drawPieChart() {
                let mytextStyle = {
                    color: "#333",
                    fontSize: 18,
                };
                let mylabel = {
                    show: true,
                    position: "right",
                    offset: [30, 40],
                    formatter: '{b} : {c} ({d}%)',
                    textStyle: mytextStyle
                };
                this.chartPie = this.$echarts.init(document.getElementById('div2'), 'macarons');
                this.chartPie.setOption({
                    title: {
                        text: '学生所在地',
                        // subtext: '纯属虚构',
                        x: 'center'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)",
                    },
                    legend: {
                        data: ['江西', '湖南', '安徽', '浙江', '天津'],
                        left: "center",
                        top: "bottom",
                        orient: "horizontal",
                    },
                    series: [
                        {
                            name: '访问来源',
                            type: 'pie',
                            radius: ['50%', '70%'],
                            center: ['50%', '50%'],
                            data: [
                                { value: 335, name: '江西' },
                                { value: 310, name: '湖南' },
                                { value: 234, name: '安徽' },
                                { value: 135, name: '浙江' },
                                { value: 1548, name: '天津' }
                            ],
                            animationEasing: 'cubicInOut',
                            animationDuration: 2600,
                            label: {
                                emphasis: mylabel
                            }
                        }
                    ]
                });
            },



            drawLineChart() {
                this.chartLine = this.$echarts.init(document.getElementById("div3"), 'shine');// 基于准备好的dom，初始化echarts实例
                let option = {
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: ['江西', '安徽', '上海', '湖南', '北京']
                    },
                    calculable: true,
                    xAxis: [
                        {
                            type: 'category',
                            boundaryGap: false,
                            axisTick: {
                                show: false
                            },
                            data: ['2015年', '2016年', '2017年', '2018年', '2019年', '2020年', '2021年']
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            axisTick: {
                                show: false
                            },
                            name: '（人）'
                        }
                    ],
                    series: [
                        {
                            name: '江西',
                            type: 'line',
                            stack: '总量',
                            data: [120, 132, 101, 134, 90, 230, 210]
                        },
                        {
                            name: '安徽',
                            type: 'line',
                            stack: '总量',
                            data: [220, 182, 191, 234, 290, 330, 310]
                        },
                        {
                            name: '上海',
                            type: 'line',
                            stack: '总量',
                            data: [150, 232, 201, 154, 190, 330, 410]
                        },
                        {
                            name: '湖南',
                            type: 'line',
                            stack: '总量',
                            data: [320, 332, 301, 334, 390, 330, 320]
                        },
                        {
                            name: '北京',
                            type: 'line',
                            stack: '总量',
                            data: [820, 932, 901, 934, 1290, 1330, 1320]
                        }
                    ]
                };
                // 使用刚指定的配置项和数据显示图表
                this.chartLine.setOption(option);
            }





        },

        beforeDestroy() {
            clearInterval(this.time)
        },


    };
</script>

<style lang="css" scoped>
    #home {
        width: 100%;
        height: 88vh;
        /* background-color: cadetblue; */
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;

        transition: all 1s;
        border-radius: 4px;
    }

    #home>div {
        width: 48%;
        height: 40vh;
        /* background-color: #fff; */
        margin-top: 15px;
        border: none;
        border-radius: 5px;
        transition: all ease 1s;
    }

    #home>div:hover {
        box-shadow: 0 12px 5px -10px rgb(0 0 0 / 10%), 0 0 4px 0 rgb(0 0 0 / 10%);

    }

    .img {
        width: 200px;
        height: 200px;
        background-color: #fff;
        border-radius: 50%;
        margin: auto;
    }

    .img img {
        width: 200px;
        height: 200px;
        border-radius: 50%;
    }

    .address {
        color: #585858;
    }
</style>