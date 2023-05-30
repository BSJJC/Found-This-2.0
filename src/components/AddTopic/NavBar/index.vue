<template>
  <div class="h-[100px] grid grid-cols-5 px-10 shadow-lg shadow-[#7e56da4d] bg-white">
    <div class="col-span-1 flex justify-left items-center">
      <Logo :enable-go-to-home-page="false" class="text-4xl"></Logo>
    </div>

    <div class="col-span-3 flex justify-center items-center">
      <TitleInput></TitleInput>
    </div>

    <div class="col-span-1 flex justify-end items-center">
      <Submit></Submit>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Logo from "@/components/Common/Logo.vue";
import TitleInput from "./components/TitleInput.vue";
import Submit from "./components/Submit.vue"
</script>
