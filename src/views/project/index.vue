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
  <el-main>


    <el-table
      :data="tableData"
      style="width: 100%"
      v-loading.body="pageLoading" element-loading-text="拼命加载中" border fit highlight-current-row
    >
      <el-table-column
        prop="id"
        label="编号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="title"
        label="项目名称"
        width="180">
      </el-table-column>
      <el-table-column

        label="操作">
        <template slot-scope="scope">
          <el-button @click="enter(scope.row.id)" type="text" size="small">页面</el-button>
          <el-button @click="edit(scope.row)" type="text" size="small">编辑</el-button>
          <el-button type="text" @click="remove(scope.row.id)" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
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
export default {
  data() {
    return {
      tableData: [],
      dialogTableVisible:false,
      form: {
        title: '',
        id:0,
      },
      pageLoading:false,
      FormRules:{

      },
      operateTitle:''
    }
  },
  created: function () {
    this.init()
  },
  methods: {
    init(){
      this.pageLoading = true
      this.$store.dispatch('project/List', this.form).then((res) => {
        this.tableData = res.data
        this.pageLoading = false
      }).catch(() => {
        this.pageLoading = false
      });
    },
    onSubmit(form) {

      let method = 'project/Add'
      let params ={
        title:this.form.title
      }
      if (form.id > 0)
      {
        method = 'project/Update'
        params.id = form.id
      }
      this.$store.dispatch(method, params).then((res) => {
        this.$message({
          type: 'success',
          message: '保存成功!'
        });
        this.dialogTableVisible = false
        this.init()
      }).catch(() => {

      });
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

        this.$store.dispatch('project/Delete', id).then((res) => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.dialogTableVisible = false
          this.init()
        }).catch(() => {
          this.$message({
            type: 'success',
            message: '删除失败!'
          });
        });

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });
    },
    enter(id) {
        this.$router.push(`/project/page?id=${id}`)
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

