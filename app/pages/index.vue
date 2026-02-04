<template>
  <NuxtLayout name="default-layout">
    <div id="agendamentos-page" class="p-6 h-full flex flex-col">
      <h1 class="text-3xl font-bold text-gray-800 mb-6 flex-shrink-0">Agendamentos</h1>
      
      <div class="flex-1 overflow-hidden">
        <AgendamentoManager />
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import AgendamentoManager from '../components/agendamentos/AgendamentoManager.vue'
</script>
