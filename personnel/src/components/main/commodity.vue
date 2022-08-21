<template>
    <div class="animate__animated animate__fadeIn animate__slow	3s">

        <!-- <draggable v-model="student" chosenClass="chosen" forceFallback="true" group="people" animation="1000"
            @start="onStart" @end="onEnd"> -->

        <Table :columns="columns8" :data="student" :draggable="true" @on-drag-drop="onDragDrop" ref="table"></Table>

        <!-- </draggable> -->
        <Page :total="total" :page-size="14" :show-total="true" :show-elevator="true" @on-change="change" />
    </div>
</template>

<script>

    // import draggable from 'vuedraggable'

    import axios from "axios"

    export default {
        name: 'BackstageCommodity',

        components: {
            // draggable
        },

        data() {
            return {
                num: 1,
                total: 1,
                student: [],
                set: "",
                columns8: [
                    {
                        "title": "姓名",
                        "key": "name",
                        "fixed": "left",
                        "width": 150
                    },
                    {
                        "title": "编号",
                        "key": "id",
                        "width": 150,
                        "sortable": true
                    },
                    {
                        "title": "年龄",
                        "key": "age",
                        "width": 100,
                        "sortable": true,
                        filters: [
                            {
                                label: '成年',
                                value: 1
                            },
                            {
                                label: '未成年',
                                value: 2
                            }
                        ],
                        filterMultiple: false,
                        filterMethod(value, row) {
                            if (value === 1) {
                                return row.age >= 18;

                            } else if (value === 2) {
                                return row.age < 18;
                            }
                        }
                    },
                    {
                        "title": "出生年月",
                        "key": "data",
                        "width": 150,
                        "sortable": true
                    },
                    {
                        "title": "性别",
                        "key": "sex",
                        "width": 100,

                    },
                    {
                        "title": "所在地",
                        "key": "address",
                        "width": 250,
                        "sortable": true
                    },
                    {
                        "title": "电话号码",
                        "key": "Phone",
                        "width": 150,

                    },
                    {
                        "title": "电子邮箱",
                        "key": "email",
                        "width": 200,

                    },

                ],

            };
        },

        mounted() {
            this.axios()

            axios.post("http://localhost:8080/examine").then(
                res => {
                    this.total = res.data.length
                },
                err => {
                    console.log("请求失败", err.message)
                }
            )

        },

        methods: {

            change(data) {
                this.num = data
                this.axios()
            },

            axios() {
                axios.post("http://localhost:8080/student", { num: this.num }).then(
                    res => {
                        this.student = [];
                        this.student.push(...res.data)
                    },
                    err => {
                        console.log("请求失败", err.message)
                    }
                )


            },

            onDragDrop(first, end) {

                // console.log(first, end)

                // 方法一

                // 转成int型，方便后续使用
                first = Number(first)
                end = Number(end)

                let tmp = this.student[first]

                if (first < end) {
                    for (let i = first + 1; i <= end; i++) {
                        this.student.splice(i - 1, 1, this.student[i])
                    }
                    this.student.splice(end, 1, tmp)
                }

                if (first > end) {
                    for (let i = first; i > end; i--) {
                        this.student.splice(i, 1, this.student[i - 1])
                    }
                    this.student.splice(end, 1, tmp)
                }

                //重置排序值
                let index = 1
                this.student.forEach(e => {
                    e.sort = index
                    index++
                })
                //排序值重置后，向后台发送请求，更新数据库中数据的排序，这里就不写了
                //axios

                // console.log(JSON.stringify(this.student))








            }






        },


    };
</script>

<style lang="scss" scoped>

</style>