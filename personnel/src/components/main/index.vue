<template>
    <div id="index">
        <el-container>
            <el-aside width="200px" id="left">
                <p id="p" class="animate__bounceIn animate__fadeIn animate__delay-1s animate__slower ">
                    智慧校园云平台</p>
                <el-menu class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff"
                    active-text-color="#ffd04b" default-active="1-4-1" :collapse="isCollapse">

                    <router-link :to="{name:'home'}">
                        <el-menu-item index="1" style="color: #67c23a;">
                            <i class="el-icon-platform-eleme" style="color: #67c23a;"></i>
                            <span slot="title">首页</span>
                        </el-menu-item>
                    </router-link>
                    <router-link :to="{name:'commodity'}">
                        <el-menu-item index="2">
                            <i class="el-icon-menu"></i>
                            <span slot="title">学生管理</span>
                        </el-menu-item>
                    </router-link>
                    <router-link :to="{name:'consumer'}">
                        <el-menu-item index="3">
                            <i class="el-icon-document"></i>
                            <span slot="title">教师管理</span>
                        </el-menu-item>
                    </router-link>
                    <el-submenu index="4">
                        <template slot="title">
                            <i class="el-icon-setting"></i>
                            <span slot="title">其他</span>
                        </template>
                        <el-menu-item-group>
                            <router-link :to="{name:'RestOne'}">
                                <el-menu-item index="1-1">选项1</el-menu-item>
                            </router-link>
                            <router-link :to="{name:'RestTwo'}">
                                <el-menu-item index="1-2">选项2</el-menu-item>
                            </router-link>
                        </el-menu-item-group>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <el-container>
                <el-header>
                    <el-button @click="put" type="primary" icon="el-icon-s-operation"></el-button>
                    <!-- <el-link type="danger">危险链接</el-link> -->
                    <el-button type="danger" class="el-icon-setting" @click="centerDialogVisible = true">
                    </el-button>

                    <el-dropdown id="img">
                        <div class="el-dropdown-link">
                            <img v-if="img" :src="img" alt="">
                            <el-avatar v-if="!img" icon="el-icon-user-solid"></el-avatar>
                        </div>


                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item class="el-icon-user-solid">个人中心</el-dropdown-item>

                            <el-dropdown-item class="el-icon-s-promotion" :plain="true">
                                <div @click="quit" style="display: inline-block;">
                                    退出账号
                                </div>

                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>

                </el-header>


                <el-main>

                    <router-view></router-view>

                    <el-dialog title="提示" :visible.sync="centerDialogVisible" id="color" width="35%" center>
                        <color-picker :draggable="false" @receiveColor="receiveColor"></color-picker>
                        <span slot="footer" class="dialog-footer">

                        </span>
                    </el-dialog>


                </el-main>

            </el-container>
        </el-container>

    </div>
</template>

<script>

    import ColorPicker from 'vue-color-picker-sheldon'

    export default {
        name: 'BackstageIndex',

        components: {
            ColorPicker
        },

        data() {
            return {
                isCollapse: false,
                num: 1,
                img: sessionStorage.getItem("img"),
                hint: sessionStorage.getItem("hint"),
                colorValue: "",
                centerDialogVisible: false
            };
        },

        mounted() {
            this.open2()
        },


        methods: {

            receiveColor(colorValue) {
                this.colorValue = colorValue
                this.$store.commit("color", this.colorValue)
                this.centerDialogVisible = false
            },


            put() {

                if (this.num == 1) {
                    document.getElementById("left").style.width = 65 + "px";
                    this.isCollapse = !this.isCollapse
                    document.getElementById("p").innerHTML = "智校"
                    this.num = 2
                } else {
                    document.getElementById("left").style.width = 200 + "px";
                    this.isCollapse = !this.isCollapse
                    document.getElementById("p").innerHTML = "智慧校园云平台"
                    this.num = 1
                }

            },
            open2() {
                this.$message({
                    message: '登录成功！！！',
                    type: 'success'
                });
            },


            quit() {
                this.hint = 0;
                this.img = null
                sessionStorage.clear()
                this.$router.replace({ name: "logon" })
            },




        },

    };
</script>

<style>
    #p {
        width: 100%;
        height: 60px;
        color: #fff;
        font-size: 16px;
        text-align: center;
        line-height: 60px;
    }

    a {
        text-decoration: none;
    }


    #left {
        height: 100vh;
        background-color: rgb(84, 92, 100);
        transition: all ease 0.5s;
    }

    .el-menu {
        border: none;
    }

    .el-header {
        background-color: #ccc;
        /* display: flex; */
        line-height: 60px;
        position: relative;

    }

    #img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        position: absolute;
        display: inline-block;
        right: 20px;
        top: 50%;
        transform: translateY(-50%);


    }

    #img img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        cursor: pointer;
    }

    #color>div {
        width: 100%;
    }

    /* .el-dialog__body>div button {
        display: none;
    } */
</style>