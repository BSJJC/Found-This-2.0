<script lang="ts" setup>
import LogIn from './components/LogIn.vue';
import SignUp from "./components/SignUp.vue"
</script>

<template>
  <div class=" flex justify-center items-center w-[80vw] h-[80vh] bg-pink-300 z-10 absolute rounded-2xl overflow-hidden">
    <!-- Log in form -->
    <log-in></log-in>

    <!-- sign up form -->
    <sign-up></sign-up>
  </div>
</template>