<script setup>
import { /*RouterLink,*/ RouterView } from 'vue-router'
</script>

<template>
  <div class="wrapper">
    <nav>
      <RouterLink to="/login">Login</RouterLink>
      <RouterLink to="/about">About</RouterLink>
      <RouterLink to="/swiper">Swiper</RouterLink>
      <RouterLink to="/swiper-new">Swiper-new</RouterLink>
      <RouterLink to="/accordion">Accordion</RouterLink>
      <RouterLink to="/dropzone">Dropzone</RouterLink>
      <RouterLink to="/">Home</RouterLink>
    </nav>
  </div>
  <RouterView class="ContentWrapper"/>
</template>

<style scoped>
.wrapper {
  width: 500px;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
}
.ContentWrapper{
  display: flex;
  flex-direction: column;
}
.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  color: orange;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
    background-color: silver;
  }

  nav {
    margin-left: -1rem;
    font-size: 1rem;
    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
