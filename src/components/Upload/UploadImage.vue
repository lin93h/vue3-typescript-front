<template>
  <div class="upload-image-wrapper">
    <div class="upload-con">
      <el-upload :action="uploadAction" :show-file-list="false" :data="qiniuData" :name="paramName" :on-success="handleAvatarSuccess"
                 :before-upload="beforeAvatarUpload" :on-error="handleError" :disabled="loading" v-if="type == 'btn'">
        <el-button :loading="loading" type="primary" size="small" :disabled="loading">点击上传</el-button>
      </el-upload>
      <el-upload class="avatar-uploader" :action="uploadAction" accept=".jpg" :data="qiniuData" multiple :headers="headers" :name="paramName" :show-file-list="false"
                 :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" :on-error="handleError" :disabled="loading" v-else>
        <template v-if="loading">
          <div class="icon-box">
            <i class="avator-loading el-icon-loading"></i>
            <span class="loading-txt">上传中...</span>
          </div>
        </template>
        <template v-else>
          <div class="icon-box">
            <i class="el-icon-plus avatar-uploader-icon"></i>
            <span class="txt">上传照片</span>
          </div>
        </template>
      </el-upload>
    </div>
  </div>
</template>

<script>
import { getToken } from '@/utils/auth';
import { mapGetters } from 'vuex';

export default {
  props: {
    // 上传按钮类型
    type: String,
    // 图片大小限制
    maxSize: {
      type: Number,
      default: 0.2
    }
  },
  data() {
    return {
      loading: false,
      uploadAction: "https://upload-z2.qiniup.com",
      paramName: "file",
      imageUrl: '',
      domain: "",
      headers: {
        Authorization: "Bearer " + getToken()
      },
      qiniuData: {
        key: "",
        token: "",
      }
    }
  },
  computed: {
    ...mapGetters(['qiniuToken'])
  },
  methods: {
    // 上传成功
    handleAvatarSuccess(res, file) {
      this.loading = false;
      // this.imageUrl = URL.createObjectURL(file.raw);
      let imgUrl = this.domain + res.key;
      this.$emit('success', { imgUrl, file });
    },

    // 上传前
    async beforeAvatarUpload(file) {
      this.loading = true;
      const isImg = file.type === 'image/jpeg' || file.type === 'image/png';
      const isLtMax = file.size / 1024 / 1024 < this.maxSize;
      let suffix = file.name.split(".")[1];
      if(!isImg) {
        this.$message.error('上传的图片只能是 jpg/jpeg/png 格式!');
      }
      if(!isLtMax) {
        this.$message.error('上传图片大小不能超过 ' + this.maxSize * 1000 + 'KB!');
      }
      if(!isImg || !isLtMax) {
        this.loading = false;
      }
      if(isImg && isLtMax) {
        this.qiniuData.key = this.qiniuToken.key + "." + suffix;
        this.qiniuData.token = this.qiniuToken.token;
        this.domain = "http://" + this.qiniuToken.domain;
        // let tokenData = await qiNiuYunToken();
        // this.qiniuData.key = tokenData.key + "." + suffix;
        // this.qiniuData.token = tokenData.token;
        // this.domain = "http://" + tokenData.domain;
      } else {
        return false;
      }
    },

    // 上传异常
    handleError(err, file, fileList) {
      this.loading = false;
      // this.imageUrl = URL.createObjectURL(file.raw);
      // this.$emit('success', { imgUrl: this.imageUrl, file });
      // this.$message({
      //     message: "图片上传是失败,请稍后重试",
      //     type: "error",
      //     showClose: true,
      // })
    }
  }
}
</script>

<style lang="scss">
.upload-image-wrapper {
  .upload-con {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
  }
  .avatar-uploader {
    width: 100px;
    height: 100px;
    background: rgba(0, 0, 0, 0.04);
    .icon-box {
      width: 100px;
      height: 100px;
      display: flex;
      flex-flow: column nowrap;
      align-items: center;
      justify-content: center;
    }
    .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .txt {
      font-size: 14px;
      color: #999;
    }
    .el-upload:hover {
      border-color: #409eff;
    }
    .avatar-uploader-icon {
      font-size: 20px;
      color: #8c939d;
      text-align: center;
    }
    .avator-loading {
      font-size: 20px;
      margin-bottom: 5px;
    }
    .loading-txt {
      font-size: 14px;
    }
  }
}
</style>