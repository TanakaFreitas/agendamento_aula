<template>
  <div id="agendamento-manager" class="flex flex-col h-full">
    <!-- Header -->
    <div id="agendamento-header" class="h-[100px] p-4 flex items-center justify-between">
      <!-- Controle de semana no lado esquerdo -->
      <SemanaControle />
      <!-- Botão Novo no lado direito -->
      <BaseButton id="novo-agendamento-btn" variant="primary" size="md">
        <div class="flex items-center gap-2">
          <ClientOnly>
            <PlusIcon class="w-5 h-5" />
          </ClientOnly>
          <span>Novo</span>
        </div>
      </BaseButton>
    </div>

    <!-- Corpo -->
    <div id="agendamento-body" class="flex-1 p-4">
      <!-- Corpo do agendamento -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { PlusIcon } from '@heroicons/vue/24/outline'
import SemanaControle from './SemanaControle.vue'
import BaseButton from '../BaseButton.vue'
</script>
