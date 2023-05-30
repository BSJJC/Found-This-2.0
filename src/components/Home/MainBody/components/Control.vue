<template>
  <div class="w-full h-[120px] grid grid-cols-4 mx-8">
    <!-- topic sort ways -->
    <div class="col-span-3 flex justify-start items-start">
      <div v-for="(i, index) in sortWays" :key="index"
        class="h-full w-[200px] text-xl flex justify-start items-center text-gray-400 transition duration-200 ease-in-out hover:text-[#7E56DA] hover:cursor-pointer hover:font-bold">
        {{ i }}
      </div>
    </div>

    <!-- add topic button -->
    <div class="col-span-1 flex justify-end items-center">
      <div v-if="!showTransform" ref="addTopicBtnRef"
        class="px-8 py-5 rounded-lg bg-[#7E56DA] text-white text-xl transition duration-200 cursor-pointer hover:shadow-[#7E56DA] hover:shadow-lg hover:scale-105 active:scale-100"
        @click="transform">
        ADD NEW TOPIC
      </div>

      <template v-if="showTransform">
        <Trasnform :randomIDs="randomIDs" :states="states" :detailChanges="detailChanges">
          <template #origin>
            <div :id="randomIDs[0]"
              class="px-8 py-5 bg-[#7E56DA] text-white text-xl transition-all duration-500 cursor-pointer hover:shadow-[#7E56DA] z-[100] flex justify-center items-center">
              ADD NEW TOPIC
            </div>
          </template>
        </Trasnform>
      </template>
    </div>
  </div>
</template>
  
<script setup lang='ts'>
import { ref, Ref, defineAsyncComponent } from "vue"
import { Router, useRouter } from "vue-router";

const Trasnform = defineAsyncComponent(() => import("@/components/Common/Transform.vue"))

const router: Router = useRouter();
const addTopicBtnRef: Ref<HTMLElement | undefined> = ref()
const sortWays: Ref<Array<string>> = ref(["POPULAR", "CATEGORIES"]);

const showTransform: Ref<boolean> = ref(false)
const randomIDs: string[] = [Math.random().toString(), Math.random().toString()]
const states = ref({
  startWidth: 0,
  startHeight: 0,
  startTop: 0,
  startLeft: 0,
  endWidth: 0,
  endHeight: 0
})
const detailChanges = [{
  prop: "fontSize",
  targetVal: "5rem"
}]

function transform() {
  const rect: DOMRect = addTopicBtnRef.value!.getBoundingClientRect();

  const { width, height, top, left } = rect;

  states.value.startWidth = width
  states.value.startHeight = height
  states.value.startTop = top
  states.value.startLeft = left

  states.value.endWidth = 100
  states.value.endHeight = 100

  showTransform.value = true

  setTimeout(() => {
    router.push("addTopic")
  }, 500);
}
</script>
  
<style lang="scss" scoped>
* {
  user-select: none;
  -webkit-user-select: none;
}
</style>