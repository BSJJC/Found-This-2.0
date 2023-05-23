<template>
  <div ref="op" v-show="!showTransform"
    class="flex justify-center items-center flex-row w-[700px] h-[50px] rounded-3xl border shadow-md bg-white">
    <!-- search input -->
    <div class="w-[calc(100%-100px)] flex justify-center items-center rounded-l-3xl">
      <input class="w-5/6 outline-none text-xl text-[#7E56DA]" placeholder="I want..." />
    </div>

    <!-- search buttton -->
    <div
      class="w-[50px] h-[40px] rounded-3xl bg-[#7E56DA] shadow shadow-[#9375da] flex justify-center items-center cursor-pointer"
      @click="showLogAndSign">
      <IconSearch class="w-1/2" color="white"></IconSearch>
    </div>


    <template v-if="showTransform">
      <TransformZoomIn @hide="hidedTransformZoomIn" :randomIDs="randomIDs" :states="states" :detailChanges="[]">
        <template #origin>
          <div :id="randomIDs[0]"
            class="flex justify-center items-center flex-row w-[700px] h-[50px] rounded-3xl border shadow-md bg-white z-[100] transition-all duration-500 ease-in-out absolute">
            <div class="w-[calc(100%-100px)] flex justify-center items-center rounded-l-3xl">
              <input class="w-5/6 outline-none text-xl text-[#7E56DA]" placeholder="I want..." />
            </div>

            <div
              class="w-[50px] h-[40px] rounded-3xl bg-[#7E56DA] shadow shadow-[#9375da] flex justify-center items-center cursor-pointer">
              <IconSearch class="w-1/2" color="white"></IconSearch>
            </div>
          </div>
        </template>

        <template #target>
          <div :id="randomIDs[1]"
            class="flex justify-center items-center flex-row w-[90vw] h-[10vh] rounded-3xl border shadow-md bg-white z-[100] transition-all duration-500 ease-in-out absolute">
            <div class="w-[calc(100%-100px)] flex justify-center items-center rounded-l-3xl">
              <input class="w-5/6 outline-none text-xl text-[#7E56DA]" placeholder="I want..." />
            </div>

            <div
              class="w-[50px] h-[40px] rounded-3xl bg-[#7E56DA] shadow shadow-[#9375da] flex justify-center items-center cursor-pointer">
              <IconSearch class="w-1/2" color="white"></IconSearch>
            </div>
          </div>
        </template>

      </TransformZoomIn>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { ref, Ref } from "vue";
import IconSearch from "@/assets/icons/IconSearch.vue";
import TransformZoomIn from "@/components/Common/TransformZoomIn.vue";

const op: Ref<HTMLElement | undefined> = ref();
const showTransform = ref(false)
const randomIDs: string[] = [Math.random().toString(), Math.random().toString()]
const states = ref({
  startWidth: 0,
  startHeight: 0,
  startTop: 0,
  startLeft: 0,
  endWidth: 0,
  endHeight: 0
})

function showLogAndSign(): void {
  const rect: DOMRect = op.value!.getBoundingClientRect();

  const { width, height, top, left } = rect;

  states.value.startWidth = width
  states.value.startHeight = height
  states.value.startTop = top
  states.value.startLeft = left

  states.value.endWidth = 90
  states.value.endHeight = 10

  showTransform.value = true
}

function hidedTransformZoomIn(): void {
  showTransform.value = false
};
</script>
