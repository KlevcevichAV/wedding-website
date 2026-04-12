<template>
  <main class="wedding-app">
    <button
        @click="isMenuOpen = !isMenuOpen"
        :class="['burger-button', { 'is-active': isMenuOpen }]"
        aria-label="Menu"
    >
      <span class="line"></span>
      <span class="line"></span>
      <span class="line"></span>
    </button>

    <nav :class="['side-menu', { 'is-open': isMenuOpen }]">
      <div class="menu-links">
        <a href="#hero" @click="isMenuOpen = false">Главная</a>
        <a href="#program" @click="isMenuOpen = false">Программа</a>
        <a href="#location" @click="isMenuOpen = false">Место проведения</a>
        <a href="#dresscode" @click="isMenuOpen = false">Дресс код</a>
        <a href="#rsvp" @click="isMenuOpen = false">Анкета</a>
      </div>
    </nav>

    <div :class="['content-wrapper', { 'blurred': isMenuOpen }]">
      <HeroSection id="hero"/>
      <CountdownTimer id="timer"/>
      <ProgramSection id="program"/>
      <LocationSection id="location"/>
      <DressCode id="dresscode"/>
      <RSVPForm id="rsvp"/>
    </div>
  </main>
</template>

<script setup>
import {ref} from 'vue'
import HeroSection from './components/HeroSection.vue'
import ProgramSection from './components/ProgramSection.vue'
import LocationSection from './components/LocationSection.vue'
import DressCode from './components/DressCode.vue'
import RSVPForm from './components/RSVPForm.vue'
import CountdownTimer from './components/CountdownTimer.vue'

const isMenuOpen = ref(false)
</script>

<style scoped>
/* Кнопка бургера */
.burger-button {
  position: fixed;
  top: 2rem;
  right: 2rem;
  z-index: 100;
  width: 40px;
  height: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.line {
  width: 100%;
  height: 3px;
  background-color: #333;
  transition: all 0.3s ease-in-out;
}

.burger-button.is-active .line:nth-child(1) {
  transform: translateY(13.5px) rotate(45deg);
}

.burger-button.is-active .line:nth-child(2) {
  opacity: 0;
}

.burger-button.is-active .line:nth-child(3) {
  transform: translateY(-13.5px) rotate(-45deg);
}

.side-menu {
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(230, 213, 195, 0.98);
  z-index: 90;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.5s cubic-bezier(0.77, 0, 0.175, 1);
  transform: translateX(100%);
}

.side-menu.is-open {
  transform: translateX(0);
}

.menu-links {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  text-align: center;
}

.menu-links a {
  font-size: 2.5rem;
  text-decoration: none;
  color: #624a44;
  font-family: 'Cormorant Garamond', serif;
  transition: opacity 0.3s;
}

.menu-links a:hover {
  opacity: 0.6;
}

.content-wrapper {
  transition: filter 0.5s ease;
}

.content-wrapper.blurred {
  filter: blur(5px);
  pointer-events: none;
}
</style>