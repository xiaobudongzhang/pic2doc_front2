<template>
  <div   v-bind:style="styleObject" id="app-main"
         v-loading.body="imgLoading" element-loading-text="拼命加载中" border fit highlight-current-row
  >


    <svg width="100%" height="100%" version="1.1"
         xmlns="http://www.w3.org/2000/svg"  >
      <circle v-for="item in lists" :cx="item.point_x" :cy="item.point_y" r="10" stroke="black"
              stroke-width="1" fill="red" @click="edit(item)"/>
    </svg>


    <el-dialog :title="operateTitle" :visible.sync="dialogTableVisible">
      <el-tabs type="border-card">
        <el-tab-pane label="产品">
          <div  v-html="formcp.content"></div>
        </el-tab-pane>
        <el-tab-pane label="开发">
          <div  v-html="formkf.content"></div>
        </el-tab-pane>
        <el-tab-pane label="测试">
          <div  v-html="formcs.content"></div>
        </el-tab-pane>
        <el-tab-pane label="其他">
          <div  v-html="formqt.content"></div>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
  </div>
</template>

<script>
  import VueUEditor from 'vue-ueditor'
  export default {
    data() {
      return {
        currentPointId:0,
        imgUrl: '',
        imgLoading: false,
        styleObject: {
          'background-image': '',
          'z-index':100
        },
        lists:[],
        operateTitle: '',
        dialogTableVisible:false,
        formcp:{
          content:''
        },
        formkf:{
          content:''
        },
        formcs:{
          content:''
        },
        formqt:{
          content:''
        }
      }
    },
    created: function() {
      this.init()
    },
    methods: {
      async init(){
        this.imgLoading = true
        await this.$store.dispatch('page/Detail', this.$route.query.id).then((res) => {
          this.styleObject['background-image'] = `url(${res.data.info.pic})`

          this.imgLoading = false
        }).catch(() => {
          this.imgLoading = false
        })

        await this.$store.dispatch('point/List', {page_id:this.$route.query.id}).then((res) => {
          this.lists = res.data
        }).catch((err) => {

        })
      },
      edit(item) {

        let params ={
          point_id:item.id
        }

        this.$store.dispatch('point_detail/List', params).then((res) => {
          res.data.forEach((val)=> {
            switch (val.type_index) {
              case 1:this.formcp.content = val.content;
                break;
              case 2:this.formkf.content = val.content;
                break;
              case 3:this.formcs.content = val.content;
                break;
              case 4:this.formqt.content = val.content;
                break;
              default:;
                break;
            }
          })
          this.dialogTableVisible = true
        }).catch((err) => {
          this.dialogTableVisible = true
        })


      }
    },
    components: {
      VueUEditor
    }
  }
</script>

<style scoped lang="less">

  #app-main{
    height: 900px;
  }
  .el-tab-pane{
    height: 300px;
  }

</style>
