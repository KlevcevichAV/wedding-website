<template>
  <svg :width="size" :height="size * 1.5" viewBox="0 0 40 60" fill="none" xmlns="http://www.w3.org/2000/svg" :style="{ transform: `rotate(${rotate}deg)` }">
    <path d="M20 55C20 55 15 40 20 25C25 10 20 5 20 5" :stroke="color" stroke-width="0.8" stroke-linecap="round"/>
    <path d="M20 45C20 45 10 40 8 35C6 30 10 28 12 30C14 32 20 40 20 40" :stroke="color" stroke-width="0.8" stroke-linecap="round"/>
    <path d="M20 35C20 35 30 30 32 25C34 20 30 18 28 20C26 22 20 30 20 30" :stroke="color" stroke-width="0.8" stroke-linecap="round"/>
    <path d="M20 25C20 25 12 20 10 15C8 10 12 8 14 10C16 12 20 20 20 20" :stroke="color" stroke-width="0.8" stroke-linecap="round"/>
    <path d="M20 15C20 15 28 10 30 5C32 0 28 -2 26 0C24 2 20 10 20 10" :stroke="color" stroke-width="0.8" stroke-linecap="round"/>
  </svg>
</template>

<script setup>
defineProps({
  size: { type: [Number, String], default: 40 },
  color: { type: String, default: 'currentColor' },
  rotate: { type: [Number, String], default: 0 }
})
</script>
