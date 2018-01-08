<template>
<div class="app-container">
<el-container>
  <el-header>
    <el-row>
      <el-col :span="22"><div class="grid-content bg-purple-dark">&nbsp;</div></el-col>
      <el-col :span="2">
        <div>
          <el-button  @click="add" type="primary" >新增</el-button>
        </div>
      </el-col>
    </el-row>
  </el-header>
  <el-main v-loading.body="pageLoading" element-loading-text="拼命加载中" border fit highlight-current-row>
        <el-card class="box-card" v-for="item in tableData">
          <div slot="header" class="clearfix">
            <span>{{item.title}}</span>
            <el-button @click="enter(item.id)" type="text" size="small">管理</el-button>
            <el-button @click="preview(item.id)" type="text" size="small">预览</el-button>
            <el-button @click="edit(item)" type="text" size="small">编辑</el-button>
            <el-button @click="remove(item.id)"  type="text"  size="small">删除</el-button>
          </div>
          <myimg :myId="item.id" :myImg="item.pic"></myimg>
        </el-card>
  </el-main>
</el-container>


<el-dialog :title="operateTitle" :visible.sync="dialogTableVisible">
  <el-form ref="form" :model="form" :rules="FormRules" label-width="80px" v-loading="pageLoading" element-loading-text="给我一点时间">
    <el-form-item label="标题"  prop="title">
      <el-input  v-model="form.title"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit(form)">保存</el-button>
    </el-form-item>
  </el-form>
</el-dialog>
</div>
</template>

<script>
import myimg from '@/views/page/img'
export default {
  data() {
    return {
      tableData: [],
      dialogTableVisible: false,
      form: {
        title: '',
        id: 0
      },
      pageLoading: false,
      FormRules: {

      },
      operateTitle: ''
    }
  },
  created: function() {
    this.init()
  },
  methods: {
    init() {
      this.pageLoading = true
      this.$store.dispatch('page/List', this.form).then((res) => {
        this.tableData = res.data
        this.pageLoading = false
      }).catch(() => {
        this.pageLoading = false
      })
    },
    onSubmit(form) {
      let method = 'page/Add'
      const params = {
        title: this.form.title
      }
      if (form.id > 0) {
        method = 'page/Update'
        params.id = form.id
      }
      this.$store.dispatch(method, params).then((res) => {
        this.$message({
          type: 'success',
          message: '保存成功!'
        })
        this.dialogTableVisible = false
        this.init()
      }).catch(() => {

      })
    },
    add() {
      this.operateTitle = '新增'
      this.dialogTableVisible = true
    },
    edit(row) {
      this.operateTitle = '修改'
      this.dialogTableVisible = true
      this.form.id = row.id
      this.form.title = row.title
    },
    remove(id) {

      this.$confirm('确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('page/Delete', id).then((res) => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.dialogTableVisible = false
          this.init()
        }).catch(() => {
          this.$message({
            type: 'success',
            message: '删除失败!'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    enter(id) {
      this.$router.push(`/point?id=${id}`)
    },
    preview(id) {
      this.$router.push(`/preview?id=${id}`)
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
      //  this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isLt2M
    }
  },
  components: {
    myimg
  }
}
</script>

<style scoped lang="less">
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 70%;
    margin-left: 10%;
    margin-bottom: 1em;
    button{
      float: right;
      padding:0.3em
    }
  }


</style>

