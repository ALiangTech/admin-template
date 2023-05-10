<template>
  <el-form ref="formRef" v-model="form" :rules="rules">
    <el-form-item prop="email">
      <el-input v-model="form.email" placeholder="Email" :suffix-icon="User" />
    </el-form-item>
    <el-form-item prop="password">
      <el-input v-model="form.password" type="password" :suffix-icon="Lock" />
    </el-form-item>
    <el-form-item>
      <div>忘记密码</div>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" style="width: 100%" @click="submitForm(formRef)"
        >立即登录</el-button
      >
    </el-form-item>
  </el-form>
</template>
<script setup lang="ts">
import { reactive, ref } from "vue";
import { User, Lock } from "@element-plus/icons-vue";
import type { FormRules, FormInstance } from "element-plus";
interface Form {
  email: string;
  password: string;
}
const formRef = ref<FormInstance>();
const form = reactive<Form>({
  email: "",
  password: "",
});
const rules = ref<FormRules>({
  email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
});
// 提交
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      console.log("submit!");
    } else {
      console.log("error submit!");
      return false;
    }
  });
};
</script>
