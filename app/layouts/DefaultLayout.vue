<template>
  <div id="default-layout" class="flex h-screen overflow-hidden">
    <!-- Sidebar à esquerda -->
    <Sidebar />
    
    <!-- Área principal à direita -->
    <main class="flex-1 overflow-y-auto bg-gray-100">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import Sidebar from '~/components/Sidebar.vue'
</script>
