<template>
    <div class="animate__animated animate__fadeIn animate__slow	3s" id="consumer">


        <table style="width: 1250px; height: 724px; max-width: 1300px;">
            <tr style="float:left;">
                <td>
                    <Button type="primary" icon="ios-add-circle-outline" @click='insert'>新增</Button>
                </td>
                <td>
                    <label prop="name"> 姓名： </label>
                </td>
                <td>
                    <Input placeholder="请输入要查询的姓名" v-model="inputName" style="width: 200px" />
                </td>
                <td>
                    <Button type="info" @click="select">查询</Button>
                </td>
                <td>
                    <Button type="primary" icon="md-cloud-upload" @click='uploadExcel'>上传excel</Button>
                </td>
                <td>
                    <Button type="primary" icon="md-download" @click='exportExcel'>导出excel</Button>
                </td>
            </tr>
            <tr>

                <Table border :columns="columns" :data="data" height="700">
                </Table>

            </tr>
        </table>
        <!--↓↓↓ table更新的表单 ↓↓↓-->
        <!-- 
            v-model 是否显示弹窗
            :footer-hide 是否显示底部(包括2个默认按钮)
            title 弹窗标题
            ok-text 默认按钮确定的名称
            cancel-text 默认按钮关闭的名称
            width 弹窗宽度，影响内容控件的间距
            on-ok 默认确定按钮绑定事件
            on-cancel 默认取消按钮绑定事件
            on-visible-change 弹窗打开关闭事件
        -->
        <Modal v-model="modalConfig_table.window_udpTable" :footer-hide=true v-bind:title="modalConfig_table.title"
            v-bind:ok-text='modalConfig_table.okText' v-bind:cancel-text='modalConfig_table.cancelText' width="700px"
            @on-ok="save('formData_table')" @on-visible-change="reset('formData_table')">
            <!--  -->
            <Form :model="formData_table" :label-width="80" ref="formData_table" :rules="ruleValidate">
                <!--表单验证， 给 Form 设置属性 rules-->
                <Row>
                    <FormItem label="姓名:" prop="name">
                        <Input v-model="formData_table.name" placeholder="请输入姓名"></Input>
                    </FormItem>
                    <FormItem label="性别:" prop="sex">
                        <RadioGroup v-model="formData_table.sex">
                            <Radio label="男">
                                <!-- label与formData_table.sex的值联动  sex是男则选中男 -->
                                <Icon type="ios-man" />
                                <span>男</span>
                            </Radio>
                            <Radio label="女">
                                <Icon type="ios-woman" />
                                <span>女</span>
                            </Radio>
                        </RadioGroup>
                    </FormItem>
                    <FormItem label="年龄:" prop="age">
                        <InputNumber :min="1" v-model="formData_table.age"></InputNumber>
                    </FormItem>
                </Row>
                <Row>
                    <FormItem label="地址:">

                        <!-- <Input v-model="formData_table.address" type="textarea" :rows="3" placeholder="请输入你的地址" /> -->

                        <el-cascader v-model="selectedOptions" :options="options" @change="handleChange"></el-cascader>
                    </FormItem>
                    <FormItem>

                        <Button type="primary" @click="save('formData_table')">提交</Button>
                        <Button @click="reset('formData_table')" style="margin-left: 8px">重置</Button>
                    </FormItem>
                </Row>
                <Row>


                </Row>

            </Form>
        </Modal>

        <Modal v-model="exportConfig.value" :title="exportConfig.title" :footer-hide="exportConfig.footerHide"
            :width="exportConfig.width">
            <div class="layout">
                <Layout>
                    <Header style="background-color:whitesmoke">
                        <table>
                            <tr>
                                <td>
                                    <Button to="http://121.43.41.227:8080/Template/上传模板.xlsx" target="_blank"
                                        icon="ios-download-outline" type="primary">模板</Button>
                                </td>
                                <td>
                                    <Button type="primary" @click='uploadSave'>保存</Button>
                                </td>
                            </tr>
                        </table>

                    </Header>
                    <Footer style="background-color:rgb(254, 254, 254)">
                        <input type="file" id="upload-excel-file">
                    </Footer>
                </Layout>
            </div>
        </Modal>



    </div>

</template>
<script>

    import { regionData, CodeToText } from 'element-china-area-data'

    import axios from "axios"

    import LAY_EXCEL from 'lay-excel';

    // import { mapState } from "vuex"
    export default {
        name: "MainComsumer",

        data() {
            return {
                options: regionData,
                selectedOptions: [],
                form: {
                    province: "", //省份
                    city: "", //市区
                    country: "",//乡村  
                },
                data: [],

                columns: [{ //列属性
                    title: '姓名',
                    key: 'name',
                    render: (h, params) => {
                        return h('div', [
                            h('Icon', {
                                props: {
                                    type: 'person'
                                }
                            }),
                            h('strong', params.row.name)
                        ]);
                    }
                },
                {
                    title: '性别',
                    key: 'sex',
                    width: 258
                },
                {
                    title: '年龄',
                    key: 'age',
                    width: 258
                },
                {
                    title: '地址',
                    key: 'address',
                    width: 258
                },
                {
                    title: '操作',
                    key: 'action',
                    width: 220,
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.show(params.index)
                                    }
                                }
                            }, '详情'),
                            h('Button', {
                                props: {
                                    type: 'success',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.edit(params.row, params.index)
                                    }
                                }
                            }, '编辑'),
                            h('Button', {
                                props: {
                                    type: 'error',
                                    size: 'small'
                                },
                                on: {
                                    click: () => {
                                        this.remove(params.row, params.index)
                                    }
                                }
                            }, '删除')
                        ]);
                    }
                }
                ],
                ruleValidate: { //表单验证
                    name: [{
                        required: true,
                        message: '请输入姓名',
                        trigger: 'blur'
                    }],
                    age: [{
                        required: true,
                        type: 'number',
                        message: '请输入年龄',
                        trigger: 'blur'
                    }],
                    address: [{
                        required: true,
                        message: '请输入地址',
                        trigger: 'blur'
                    }],
                },
                modalConfig_table: { //弹窗属性设置数据
                    window_udpTable: false, //更新table弹窗的显示状态  用于全局控制
                    okText: '确定按钮文字',
                    cancelText: '取消按钮文字',
                    title: '我是标题...'
                },
                formData_table: { //表单控件数据
                    name: '',
                    sex: '男',
                    age: 18,
                    address: '',
                },
                selectIndex: 0, //编辑行的索引
                inputName: '', //查询输入框的值
                linshi: {}, //表格数据临时存放
                exportConfig: { //导入弹窗设置
                    value: false,
                    title: '导入数据',
                    width: '270',
                    footerHide: true,
                }
            }
        },
        mounted() {


            axios.post("http://localhost:8080/demo").then(
                res => {
                    this.data.push(...res.data)
                },
                err => {
                    console.log("请求失败", err.message)
                }
            )






        },
        methods: {
            handleChange() {
                for (let i = 0; i < this.selectedOptions.length; i++) {
                    if (i == 0) {
                        this.form.province = CodeToText[this.selectedOptions[i]]
                    }
                    if (i == 1) {
                        this.form.city = CodeToText[this.selectedOptions[i]]
                    }

                    if (i == 2) {
                        this.form.country = CodeToText[this.selectedOptions[i]]
                    }

                }


                this.selectedOptions.push(this.form)

                this.formData_table.address = Object.values(this.selectedOptions[3]).join().replace(/,/g, "/")





            },


            show(index) {
                this.$Modal.info({
                    title: '数据详情',
                    content: `姓名：${this.data[index].name}<br>性别：${this.data[index].sex}<br>
                    年龄：${this.data[index].age}<br>地址：${this.data[index].address}`
                })
            },
            insert() { //打开新增窗口
                this.modalConfig_table.title = "新增";
                this.modalConfig_table.window_udpTable = true;

            },

            save(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        let title = this.modalConfig_table.title;
                        var params = JSON.parse(JSON.stringify(this.formData_table));
                        if (title == "新增") {
                            this.data.push(params); //新增一条
                            this.$Message.success('新增成功');
                            // console.log(params)
                            axios.post("http://localhost:8080/add", { add: params }).then(
                                res => {
                                    // console.log(res)
                                    console.log("新增成功", res)
                                },
                                err => {
                                    console.log("请求失败", err.message)
                                }
                            )

                        }
                        if (title == "编辑") {
                            /* $set参数： 1 表格数据数组   2 修改的索引   3 需要保存的数据  */
                            this.$set(this.data, this.selectIndex, params);

                            this.$Message.success("修改成功!");
                        }
                        this.modalConfig_table.window_udpTable = false //弹窗关闭
                    } else {
                        this.$Message.error('验证未通过!');
                    }
                })
            },
            edit(row, index) { //打开编辑窗口
                this.selectIndex = index;
                this.modalConfig_table.title = "编辑"
                this.modalConfig_table.window_udpTable = true //弹窗开启
                /* 浅度拷贝的2种方式  有BUG!!!
                把数据的地址赋值给对应变量，而没有把具体的数据复制给变量，变量会随数据值的变化而变化
                // this.formData_table = row;
                // this.formData_table = this.data[index]; 
                这里我们需要进行深度拷贝
                ↓深度拷贝↓
                */
                this.formData_table = JSON.parse(JSON.stringify(row));

                // this.formData_table = row;
                // this.formData_table = this.data[index];

                // console.log(row)

                // axios.post("http://localhost:8080/compile", { compile: row }).then(
                //     res => {
                //         // console.log(res)
                //         console.log("修改成功", res)
                //     },
                //     err => {
                //         console.log("请求失败", err.message)
                //     }
                // )
            },
            remove(row, index) {
                this.$Modal.confirm({
                    title: '警告',
                    content: '<p>确定删除 ' + row.name + ' 吗？</p>',
                    onOk: () => {
                        this.data.splice(index, 1);
                        this.$Message.success("删除成功!");

                        axios.post("http://localhost:8080/del", { name: row.name }).then(
                            res => {
                                console.log(res)
                            },
                            err => {
                                console.log("请求失败", err.message)
                            }
                        )
                    },
                    onCancel: () => {
                        this.$Message.info('取消删除');
                    }
                });
            },
            select() {
                // 获取表格数据
                var tabledata = JSON.parse(JSON.stringify(this.data));
                // console.log(this.linshi.length)
                //如果临时数据是空的，就给它赋值全部的表格数据
                if (this.linshi.length == undefined) {
                    this.linshi = tabledata;
                }
                //如果输入框的内容是空的，给表格赋值临时存储的全部数据   等于查询全部的效果
                console.log(this.inputName)
                if (this.inputName == "") {
                    this.data = this.linshi;
                } else {
                    // 设置一个空的数组
                    let arr = [];
                    // 循环遍历
                    for (let i = 0; i < tabledata.length; i++) {
                        if (tabledata[i].name.indexOf(this.inputName) != -1) { // 如果表格数据包含了 输入框的数据
                            arr.push(tabledata[i]);
                        }
                    }
                    // 将查找出来的数据给表格
                    this.data = arr;
                }

            },

            reset(name) { // 清除文本框  重置
                // console.log(name)    
                // console.log(this.$refs[name])
                let title = this.modalConfig_table.title;
                if (title != "编辑") {
                    this.$refs[name].resetFields(); //前置条件： From表单设置属性 ref="formData_table"   ，ref和v-model保持一致
                    // this.formData_table = Object.assign({}, this.defaultForm);  //第二种方式重置表单

                }

            },
            exportExcel() { //导出
                let tabledata = JSON.parse(JSON.stringify(this.data));
                let exceldata = LAY_EXCEL.filterExportData(tabledata, {
                    username: 'name', //排序、字段过滤、重命名
                    sex: 'sex',
                    age: 'age',
                    address: 'address',
                });
                exceldata.unshift({ //设置列名
                    username: "姓名",
                    sex: '性别',
                    age: '年龄',
                    address: '地址',

                })
                LAY_EXCEL.exportExcel(exceldata, '教师管理系统.xlsx', 'xlsx');
            },
            uploadExcel() { //打开上传窗口
                this.exportConfig.value = true;
            },
            uploadSave() { //上传
                let thiss = this; //当前对象赋个值  后面的this会变
                let files = document.getElementById('upload-excel-file').files;
                try {
                    LAY_EXCEL.importExcel(files, {}, function (data) {
                        // console.log('导入JSON：' + JSON.stringify(data));
                        data = LAY_EXCEL.filterImportData(data, {
                            'name': 'A',  //梳理时 要确保字段名对应上
                            'sex': 'B',
                            'age': 'C',
                            'address': 'D'
                        })
                        // console.log('梳理后JSON：' + JSON.stringify(data));
                        //写入数据


                        let Sheet1 = data[0].sheet1 == undefined ? data[0].Sheet1 : data[0].sheet1;


                        for (let i = 0; i < Sheet1.length; i++) {
                            if (i == 0) { //跳过列头
                                continue;
                            }

                            thiss.data.push(Sheet1[i]); //新增一条
                        }
                        thiss.exportConfig.value = false;
                        thiss.$Message.success("导入成功!");
                    });
                } catch (e) {
                    this.$Message.error('导入错误: ' + e.message);
                }
            },



        },




    }
</script>

<style>


</style>