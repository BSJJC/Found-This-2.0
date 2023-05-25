<template>
  <div class=" flex justify-center items-center flex-col  w-full h-full bg-white">
    <div class="text-3xl w-[400px] h-[40px] text-[#7E56DA]">Welcome back!</div>

    <!-- log in info input  -->
    <el-form class="w-[400px] mt-5" ref="ruleFormRef" :model="ruleForm" :rules="rules">
      <div>Email:</div>

      <el-form-item prop="email">
        <el-input v-model="ruleForm.email" type="text" placeholder="Enter your email" class="text-[#7E56DA]"
          @input="ruleForm.email = disableInputSpace(ruleForm.email)" />
      </el-form-item>

      <div>Password:</div>

      <el-form-item prop="password">
        <el-input v-model="ruleForm.password" type="password" placeholder="Enter your password" class="text-[#7E56DA]"
          @input="ruleForm.password = disableInputSpace(ruleForm.password)" />
      </el-form-item>

      <el-form-item>
        <div class="w-full flex justify-between items-center text-lg my-3">
          <div class="cursor-pointer h-full flex justify-center items-center flex-row">
            <el-checkbox></el-checkbox>
            <div class="ml-3 select-none transition duration-300" :style="{ color: `${true ? '#7E56DA' : '#999'}` }">
              Remember account
            </div>
          </div>

          <a href="#" class="transition duration-300 text-[#7E56DA] hover:text-[#a07bf7]">Forget password?</a>
        </div>
      </el-form-item>
    </el-form>

    <!-- log in button -->
    <button
      class="w-[400px] h-[45px] bg-[#7E56DA] text-white text-xl rounded-lg transition duration-200 hover:bg-[#a07bf7]">
      Log in!
    </button>

    <!-- to sign up area -->
    <div class=" w-1/2 h-[45px] flex justify-center items-center opacity-50">
      Don't have an account?
      <a class="text-[#7E56DA] hover:text-[#a07bf7] cursor-pointer" @click="toSignUpPage">Sign up!</a>
    </div>

  </div>
</template>
  
<script setup lang='ts'>
import { ref, reactive } from 'vue';
//@ts-ignore
import type { FormInstance, FormRules } from "element-plus";
import disableInputSpace from '@/utils/disableInputSpace';

const emits = defineEmits(['switchState']);

const ruleFormRef = ref<FormInstance>();

const ruleForm = reactive({
  email: "123@123.com",
  password: "123",
});

//@ts-ignore
const emailCheck = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("Please input the email"));
  }

  const reg = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  if (!reg.test(ruleForm.email)) {
    callback(new Error("Please input the right email"));
  }

  if (ruleForm.email !== "") {
    if (!ruleFormRef.value) return;
  }

  callback();
};
//@ts-ignore
const passwordCheck = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("Please input the password"));
  } else {
    if (ruleForm.password !== "") {
      if (!ruleFormRef.value) return;
    }
    callback();
  }
};

const rules = reactive<FormRules>({
  email: [{ validator: emailCheck, trigger: "blur" }],
  password: [{ validator: passwordCheck, trigger: "blur" }],
});

/**
 * 转到注册页面
 */
function toSignUpPage() {
  emits("switchState")
}
</script>
  
<style lang="scss" scoped>
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