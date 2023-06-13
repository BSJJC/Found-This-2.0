<template>
  <div class=" flex justify-center items-center w-1/3 h-[400px] mb-10">
    <div
      class="w-[90%]  h-[100%]  rounded-xl overflow-hidden p-[30px] bg-white shadow-lg shadow-[#d5d5d5] transition duration-300 cursor-pointer hover:shadow-xl hover:shadow-[#7e56da] hover:scale-105">
      <!-- title -->
      <div class="w-full h-1/3  overflow-hidden relative">
        <div class="absolute w-full h-full flex justify-start items-center text-white text-4xl p-10 rounded-lg bg-red-300"
          :style="{ background: `url(http://localhost:5000/api/topic/bg/download/${props.data.bgID})`, backgroundSize: 'cover' }">
          {{ props.data.title }}
        </div>
      </div>

      <!-- info -->
      <div class="w-full h-2/3 pt-6 grid grid-rows-2">
        <div class="w-full h-full flex justify-center items-center flex-row">
          <!-- topics -->
          <div class="w-[25%] h-full flex justify-center items-center flex-col">
            <div class="w-full h-1/3 text-md flex justify-start items-center text-[#adadad]">
              VIEWS
            </div>
            <div class="w-full h-2/3 text-2xl text-[#5d5d5d]">{{ props.data.views }}</div>
          </div>

          <!-- last active -->
          <div class="w-[75%] h-full">
            <div class="w-full h-full flex justify-center items-center flex-col pl-8">
              <div class="w-full h-1/3 text-md flex justify-start items-center flex-row text-[#adadad]">
                LIKES
              </div>
              <div class="w-full h-2/3 text-2xl text-[#5d5d5d]">{{ props.data.likes }}</div>
            </div>
          </div>
        </div>

        <!-- last topic -->
        <div class="w-full h-full flex justify-center items-center flex-col">
          <div class="w-full h-1/3 text-md flex justify-start items-center flex-row text-[#adadad]">
            LAST REPLY
          </div>
          <div class="w-full h-2/3 text-2xl text-[#5d5d5d] flex justify-center items-center flex-row">
            <div class="h-full w-[20%] flex justify-start items-center">
              <img :src="`http://localhost:5000/api/userAvaters/get/${props.data.founderAvaterID}`" alt="user avater"
                class="rounded-full">
            </div>
            <div class="h-full w-[80%] text-[1.2rem] overflow-clip">
              Lorem ipsum, dolor sit amet consectetur consectetur consectetur consectetur
              consectetur
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script setup lang='ts'>
interface Config {
  founderName: string,
  founderAvaterID: string,
  title: string,
  text: string,
  likes: number,
  dislikes: number,
  replies: number,
  views: number
  bgID: string,
  appendixIDs: Array<string>,
}

const props = defineProps<{ data: Config }>()
</script>