<template>
  <div class=" flex justify-center items-center flex-col  w-full h-full bg-white">
    <div class="text-3xl w-[400px] h-[40px] text-[#7E56DA] font-bold">Welcome back!</div>
    <!-- log in info input  -->
    <el-form class="w-[400px] mt-5" ref="ruleFormRef" :model="ruleForm" :rules="rules">
      <div>Email:</div>

      <el-form-item prop="email">
        <el-input v-model="ruleForm.email" type="text" placeholder="Enter your email" class="text-[#7E56DA]"
          @input="ruleForm.email = disableInputSpaceByRuleByRule(ruleForm.email, 0)"
          @keydown.enter="submitLogIn(ruleFormRef)" />
      </el-form-item>

      <div>Password:</div>

      <el-form-item prop="password">
        <el-input v-model="ruleForm.password" type="password" placeholder="Enter your password" class="text-[#7E56DA]"
          @input="ruleForm.password = disableInputSpaceByRuleByRule(ruleForm.password, 0)"
          @keydown.enter="submitLogIn(ruleFormRef)" />
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

    <!-- submit  button -->
    <button
      class="w-[400px] h-[45px] bg-[#7E56DA] text-white text-xl rounded-lg transition duration-200 hover:bg-[#a07bf7]"
      @click="submitLogIn(ruleFormRef)">
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
import { ref, Ref } from 'vue';
import { storeToRefs } from 'pinia';
import { AxiosResponse } from 'axios';
//@ts-ignore
import type { FormInstance, FormRules } from "element-plus";
import disableInputSpaceByRuleByRule from "@/utils/disableInputSpaceByRule"
import block from '@/utils/block';

import userLogIn from "@/api/User/userLogIn.js"

import userLogAndSign from '@/stores/useLogAndSign';
import { RequestingSentences, RequestStates } from "@/types/LogAndSign"
import useTrasnform from '@/stores/useTrasnform';
import { TransformStates } from "@/types/Transform"

const emits = defineEmits(["switchState"]);

const { RequestState, RequestingSentence } = storeToRefs(userLogAndSign())

const ruleFormRef: Ref<FormInstance> = ref<FormInstance>()

const ruleForm: Ref<{ email: string; password: string; }> = ref({
  email: "123@123.com",
  password: "123",
});

function emailCheck(_rule: any, value: any, callback: any): void {
  if (value === "") {
    callback(new Error("Please input the email"));
  }

  const reg = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  if (!reg.test(ruleForm.value.email)) {
    callback(new Error("Please input the right email"));
  }

  if (ruleForm.value.email !== "") {
    if (!ruleFormRef.value) return;
  }

  callback();
};
function passwordCheck(_rule: any, value: any, callback: any): void {
  if (value === "") {
    callback(new Error("Please input the password"));
  } else {
    if (ruleForm.value.password !== "") {
      if (!ruleFormRef.value) return;
    }
    callback();
  }
};

const rules: Ref<FormRules> = ref<FormRules>({
  email: [{ validator: emailCheck, trigger: "blur" }],
  password: [{ validator: passwordCheck, trigger: "blur" }],
});

/**
 * 提交表单
 * @param formEl 表单div
 */
async function submitLogIn(formEl: FormInstance | undefined): Promise<void> {
  if (!formEl) return;

  // 验证表单
  await formEl.validate((valid: any) => {
    if (!valid) {
      throw new Error("Form validation failed.");
    }
  });

  // 尝试登录
  try {
    RequestState.value = RequestStates.Fulfilled

    await block(1000);

    const user: AxiosResponse<any, any> = await userLogIn({
      email: ruleForm.value.email.trim(),
      password: ruleForm.value.password.trim(),
    });

    if (user) {
      RequestState.value = RequestStates.Success
      RequestingSentence.value = RequestingSentences['Success!']

      sessionStorage.setItem("userInfo", JSON.stringify(user.data))
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