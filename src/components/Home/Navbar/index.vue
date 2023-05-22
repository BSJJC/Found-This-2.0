<template>
  <div
    class="h-[100px] grid grid-cols-5 px-10 shadow-lg shadow-[#7e56da4d] bg-white"
  >
    <div class="col-span-1 flex justify-left items-center">
      <Logo :enable-go-to-home-page="false"></Logo>
    </div>

    <div class="col-span-3 flex justify-center items-center">
      <search></search>
    </div>

    <div class="col-span-1 flex justify-end items-center">
      <!-- <user-icon></user-icon> -->
    </div>
  </div>
</template>

<script lang="ts" setup>
import Logo from "@/components/Common/Logo.vue";
import Search from "./components/Search/index.vue";

// const UserIcon = defineAsyncComponent(
//   () => import("@/components/Navbar/UserIcon.vue")
// );
</script>
