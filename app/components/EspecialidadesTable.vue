<template>
  <div id="especialidades-table" class="w-full">
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-xl font-semibold text-gray-800">Lista de Especialidades</h2>
      <BaseButton 
        v-if="!userStore.isUser"
        id="btn-add-especialidade" 
        variant="primary" 
        size="md"
        :disabled="!userStore.isAdmin"
      >
        <div class="flex items-center gap-2">
          <ClientOnly>
            <PlusIcon class="w-5 h-5" />
          </ClientOnly>
          <span>Adicionar Especialidade</span>
        </div>
      </BaseButton>
    </div>

    <div v-if="loading" class="text-center py-8">
      <p class="text-gray-600">Carregando especialidades...</p>
    </div>

    <div v-else-if="error" class="text-center py-8">
      <p class="text-red-600">{{ error }}</p>
    </div>

    <div v-else-if="especialidades.length === 0" class="text-center py-8">
      <p class="text-gray-600">Nenhuma especialidade cadastrada.</p>
    </div>

    <div v-else class="overflow-x-auto">
      <table class="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
              ID
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
              Especialidade
            </th>
            <th 
              v-if="!userStore.isUser"
              class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-b"
            >
              Ações
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr v-for="especialidade in especialidades" :key="especialidade.id" class="hover:bg-gray-50">
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ especialidade.id }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ especialidade.especialidade || '-' }}
            </td>
            <td v-if="!userStore.isUser" class="px-6 py-4 whitespace-nowrap text-sm text-center">
              <div class="flex items-center justify-center gap-2">
                <button
                  :disabled="!userStore.isAdmin"
                  class="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Editar"
                >
                  <ClientOnly>
                    <PencilIcon class="w-5 h-5" />
                  </ClientOnly>
                </button>
                <button
                  :disabled="!userStore.isAdmin"
                  class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Deletar"
                >
                  <ClientOnly>
                    <TrashIcon class="w-5 h-5" />
                  </ClientOnly>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PencilIcon, TrashIcon, PlusIcon } from '@heroicons/vue/24/outline'
const userStore = useUserStore()

import type { Especialidade } from '../../shared/types/Especialidade'

interface Props {
  especialidades: Especialidade[]
  loading: boolean
  error: string | null
}

defineProps<Props>()
</script>
