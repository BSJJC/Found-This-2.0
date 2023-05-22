<script lang="ts" setup>
import { useRouter } from "vue-router";

interface config {
  enableGoToHomePage: boolean;
}

const props = defineProps<config>();
const router = useRouter();

function goToHomePage() {
  if (props.enableGoToHomePage) {
    router.push("/");
  }
}
</script>

<template>
  <div
    class="h-full flex justify-center items-center select-none drop-shadow-lg"
    @click="goToHomePage"
  >
    <div class="text-[#7e56da81]">Found</div>
    <div class="text-[#7E56DA] font-bold mx-2">this</div>
    <div class="text-[#7e56da81]">!</div>
  </div>
</template>

<style lang="scss" scoped>
* {
  cursor: pointer;
}
</style>
