<template>
  <div class=" flex justify-center items-center flex-col w-full h-full bg-white">
    <div class="text-3xl w-[400px] h-[40px] text-[#7E56DA]">Welcome! New friend!</div>

    <el-form class="w-[400px] mt-5" ref="ruleFormRef" :model="ruleForm" :rules="rules">
      <div>Email:</div>

      <el-form-item prop="email">
        <el-input v-model="ruleForm.email" type="text" placeholder="Enter your email" class="text-[#7E56DA]"
          @input="ruleForm.email = disableInputSpace(ruleForm.email)" />
      </el-form-item>

      <div class="text-lg">User name:</div>

      <el-form-item prop="userName">
        <el-input v-model="ruleForm.userName" type="text" placeholder="Enter your user name" class="text-[#7E56DA]"
          @input="ruleForm.email = disableInputSpace(ruleForm.email)" />
      </el-form-item>

      <div>Password:</div>

      <el-form-item prop="password">
        <el-input v-model="ruleForm.password" type="password" placeholder="Enter your password" class="text-[#7E56DA]"
          @input="ruleForm.password = disableInputSpace(ruleForm.password)" />
      </el-form-item>

      <div>Confirm Password:</div>

      <el-form-item prop="confirmPassword">
        <el-input v-model="ruleForm.confirmPassword" type="password" placeholder="Enter your password again"
          class="text-[#7E56DA]" @input="ruleForm.confirmPassword = disableInputSpace(ruleForm.confirmPassword)" />
      </el-form-item>
    </el-form>

    <button
      class="w-[400px] h-[45px] bg-[#7E56DA] text-white text-xl rounded-lg transition duration-200 my-3 hover:bg-[#a07bf7]">
      Sign up!
    </button>

    <div class="w-1/2 h-[45px] flex justify-center items-center opacity-50">
      Already have an account?
      <a href="#" class="text-[#7E56DA] hover:text-[#a07bf7]" @click="toLogInPage">
        Log in!</a>
    </div>
  </div>
</template>
  
<script setup lang='ts'>
import { ref, reactive } from "vue";
//@ts-ignore
import type { FormInstance, FormRules } from "element-plus";
import disableInputSpace from "@/utils/disableInputSpace";

const emits = defineEmits(["switchState"])

const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive({
  email: "",
  userName: "",
  password: "",
  confirmPassword: "",
});

//@ts-ignore
function emailCheck(rule: any, value: any, callback: any) {
  if (value === "") {
    callback(new Error("Please input the email"));
  }

  const reg = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  if (!reg.test(ruleForm.email)) {
    callback(new Error("Please input the right email"));
  }

  callback();
}
//@ts-ignore
function userNameCheck(rule: any, value: any, callback: any) {
  if (value === "") {
    callback(new Error("Please input your user name"));
  }

  callback();
}
//@ts-ignore
function passwordCheck(rule: any, value: any, callback: any) {
  if (value === "") {
    callback(new Error("Please input the password"));
  }

  if (!ruleFormRef.value) return;

  callback();
}
//@ts-ignore
function confirmPasswordCheck(rule: any, value: any, callback: any) {
  if (value === "") {
    callback(new Error("Please input password again to confirm"));
  }

  if (ruleForm.confirmPassword !== ruleForm.password) {
    callback(new Error("The two entered passwords do not match"));
  }

  if (!ruleFormRef.value) return;

  callback();
}

const rules = reactive<FormRules>({
  email: [{ validator: emailCheck, trigger: "blur" }],
  userName: [{ validator: userNameCheck, trigger: "blur" }],
  password: [{ validator: passwordCheck, trigger: "blur" }],
  confirmPassword: [{ validator: confirmPasswordCheck, trigger: "blur" }],
});

function toLogInPage(): void {
  emits("switchState")
}
</script>
  
<style lang="scss" scoped>
input {
  height: 50px;
  width: 100%;
  margin-top: 10px;
  text-indent: 10px;
  border: 1px solid rgb(208, 208, 208);
  border-radius: 8px;
  font-size: large;
  outline: none;
}

.el-input {
  all: unset;
  height: 40px;
  width: 100%;
  margin-top: 10px;
  text-indent: 10px;
  border: 1px solid rgb(208, 208, 208);
  border-radius: 10px;
  font-size: large;
  outline: none;
}

:deep(.el-input__wrapper) {
  all: unset;
  display: block;
  height: 100%;
  width: 100%;
  padding: 0;
  border-radius: 8px;
  box-shadow: none !important;
}

:deep(.el-input__inner) {
  all: unset;
  display: block;
  width: 95%;
  height: 100%;
  padding-right: 10px;
  color: #7e56da;
}

:deep(.el-form-item__error) {
  font-size: 1rem;
  color: #da5684;
}
</style>