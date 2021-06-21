<template>
  <div class="app-footer">
    <div class="footer-con">
      <img :src="footerImg" alt="" class="footer-img">
      <div class="desc-box">
        <div class="desc-group">
          <div class="desc">版权所有：福建省人力资源和社会保障厅职业能力建设处</div>
          <div class="desc">
            <span class="txt">闽ICP备08103886号-9</span>
            <span class="txt">闽公网安备 35010202001212号</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import footerImg from '@/assets/images/footer.png'

export default defineComponent({
  data() {
    return {
      footerImg
    }
  }
})
</script>

<style lang="scss">
.app-footer {
  width: 100%;
  background: #002766;
  .footer-con {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: center;
    padding: 20px 0;

    .footer-img {
      margin-right: 10px;
    }
    .desc-box {
      display: flex;
      flex-flow: row nowrap;
      font-size: 12px;
      color: #aaa;
      .desc-group {
        margin-right: 20px;
        .desc {
          margin-bottom: 5px;
          .txt {
            margin-right: 20px;
          }
          &:last-child {
            margin-bottom: 0;
          }
        }
      }
    }
  }
}
</style>