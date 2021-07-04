<template>
  <div class="loan-personal-wrapper">
    <el-row class="form-section" :gutter="24">
      <el-form ref="applyForm" :model="formData" :rules="rules" label-width="150px" inline>
        <el-col :span="12">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="formData.name" :style="formStyle" disabled clearable placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="性别" prop="sex">
            <el-radio-group v-model="formData.sex" disabled>
              <el-radio-button label="男">男</el-radio-button>
              <el-radio-button label="女">女</el-radio-button>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="证件类型" prop="certType">
            <el-select v-model="formData.certType" :style="formStyle" disabled placeholder="请选择">
              <el-option label="居民身份证" value="居民身份证">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="证件号码" prop="idCard">
            <el-input v-model="formData.idCard" :style="formStyle" disabled clearable placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="手机号码" prop="mobile">
            <el-input v-model="formData.mobile" :style="formStyle" clearable placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="户籍所在地" prop="household">
            <el-cascader v-model="formData.household" :style="formStyle" clearable :options="areaTreeList" :props="cascaderProps" @change="handleChangeHouse">
            </el-cascader>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="现居住地" prop="areaCode">
            <el-cascader v-model="formData.areaCode" :style="formStyle" clearable :options="areaTreeList" :props="cascaderProps" @change="handleChangeArea">
            </el-cascader>
          </el-form-item>
        </el-col>
        <el-col :span="20">
          <el-form-item label="详细地址" prop="curHouse">
            <el-input v-model="formData.curHouse" clearable placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="创业所在地">
            <el-cascader v-model="formData.businessArea" :style="formStyle" clearable :options="areaTreeList" :props="cascaderProps"
                         @change="handleBusinessArea" placeholder="请选择(如创业进行填报)"></el-cascader>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="统一社会信用代码" prop="companyCredit">
            <el-input v-model="formData.companyCredit" :style="formStyle" clearable placeholder="请输入(如创业进行填报)"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="经营性质">
            <el-select v-model="formData.businessNature" :style="formStyle" clearable placeholder="请选择(如创业进行填报)">
              <el-option v-for="key in companyType" :key="key" :label="key" :value="companyType[key]"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="融资需求金额(万元)" prop="amount">
            <el-tooltip class="item" effect="dark" content="高校毕业生可申请15-20万，其他人员可申请15万" placement="top">
              <el-input-number v-model="formData.amount" :precision="4" :step="5" :min="0.0001" :max="9999" :style="formStyle" placeholder="请输入">
              </el-input-number>
            </el-tooltip>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="意向银行" prop="bank">
            <el-select v-model="formData.bank" filterable :style="formStyle" clearable placeholder="请输入">
              <el-option v-for="(item, index) in bankList" :key="index" :label="item.jrjgname" :value="item.jrjgname"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="备注" prop="remark">
            <el-input v-model="formData.remark" type="textarea" rows="5" maxlength="200" show-word-limit placeholder=""></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="身份证人像面" prop="idCardFront">
            <el-upload :class="formData.idCardFront.length >= 1 ? 'hide' : ''" action="https://upload-z2.qiniup.com" :data="{token: qiniuToken.token}"
                       accept=".jpg,.png" :multiple="false" :limit="1" list-type="picture-card" :file-list="idCardFrontList" :on-success="handleFront"
                       :on-exceed="handleExceed" :on-preview="handlePictureCardPreview" :on-remove="handleRemoveFront" :on-error="handleError">
              <i class="el-icon-plus"></i>
            </el-upload>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="身份证国徽面" prop="idCardBack">
            <el-upload :class="formData.idCardBack.length >= 1 ? 'hide' : ''" action="https://upload-z2.qiniup.com" :data="{token: qiniuToken.token}"
                       accept=".jpg,.png" :multiple="true" :limit="1" :file-list="idCardBackList" list-type="picture-card" :on-success="handleBack"
                       :on-exceed="handleExceed" :on-preview="handlePictureCardPreview" :on-remove="handleRemoveBack" :on-error="handleError">
              <i class="el-icon-plus"></i>
            </el-upload>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="借款人身份类别" prop="manType">
            <el-select v-model="formData.manType" :style="formStyle" clearable placeholder="请选择">
              <el-option v-for="key in personnelType" :key="key" :label="personnelType[key]" :value="key">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="附件材料" prop="material">
            <el-upload :class="formData.material.length >= 5 ? 'hide' : ''" action="https://upload-z2.qiniup.com" :data="{token: qiniuToken.token}"
                       accept=".jpg,.png" :multiple="true" :limit="5" :file-list="materialList" list-type="picture-card" :on-success="handleMaterial"
                       :on-exceed="handleExceed" :on-preview="handlePictureCardPreview" :on-remove="handleRemoveMaterial" :on-error="handleError">
              <i class="el-icon-plus"></i>
            </el-upload>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item>
            <div class="txt" v-if="formData.manType == '返乡创业农民工'">返乡创业农民工：通过“贷款人员系统”要求返乡创业农民工，上传本人户口本图片（户口本首页和本人信息页）、近三年的福州市外《居住证》或《社保缴费证明》或《个人所得税证明》用以确认资质。
            </div>
            <div class="txt" v-else-if="formData.manType == '网络商户'">第三方网络平台可显示本人身份信息的页面截图和6个月内的网络交易流水记录确认资质</div>
            <div class="txt" v-else-if="formData.manType == '农村自主创业农民'">农村自主创业农民：通过“贷款人员系统”要求返乡创业农民工，上传本人户口本图片（户口本首页和本人信息页）确认资质。</div>
            <div class="txt" v-else-if="formData.manType == '在闽就业创业的台湾同胞'">在闽就业创业的台湾同胞：通过“贷款人员系统”要求台湾同胞上传《台湾居民来往大陆通行证》或《台湾居民居住证》确认资质。</div>
            <div class="txt" v-else>上传相应附件证明，文件格式为jpg|png格式</div>
          </el-form-item>
        </el-col>

      </el-form>
    </el-row>
    <div class="footer-section">
      <el-button @click="handleSave" type="primary" :loading="loading">提交</el-button>
    </div>
    <el-dialog v-model="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
import { ElForm } from 'element-plus'
import { mapActions, mapGetters } from 'vuex'
import { personnelType, companyType, bankList } from '@/dictionary/index'
import { isPhoneNumber } from '@/utils/validate'
import { systemDeptList, systemTreeList, qiNiuYunToken } from '@/api/common'
import { addPerson, personDetail, editPerson } from '@/api/loan'
import MessageBox from 'element-plus/lib/el-message-box'
import Message from 'element-plus/lib/el-message'

interface CallBackType {
  (errorMessage?: Error | string): void
}
interface ValidatorType {
  (rule: Array<string>, value: string, callback: CallBackType): void
}
interface FileType {
  uid: string
  url: string
}
interface FormPropType {
  name: string
  kind: number
  sex: string
  idCard: string
  certType: string
  areaName: string
  manType: string
  idCardFront: string[]
  idCardBack: string[]
  material: Array<FileType>
  householdName: string[]
  businessNature: string
  areaCode: Array<string | number>
  household: string
  businessArea: Array<string | number>
  businessAreaName: Array<string>
  curHouse: string
  bank: string
  status?: number
  amount: number
  id?: string | number
}

export default defineComponent({
  setup() {
    const applyForm = ref<InstanceType<typeof ElForm>>()
    const formData: FormPropType = reactive({
      name: '',
      kind: 1,
      sex: '',
      idCard: '',
      certType: '居民身份证',
      areaName: '',
      manType: '',
      idCardFront: [],
      idCardBack: [],
      material: [],
      householdName: [],
      businessNature: '',
      areaCode: [],
      household: '',
      businessArea: [],
      businessAreaName: [],
      curHouse: '',
      bank: '',
      amount: 0
    })
    const handleValidate = () => {
      applyForm.value?.validate((valid) => {
        if (valid) {
          if (
            [
              '网络商户',
              '农村自主创业农民',
              '在闽就业创业的台湾同胞',
              '返乡创业农民工'
            ].includes(formData.manType) &&
            !formData.material.length
          ) {
            MessageBox.alert('当前借款人身份类别必须上传附件材料', '提示', {
              type: 'warning'
            })
            return false
          }
        }
      })
    }
    return {
      formData,
      handleValidate
    }
  },
  data() {
    const checkMobile: ValidatorType = (rule, value, callback) => {
      if (isPhoneNumber(value)) {
        callback()
      } else {
        callback(new Error('请输入正确手机号'))
      }
    }
    return {
      personnelType,
      companyType,
      bankList,
      formStyle: 'width: 250px',
      loading: false,
      showMaterial: false,
      dialogVisible: false,
      dialogImageUrl: '',
      areaList: [] as Array<{ deptId: number; deptName: string }>,
      areaTreeList: [],
      cascaderProps: {
        expandTrigger: 'hover',
        value: 'id'
      },
      // formData: {
      //   name: '',
      //   kind: 1,
      //   sex: '',
      //   idCard: '',
      //   certType: '居民身份证',
      //   areaName: '',
      //   idCardFront: [] as string[],
      //   idCardBack: [] as string[],
      //   material: [] as Record<string, unknown>[],
      //   householdName: [] as string[]
      // },
      idCardFrontList: [] as Record<string, unknown>[],
      idCardBackList: [] as Record<string, unknown>[],
      materialList: [] as string[],
      rules: {
        name: [{ required: true, message: '请输入', trigger: 'blur' }],
        sex: [{ required: true, message: '请输入', trigger: 'blur' }],
        certType: [{ required: true, message: '请输入', trigger: 'blur' }],
        idCard: [{ required: true, message: '请输入', trigger: 'blur' }],
        amount: [{ required: true, message: '请输入', trigger: 'change' }],
        bank: [{ required: true, message: '请输入', trigger: 'change' }],
        mobile: [
          { required: true, message: '请输入', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ],
        household: [{ required: true, message: '请选择', trigger: 'change' }],
        areaCode: [{ required: true, message: '请输入', trigger: 'change' }],
        curHouse: [{ required: true, message: '请输入', trigger: 'blur' }],
        idCardFront: [{ required: true, message: '请输入', trigger: 'blur' }],
        idCardBack: [{ required: true, message: '请输入', trigger: 'blur' }],
        manType: [{ required: true, message: '请输入', trigger: 'change' }]
        // material: [{ required: true, message: '请输入', trigger: 'blur' }],
      },
      uploadData: {
        token: ''
      },
      id: ''
    }
  },
  computed: {
    ...mapGetters('user', ['userInfo', 'qiniuToken'])
  },
  created() {
    this.id = this.$route.query.id as string
    this.formData.name = this.userInfo.userName
    const idCard = this.userInfo.remark
    this.formData.idCard = idCard
    const gender = idCard.slice(idCard.length - 2, idCard.length - 1)
    this.formData.sex = gender % 2 === 0 ? '女' : '男'
    // this.handleQiniuToken()
    // this.handleLoadData()
  },
  methods: {
    ...mapActions('user', ['setQiniuToken']),
    handleLoadData() {
      if (this.id) {
        const params = {
          id: this.id
        }
        personDetail(params).then((res) => {
          const otherInfo = JSON.parse(res.data.otherInfo)
          const city = parseInt(res.data.areaCode.substring(0, 4) + '00')
          const area = parseInt(res.data.areaCode)
          this.idCardFrontList = [{ url: otherInfo.idCardFront }]
          this.idCardBackList = [{ url: otherInfo.idCardBack }]
          this.materialList = otherInfo.material.map((item: string) => {
            return {
              url: item
            }
          })
          this.formData = {
            ...this.formData,
            ...res.data,
            areaCode: [city, area],
            household: otherInfo.household, // 户籍所在地
            curHouse: otherInfo.curHouse, // 现居地
            businessArea: otherInfo.businessArea, // 创业所在地
            businessNature: otherInfo.businessNature, // 经营性质
            amount: res.data.amount / 1000000, // 融资金额
            bank: otherInfo.bank, // 意向银行
            idCardFront: otherInfo.idCardFront, // 身份证人像面
            idCardBack: otherInfo.idCardBack, // 身份证国徽面
            material: ([] as string[]).concat(this.materialList) // 材料
          }
        })
      }

      // 获取地区
      systemDeptList().then((res) => {
        this.areaList = res.data
      })
      // 获取树形地区
      systemTreeList().then((res) => {
        this.areaTreeList = res.data[0].children
      })
    },

    // 获取七牛token
    handleQiniuToken() {
      qiNiuYunToken().then((res) => {
        this.setQiniuToken(res)
      })
    },

    // 提交信息
    handleSave() {
      ;(this.$refs.form as typeof ElForm).validate((valid: boolean) => {
        if (valid) {
          if (
            [
              '网络商户',
              '农村自主创业农民',
              '在闽就业创业的台湾同胞',
              '返乡创业农民工'
            ].includes(this.formData.manType) &&
            !this.formData.material.length
          ) {
            MessageBox.alert('当前借款人身份类别必须上传附件材料', '提示', {
              type: 'warning'
            })
            return false
          }
          MessageBox.confirm(
            '本人郑重承诺以上信息均为真实有效，如有虚假，本人愿承担一切法律责任。',
            '承诺书',
            {
              type: 'warning',
              confirmButtonText: '确认并提交',
              cancelButtonText: '我再改改'
            }
          ).then(async () => {
            this.loading = true
            const material = this.formData.material.map((item) => {
              return item.url
            })
            const otherInfo = {
              areaCode: this.formData.areaCode,
              areaName: this.formData.areaName,
              household: this.formData.household, // 户籍所在地
              householdName: this.formData.householdName,
              businessArea: this.formData.businessArea,
              businessAreaName: this.formData.businessAreaName,
              businessNature: this.formData.businessNature,
              curHouse: this.formData.curHouse,
              bank: this.formData.bank,
              idCardFront: this.formData.idCardFront,
              idCardBack: this.formData.idCardBack,
              material
            }
            const params = {
              ...this.formData,
              status: this.formData.status === -2 ? 2 : 1,
              amount: this.formData.amount * 1000000,
              areaCode: this.formData.areaCode[1],
              otherInfo: JSON.stringify(otherInfo)
            }
            if (this.formData.id) {
              editPerson(params)
                .then((res) => {
                  this.loading = false
                  Message.success(res.msg)
                  this.$emit('success', res.data)
                })
                .catch(() => {
                  this.loading = false
                })
            } else {
              addPerson(params)
                .then((res) => {
                  this.loading = false
                  Message.success(res.msg)
                  this.$emit('success', res.data)
                })
                .catch(() => {
                  this.loading = false
                })
            }
          })
        } else {
          MessageBox.alert('信息未填写完整!', '信息缺失提示', {
            type: 'error'
          })
        }
      })
    },

    // 身份证人像面文件上传成功
    handleFront(res: Record<string, unknown>) {
      this.formData.idCardFront = [
        'http://' + this.qiniuToken.domain + res.key
      ] as string[]
    },
    // 身份证国徽面文件上传成功
    handleBack(res: Record<string, unknown>) {
      this.formData.idCardBack = ['http://' + this.qiniuToken.domain + res.key]
    },
    // 资料证明文件上传成功
    handleMaterial(
      res: Record<string, unknown>,
      file: FileType
    ) {
      this.formData.material.push({
        uid: file.uid,
        url: 'http://' + this.qiniuToken.domain + res.key
      })
    },

    // 文件超出限制
    handleExceed() {
      MessageBox.alert('图片数量超出限制，请先删除上一张图片再操作', '提示', {
        type: 'warning'
      })
    },

    // 上传错误
    handleError(err: string) {
      MessageBox.alert('图片上传失败，请重新操作' + err, '错误提示', {
        type: 'error',
        callback: () => {
          this.handleQiniuToken()
        }
      })
    },

    // 户籍所在地变化
    handleChangeHouse(value: string[]) {
      // let province = ''
      let city = ''
      let area = ''
      this.areaList.map((item: Record<string, any>) => {
        // if(value[0] == item.deptId) {
        //   province = item.deptName
        // }
        if (value[0] === item.deptId) {
          city = item.deptName
        }
        if (value[1] === item.deptId) {
          area = item.deptName
        }
        return item
      })
      this.formData.householdName = [city, area]
    },

    // 所属地区变化
    handleChangeArea(value: Array<number>) {
      let city = ''
      let area = ''
      this.areaList.map((item) => {
        if (value[0] === item.deptId) {
          city = item.deptName
        }
        if (value[1] === item.deptId) {
          area = item.deptName
        }
        return item
      })
      this.formData.areaName = city + '/' + area
    },

    // 创业所在地变化
    handleBusinessArea(value: Array<number>) {
      let city = ''
      let area = ''
      this.areaList.map((item) => {
        if (value[0] === item.deptId) {
          city = item.deptName
        }
        if (value[1] === item.deptId) {
          area = item.deptName
        }
        return item
      })
      this.formData.businessAreaName = [city, area]
    },

    // 删除身份证人像面
    handleRemoveFront() {
      this.formData.idCardFront = []
    },

    // 删除身份证国徽面
    handleRemoveBack() {
      this.formData.idCardBack = []
    },

    // 删除证明材料
    handleRemoveMaterial(file: FileType) {
      const temp = this.formData.material.map((item) => {
        if (item.uid === file.uid) {
          return null
        }
        return item
      })
      this.formData.material = temp.filter((item) => item) as FileType[]
    },

    handlePictureCardPreview(file: FileType) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    }
  }
})
</script>

<style lang="scss">
.loan-personal-wrapper {
  .wait-tip {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    .icon {
      margin-right: 10px;
      font-size: 24px;
      color: #409eff;
    }
    font-size: 18px;
    font-weight: bold;
    color: #666;
  }
  .hide {
    .el-upload--picture-card {
      display: none;
    }
  }
}
</style>