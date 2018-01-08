<template>
<div >
  <el-container>
    <el-header >
      <div draggable="true" @dragstart="drag($event)" @drop.prevent="dropdel($event)" @dragover.prevent="allowDrop($event)">
        <div draggable="true" style="width: 40px;height: 40px"
             @drop.prevent="drop($event)" @dragover.prevent="allowDrop($event)"  @dragstart="drag($event)"
        >
          <svg width="100%" height="100%" version="1.1"
               xmlns="http://www.w3.org/2000/svg" >
            <circle cx="20" cy="20" r="10" stroke="black"
                    stroke-width="1" fill="red" />
          </svg>
        </div>

      </div>
    </el-header>
    <el-main  id="app-main"
              v-bind:style="styleObject"
              v-loading.body="imgLoading" element-loading-text="拼命加载中" border fit highlight-current-row>
<div style="height: 900px;width: 100%"
     @dragover.prevent="allowDrop($event)"
     @drop.prevent="drop($event)"
>

  <div  v-for="item in lists"
        style="width: 40px;height: 40px;background: white;z-index: 1"
        draggable="true"
        @dragstart="dragdel($event,item.id)"
        @dragover.prevent="allowDrop($event)"
        @click="edit(item)"
  >
  <svg width="100%" height="100%" version="1.1"
             xmlns="http://www.w3.org/2000/svg" >
          <circle :cx="item.point_x" :cy="item.point_y + 60" r="10" stroke="black"
                  stroke-width="1" fill="red" @click="edit(item)"/>

        </svg>
  </div>
</div>
    </el-main>
  </el-container>






  <el-dialog :title="operateTitle" :visible.sync="dialogTableVisible">
   <el-tabs type="border-card">
      <el-tab-pane label="产品">

          <el-form ref="formcp" :model="formcp">
            <el-form-item >
              <VueUEditor ref="ueditorcp"  @ready="ereadycp" :ueditorPath=editorConfig.UEDITOR_HOME_URL style="min-height: 240px" :ueditorConfig=editorConfig></VueUEditor>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit(1,'cp')">保存</el-button>
            </el-form-item>
          </el-form>
      </el-tab-pane>
     <el-tab-pane label="开发">
        <div>
          <el-form ref="formkf" :model="formkf">
            <el-form-item >
              <VueUEditor ref="ueditorkf"  @ready="ereadykf" :ueditorPath=editorConfig.UEDITOR_HOME_URL style="min-height: 240px" :ueditorConfig=editorConfig></VueUEditor>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit(2,'kf')">保存</el-button>
            </el-form-item>
          </el-form> </div>
      </el-tab-pane>
      <el-tab-pane label="测试">
        <div >
          <el-form ref="formcs" :model="formcs">
            <el-form-item >
              <VueUEditor ref="ueditorcs"  @ready="ereadycs" :ueditorPath=editorConfig.UEDITOR_HOME_URL style="min-height: 240px" :ueditorConfig=editorConfig></VueUEditor>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit(3,'cs')">保存</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-tab-pane>
      <el-tab-pane label="其他">
        <div >
          <el-form ref="formqt" :model="formqt">
            <el-form-item >
              <VueUEditor ref="ueditorqt"  @ready="ereadyqt" :ueditorPath=editorConfig.UEDITOR_HOME_URL style="min-height: 240px" :ueditorConfig=editorConfig></VueUEditor>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit(4,'qt')">保存</el-button>
            </el-form-item>
          </el-form>
        </div>
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
      editorConfig:{//ueditor config
        UEDITOR_HOME_URL:'/static/ueditor/',
        serverUrl:'/api/Default/UploadImg'
      },
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


    },
    allowDrop(event) {

    },
    drag(event) {
      console.log("drag")
    },
    dragdel(event,id) {
      event.dataTransfer.setData("Text", id);
    },
    dropdel(event) {
      let id = event.dataTransfer.getData("Text");

      this.$store.dispatch('point/Delete', id).then((res) => {
        this.lists = _.remove(this.lists, function(o) { return o.id == id; });
      }).catch((err) => {

      })
    },
    drop(event) {

      const params = {
        point_x: event.pageX,
        point_y: event.pageY - 60,
        page_id: this.$route.query.id
      }
      this.$store.dispatch('point/Add', params).then((res) => {

        this.lists.push(params);
      }).catch(() => {

      })
    },
    ereadycp(instance){
      instance.setContent(this.formcp.content)
      instance.addListener('contentChange',()=>{
        this.formcp.content=instance.getContent();
      })
    },
    ereadykf(instance){
      instance.setContent(this.formkf.content)
      instance.addListener('contentChange',()=>{
        this.formkf.content=instance.getContent();
      })
    },
    ereadycs(instance){
      instance.setContent(this.formcs.content)
      instance.addListener('contentChange',()=>{
        this.formcs.content=instance.getContent();
      })
    },
    ereadyqt(instance){
      instance.setContent(this.formqt.content)
      instance.addListener('contentChange',()=>{
        this.formqt.content=instance.getContent();
      })
    },
    onSubmit(type,typeName)
    {
      let params= {
        content:this['form'+typeName].content,
        point_id:this.currentPointId,
        type_index:type
      }
      this.$store.dispatch('point_detail/Replace', params).then((res) => {
        this.$message({
          type: 'success',
          message: '保存成功!'
        });
      }).catch(() => {

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


</style>

