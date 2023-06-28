<template>
  <div class="flex justify-center items-center w-[700px] h-[50px] rounded-3xl border shadow-md px-10 bg-white">
    <input v-model="title" class="w-full outline-none text-xl text-[#7E56DA]" placeholder="Topic Title" />
  </div>
</template>

<script lang="ts" setup>
import { useNewTopicInfo } from "@/stores/useNewTopicInfo"
import { storeToRefs } from "pinia";

const { title } = storeToRefs(useNewTopicInfo())
</script>