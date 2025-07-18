<script setup>
import { RouterLink } from 'vue-router'
import { ref } from 'vue'
import { useDarkMode } from '../stores/useDarkMode.js'
import { useCartStore } from '@/stores/cart.js'

const { isDarkMode, toggleDarkMode } = useDarkMode()
const isMenuOpen = ref(false)
const carrinho = useCartStore()


function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}
</script>

<template>
  <header>
    <nav>
      <div class="nav-left">
        <h1>
          <RouterLink to="/">
            ByteStore
          </RouterLink>
        </h1>
      </div>

      <div class="nav-header">
         <ul>

          <li><RouterLink to="/pcbuild">Monte seu PC</RouterLink></li>
          <li><RouterLink to="/products/processadores">Processadores</RouterLink></li>
          <li><RouterLink to="/products/monitores">Monitores</RouterLink></li>
          <li><RouterLink to="/products/perifericos">Periféricos</RouterLink></li>
          <li><RouterLink to="/products/gpus">GPUs</RouterLink></li>
          <li><RouterLink to="/products/ssds">SSDs</RouterLink></li>          
        </ul>
      </div>

      <div class="nav-right">
        <ul class="icons">
          <li>
            <RouterLink to="/cart">
              <span class="mdi mdi-cart"></span>
              <span>
                Produtos:  
                {{ carrinho.cart.totalItem}}
              </span>
            </RouterLink>
          </li>
          <li>
            <span id="darkModeButton" @click="toggleDarkMode" aria-label="Alternar modo escuro">
              <i :class="isDarkMode ? 'fa-solid fa-moon' : 'fa-solid fa-sun'"></i>
            </span>
          </li>
          <li class="hamburg-menu">
            <button class="hamburger" @click="toggleMenu">
              <span class="mdi mdi-menu"></span>
            </button>
          </li>
        </ul>
      </div>

      <ul :class="{ 'nav-links': true, 'active': isMenuOpen }">
        <li class="close-button" @click="toggleMenu">
          <span class="mdi mdi-chevron-right"></span>
        </li>
        <li><RouterLink to="/pcbuild" @click="toggleMenu">Monte seu PC</RouterLink></li>
        <li><RouterLink to="/products/processadores" @click="toggleMenu">Processadores</RouterLink></li>
        <li><RouterLink to="/products/monitores" @click="toggleMenu">Monitores</RouterLink></li>
        <li><RouterLink to="/products/perifericos" @click="toggleMenu">Periféricos</RouterLink></li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
#darkModeButton {
  border: none;
  background-color: var(--page2);
  color: var(--text);
  cursor: pointer;
  font-size: 1rem;
  transition: transform 0.2s ease, background-color 0.3s, color 0.3s;
}

header nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 5vh 5vw;
  z-index: 999;
  gap: 10px;
}

.nav-left,
.nav-center,
.nav-right {
  display: flex;
  align-items: center;
}

.nav-left {
  flex: 1;
}

.nav-center {
  flex: 2;
  justify-content: center;
}

.nav-right {
  flex: 1;
  justify-content: flex-end;
}

.nav-header ul{
  display: flex;
  gap: 3rem;
}

header nav h1 {
  font-size: clamp(2.3rem, 3vw, 1.3rem);
  color: #000;
}

header nav h1 a {
  text-decoration: none;
  display: flex;
  align-items: center;
  color: #0276fa99;
  font-weight: bold;
}

header nav input {
  width: 100%;
  max-width: 360px;
  height: 30px;
  border-radius: 10px;
  font-size: clamp(0.9rem, 2.5vw, 1rem); 
  border: none;
  background-color: var(--page3);
  padding: 5px 2rem 5px 1rem;
}

header nav .search-wrapper {
  position: relative;
  flex: 1;
  max-width: 400px;
}

header nav .search-wrapper::before {
  content: '󰍉';
  font-family: 'Material Design Icons';
  font-size: 1.2rem;
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
}

header nav .icons {
  display: flex;
  gap: 10px;
}

header nav .icons li {
  font-size: clamp(1.1rem, 3vw, 1.3rem); 
  background-color: var(--page2);
  border-radius: 5px;
  padding: 6px;
}

header nav .hamburger {
  background-color: var(--page2);
  border: none;
  font-size: 1.5rem;
  color: var(--text);
  cursor: pointer;
  display: block;
}

.hamburg-menu {
  display: none;
}

header nav ul.nav-links {
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: 250px;
  flex-direction: column;
  background-color: var(--page1);
  padding: 20px;
  border-left: 1px solid #0276fa99;
  z-index: 1000;
  box-shadow: -2px 0 8px rgba(0, 0, 0, 0.1);
  transform: translateX(100%);
  transition: transform 0.3s ease-in-out;
  display: flex;
}

header nav ul.nav-links.active {
  transform: translateX(0);
}

:root.dark header nav ul.nav-links {
  background-color: #1e1e1e;
  color: #f1f1f1;
}

header nav ul.nav-links li {
  margin: 10px 0;
  list-style: none;
  font-size: clamp(0.9rem, 2.5vw, 1rem);
}

header nav .nav-links .close-button {
  align-self: flex-end;
  background-color: var(--page2);
  color: var(--text);
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  cursor: pointer;
  font-size: 1.2rem;
  transition: background-color 0.3s;
}

header nav .nav-links .close-button:hover {
  background-color: var(--page3);
}

@media (max-width: 768px) {
  .nav-left,
  .nav-center,
  .nav-right {
    width: 100%;
    justify-content: center;
  }

  .nav-header {
    display: none;
  }

  .hamburg-menu {
    display: block;
  }

  .nav-right {
    justify-content: flex-end;
  }

  .nav-center {
    order: 2;
    margin: 10px 0;
  }
}

@media (max-width: 480px) {
  .nav-center {
    display: none;
  }

  header nav h1 {
    flex: 1;
  }

  header nav .icons li {
    font-size: 1.1rem;
  }
}
</style>
