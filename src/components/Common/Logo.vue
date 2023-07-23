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
  <div class="h-full flex justify-center items-center select-none drop-shadow-lg" @click="goToHomePage">
    <div class="text-[#7E56DA] font-bold uppercase">beyond the horizon</div>
  </div>
</template>

<style lang="scss" scoped>
* {
  cursor: pointer;
}
</style>
