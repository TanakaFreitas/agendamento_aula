<template>
  <div id="semana-controle" class="flex flex-col gap-2">
    <!-- Texto com período da semana -->
    <div v-if="diasSemana.length === 7" class="text-gray-700 font-medium">
      De {{ formatarData(diasSemana[0]!) }} à {{ formatarData(diasSemana[6]!) }}
    </div>
    
    <!-- Botões de navegação -->
    <div class="flex gap-2">
      <button
        id="voltar-semana-btn"
        @click="agendamentoStore.voltarSemana()"
        class="p-2 bg-gray-200 hover:bg-gray-300 rounded-md transition-colors"
        title="Semana anterior"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button
        id="avancar-semana-btn"
        @click="agendamentoStore.avancarSemana()"
        class="p-2 bg-gray-200 hover:bg-gray-300 rounded-md transition-colors"
        title="Próxima semana"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useAgendamentoStore } from '../../stores/agendamentoStore'

const agendamentoStore = useAgendamentoStore()
const { diasSemana } = storeToRefs(agendamentoStore)

function formatarData(data: Date): string {
  const dia = String(data.getDate()).padStart(2, '0')
  const mes = String(data.getMonth() + 1).padStart(2, '0')
  const ano = data.getFullYear()
  return `${dia}/${mes}/${ano}`
}
</script>
