<template>
  <div class=" flex justify-center items-center flex-col w-full h-full bg-white">
    <div class="text-3xl w-[400px] h-[40px] text-[#7E56DA] font-bold">Welcome! New friend!</div>

    <el-form class="w-[400px] mt-5" ref="ruleFormRef" :model="ruleForm" :rules="rules">
      <div>Email:</div>

      <el-form-item prop="email">
        <el-input v-model="ruleForm.email" type="text" placeholder="Enter your email" class="text-[#7E56DA]"
          @input="ruleForm.email = disableInputSpaceByRule(ruleForm.email, 0)" />
      </el-form-item>

      <div class="text-lg">User name:</div>

      <el-form-item prop="userName">
        <el-input v-model="ruleForm.userName" type="text" placeholder="Enter your user name" class="text-[#7E56DA]"
          @input="ruleForm.userName = disableInputSpaceByRule(ruleForm.userName, 1)" />
      </el-form-item>

      <div>Password:</div>

      <el-form-item prop="password">
        <el-input v-model="ruleForm.password" type="password" placeholder="Enter your password" class="text-[#7E56DA]"
          @input="ruleForm.password = disableInputSpaceByRule(ruleForm.password, 0)" />
      </el-form-item>

      <div>Confirm Password:</div>

      <el-form-item prop="confirmPassword">
        <el-input v-model="ruleForm.confirmPassword" type="password" placeholder="Enter your password again"
          class="text-[#7E56DA]"
          @input="ruleForm.confirmPassword = disableInputSpaceByRule(ruleForm.confirmPassword, 0)" />
      </el-form-item>
    </el-form>

    <button
      class="w-[400px] h-[45px] bg-[#7E56DA] text-white text-xl rounded-lg transition duration-200 my-3 hover:bg-[#a07bf7]"
      @click="submitSignUp(ruleFormRef)">
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
import { ref, Ref } from "vue";
import { storeToRefs } from "pinia"
import { AxiosResponse } from 'axios';
//@ts-ignore
import type { FormInstance, FormRules } from "element-plus";
import disableInputSpaceByRule from "@/utils/disableInputSpaceByRule";
import block from "@/utils/block";

import userSignUp from "@/api/User/userSignUp";

import userLogAndSign from '@/stores/useLogAndSign';
import { RequestingSentences, RequestStates } from "@/types/LogAndSign"
import useTrasnform from '@/stores/useTrasnform';
import { TransformStates } from "@/types/Transform"

const emits = defineEmits(["switchState"])
const { RequestState, RequestingSentence } = storeToRefs(userLogAndSign())

const ruleFormRef = ref<FormInstance>();
const ruleForm: Ref<{
  email: string;
  userName: string;
  password: string;
  confirmPassword: string;
}> = ref({
  email: "",
  userName: "",
  password: "",
  confirmPassword: "",
});

function emailCheck(_rule: any, value: any, callback: any) {
  if (value === "") {
    callback(new Error("Please input the email"));
  }

  const reg = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  if (!reg.test(ruleForm.value.email)) {
    callback(new Error("Please input the right email"));
  }

  callback();
}
function userNameCheck(_rule: any, value: any, callback: any) {
  if (value === "") {
    callback(new Error("Please input your user name"));
  }

  callback();
}
function passwordCheck(_rule: any, value: any, callback: any) {
  if (value === "") {
    callback(new Error("Please input the password"));
  }

  if (!ruleFormRef.value) return;

  callback();
}
function confirmPasswordCheck(_rule: any, value: any, callback: any) {
  if (value === "") {
    callback(new Error("Please input password again to confirm"));
  }

  if (ruleForm.value.confirmPassword !== ruleForm.value.password) {
    callback(new Error("The two entered passwords do not match"));
  }

  if (!ruleFormRef.value) return;

  callback();
}

const rules: Ref<FormRules> = ref<FormRules>({
  email: [{ validator: emailCheck, trigger: "blur" }],
  userName: [{ validator: userNameCheck, trigger: "blur" }],
  password: [{ validator: passwordCheck, trigger: "blur" }],
  confirmPassword: [{ validator: confirmPasswordCheck, trigger: "blur" }],
});

async function submitSignUp(formEl: FormInstance | undefined): Promise<void> {
  if (!formEl) return;

  // 验证表单
  await formEl.validate((valid: any) => {
    if (!valid) {
      throw new Error("Form validation failed.")
    }
  });

  // 尝试注册
  try {
    RequestState.value = RequestStates.Fulfilled

    await block(1000);

    const user: AxiosResponse<any, any> = await userSignUp({
      email: ruleForm.value.email.trim(),
      userName: ruleForm.value.userName.trim(),
      password: ruleForm.value.password.trim(),
    });

    if (user) {
      RequestState.value = RequestStates.Success
      RequestingSentence.value = RequestingSentences['Success!']
    }

    await block(1500);

    const { transformSwitch } = storeToRefs(useTrasnform())
    transformSwitch.value = TransformStates.off
    RequestState.value = RequestStates.Pending

    return;
  } catch (error) {
    console.log(error);
    RequestState.value = RequestStates.Failed
    RequestingSentence.value = RequestingSentences['Failed....']

    return;
  }
}

/**
 * 转到登陆页面
 */
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