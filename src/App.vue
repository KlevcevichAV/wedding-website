<template>
  <main class="wedding-app">
    <header class="navigation">
      <a href="#hero">Главная</a>
      <a href="#program">Программа</a>
      <a href="#rsvp">Присутствие</a>
    </header>

    <HeroSection id="hero"/>
    <CountdownTimer id="timer"/>
    <ProgramSection id="program"/>
    <LocationSection id="location"/>
    <DressCode id="dresscode"/>
    <RSVPForm id="rsvp"/>

  </main>
</template>

<script setup>
import HeroSection from './components/HeroSection.vue'
import ProgramSection from './components/ProgramSection.vue'
import LocationSection from './components/LocationSection.vue'
import DressCode from './components/DressCode.vue'
import RSVPForm from './components/RSVPForm.vue'
import CountdownTimer from './components/CountdownTimer.vue'
</script>

<style>
/* Здесь можно подключить глобальные переменные из Figma (цвета, шрифты) */
:root {
  --primary-color: #E6D5C3;
  --text-color: #333333;
  --font-main: 'Cormorant Garamond', serif;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: var(--font-main);
  color: var(--text-color);
  margin: 0;
  padding: 0;
}
</style>