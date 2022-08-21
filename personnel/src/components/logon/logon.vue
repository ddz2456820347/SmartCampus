<template>
    <div id="div">

        <div id="logon" class="animate__bounceIn">
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px"
                class="demo-ruleForm">
                <el-form-item label="账号" prop="name" :rules="[
                { required: true, message: '账号不能为空'},
                { type: 'string', message: '账号必须为字符'}]">
                    <el-input v-model.number="ruleForm.name" clearable></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="pass">
                    <el-input type="password" v-model="ruleForm.pass" autocomplete="off" show-password></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPass">
                    <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off" show-password>
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="success" @click="submitForm('ruleForm')">
                        提交
                    </el-button>
                    <el-button @click="resetForm('ruleForm')" :plain="true" style="margin-left: 215px;">
                        重置</el-button>
                </el-form-item>
            </el-form>
        </div>

        <Vcode :imgs="[img1, img2]" :show="isShow" :range="3" @success="onSuccess" :puzzleScale="1" :sliderSize="30"
            @close="onClose" />







    </div>

</template>

<script>
    import { mapState } from "vuex"
    import Vcode from "vue-puzzle-vcode";








    export default {

        name: 'BackstageLogon',

        components: {
            Vcode
        },
        mounted() {
            this.$store.dispatch("post")

        },
        data() {
            var checkname = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('账号不能为空'));
                } else {
                    callback()
                }
            }

            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                }
                if (this.ruleForm.checkPass !== '') {
                    this.$refs.ruleForm.validateField('checkPass');
                }
                callback();
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.ruleForm.pass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback()
                }
            };
            return {
                hint: 0,
                isShow: false,
                img1: require('../../assets/img1.jpg'),
                img2: require('../../assets/img2.jpg'),
                ruleForm: {
                    pass: '',
                    checkPass: '',
                    name: ''
                },
                rules: {
                    pass: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    checkPass: [
                        { validator: validatePass2, trigger: 'blur' }
                    ],
                    name: [
                        { validator: checkname, trigger: 'blur' }
                    ]
                }
            }
        },
        computed: {
            ...mapState(["datalist"])
        },
        methods: {


            onSuccess() {
                this.isShow = false; // 通过验证后，需要手动关闭模态框
                this.$router.replace({ name: "index", })
            },

            onClose() {
                this.isShow = false;
            },

            submitForm(formName) {



                this.$refs[formName].validate((valid) => {

                    if (valid) {
                        for (const key in this.datalist) {
                            if (this.ruleForm.name == this.datalist[key].name) {
                                if (this.datalist[key].password == this.ruleForm.pass) {
                                    this.hint = 1;
                                    sessionStorage.setItem("hint", this.hint)
                                    sessionStorage.setItem("img", this.datalist[key].img)
                                    this.isShow = true;
                                    break
                                } else {
                                    this.hint = 2
                                    this.open4()
                                    break
                                }
                            }

                        }

                    } else {
                        this.hint = 3
                        this.open3()
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
                this.open1()
            },
            open1() {
                this.$message({
                    message: "重置成功",
                    type: 'warning'
                });
            },

            open3() {
                this.$message({
                    message: '请按照规范填写',
                    type: 'warning'
                });
            },

            open4() {
                this.$message.error('用户名或密码错误');
            }
        }
    };
</script>

<style lang="css" scoped>
    #logon {
        width: 500px;
        height: 270px;

        padding: 20px;
        margin: auto;
        position: relative;
        top: 200px;
        border: none;
        box-shadow: 0 12px 5px -10px rgba(0, 0, 0, 0.1), 0 0 4px 0 rgba(0, 0, 0, 0.1);

        border-radius: 5px;
    }



    #div {
        width: 100%;
        height: 800px;
        position: relative;
    }

    /* #div>div:nth-child(1) {
        width: 100%;
        position: absolute;
    } */

    #logon a {
        text-decoration: none;
        color: #fff;
    }
</style>