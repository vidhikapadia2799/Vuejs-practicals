<template>
  <app-header />
  <router-view v-slot="{ Component }">
    <transition name="slide">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script>
export default {
  name: "App",
};
</script>

<style scoped>
.slide-enter-active {
  transition: all 0.5s ease-in;
}
.slide-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(80px);
  opacity: 0;
}
.slide-leave-to {
  position: absolute;
  left: -100%;
}
</style>
