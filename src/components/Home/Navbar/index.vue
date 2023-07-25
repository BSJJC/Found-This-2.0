<template>
  <div class="flex justify-between items-center px-[5%]  bg-white">

    <Logo :enable-go-to-home-page="false" class="text-4xl"></Logo>

    <!-- TODO -->

    <user-icon></user-icon>
  </div>
</template>

<script lang="ts" setup>
import Logo from "@/components/Common/Logo.vue";
import UserIcon from "./components/UserIcon/index.vue"
</script>
