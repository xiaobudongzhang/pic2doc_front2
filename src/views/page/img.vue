<template>
  <div v-loading.body="uploading" element-loading-text="上传中" border fit highlight-current-row>
    <el-upload
      class="avatar-uploader"
      action="/api/File/Upload"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
      name="img"
      :auto-upload="true"
      :multiple="false"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>

<script>
 export default {
   data() {
     return {
       imageUrl: this.myImg,
       uploading: false
     }
   },
   methods: {
     handleAvatarSuccess(res, file) {
       if (res.code == 200)
       {
         const params = {
           id: this.myId,
           pic: res.data.imgUrl
         }
         this.$store.dispatch('page/Update', params).then((resPage) => {
           this.$message({
             type: 'success',
             message: '上传成功!'
           })

           this.imageUrl = res.data.host + res.data.imgUrl

           this.uploading = false
         }).catch((err) => {
           this.uploading = false
           this.$message({
             type: 'error',
             message: '上传失败!'
           })
         })
       }
     },
     beforeAvatarUpload(file) {

       const isJPG = file.type === 'image/jpeg'
       const isLt2M = file.size / 1024 / 1024 < 10

       if (!isJPG) {
         //  this.$message.error('上传头像图片只能是 JPG 格式!');
       }
       if (!isLt2M) {
         this.$message.error('上传头像图片大小不能超过 10MB!')
       }
       this.uploading = true
       return isLt2M
     }
   },
   props: ['myId','myImg']
 }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .avatar-uploader {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    width: 100%;
  }
  .avatar-uploader:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .el-upload {
    width: 100% !important;
  }
</style>
