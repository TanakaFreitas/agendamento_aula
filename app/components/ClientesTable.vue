<template>
  <div id="clientes-table" class="w-full">
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-xl font-semibold text-gray-800">Lista de Clientes</h2>
      <BaseButton 
        v-if="userStore.isAdmin || userStore.isProfissional"
        id="btn-add-cliente" 
        variant="primary" 
        size="md"
        @click="$emit('addCliente')"
      >
        <div class="flex items-center gap-2">
          <ClientOnly>
            <PlusIcon class="w-5 h-5" />
          </ClientOnly>
          <span>Adicionar Cliente</span>
        </div>
      </BaseButton>
    </div>

    <div v-if="loading" class="text-center py-8">
      <p class="text-gray-600">Carregando clientes...</p>
    </div>

    <div v-else-if="error" class="text-center py-8">
      <p class="text-red-600">{{ error }}</p>
    </div>

    <div v-else-if="clientes.length === 0" class="text-center py-8">
      <p class="text-gray-600">Nenhum cliente cadastrado.</p>
    </div>

    <div v-else class="overflow-x-auto">
      <table class="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
              ID
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
              Nome
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
              CPF
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
              Email
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
              Telefone
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
              Endereço
            </th>
            <th 
              v-if="userStore.isAdmin || userStore.isProfissional"
              class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-b"
            >
              Ações
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr v-for="cliente in clientes" :key="cliente.id" class="hover:bg-gray-50">
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ cliente.id }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ cliente.cliente || '-' }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ formatCpf(cliente.cpf) }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ cliente.email || '-' }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ formatTelefone(cliente.telefone) }}
            </td>
            <td class="px-6 py-4 text-sm text-gray-900">
              {{ cliente.endereco || '-' }}
            </td>
            <td v-if="userStore.isAdmin || userStore.isProfissional" class="px-6 py-4 whitespace-nowrap text-sm text-center">
              <div class="flex items-center justify-center gap-2">
                <button
                  class="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  title="Editar"
                  @click="$emit('editCliente', cliente.id)"
                >
                  <ClientOnly>
                    <PencilIcon class="w-5 h-5" />
                  </ClientOnly>
                </button>
                <button
                  v-if="userStore.isAdmin"
                  class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Deletar"
                  @click="$emit('deleteCliente', cliente.id)"
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

import type { Cliente } from '../../shared/types/Cliente'

interface Props {
  clientes: Cliente[]
  loading: boolean
  error: string | null
}

defineProps<Props>()

defineEmits<{
  addCliente: []
  editCliente: [id: number]
  deleteCliente: [id: number]
}>()

const formatCpf = (cpf?: string | null): string => {
  if (!cpf) return '-'
  const numeros = cpf.replace(/\D/g, '')
  if (numeros.length !== 11) return cpf
  return numeros.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
}

const formatTelefone = (telefone?: string | null): string => {
  if (!telefone) return '-'
  const numeros = telefone.replace(/\D/g, '')
  if (numeros.length === 11) {
    return numeros.replace(/(\d{2})(\d{5})(\d{4})/, '($1)$2-$3')
  } else if (numeros.length === 10) {
    return numeros.replace(/(\d{2})(\d{4})(\d{4})/, '($1)$2-$3')
  }
  return telefone
}
</script>
