<template>
  <div>
    <app-header />
  </div>
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
.slide-enter-active,
.slide-leave-active {
  transition: all 0.75s ease-out;
  transition-timing-function: linear;
}

.slide-enter-to {
  position: absolute;
  right: 0;
}

.slide-enter-from {
  position: absolute;
  right: -100%;
}

.slide-leave-to {
  position: absolute;
  left: -100%;
}

.slide-leave-from {
  position: absolute;
  left: 0;
}
</style>
