<template>
  <NuxtLayout name="default-layout">
    <div id="clientes-page" class="p-6">
      <h1 class="text-3xl font-bold text-gray-800 mb-6">Clientes</h1>
      
      <ClientesTable 
        :clientes="clientes"
        :loading="loading"
        :error="error"
        @add-cliente="handleOpenModal"
        @edit-cliente="handleOpenEditModal"
        @delete-cliente="handleOpenDeleteModal"
      />

      <!-- Modal de Cliente -->
      <ClienteModal
        :is-open="isModalOpen"
        :is-edicao="isEditMode"
        :cliente-id="editingId"
        :cliente-data="editingCliente"
        @close="handleCloseModal"
        @confirm="handleConfirm"
      />

      <!-- Modal de Confirmação de Exclusão -->
      <BaseModal
        :is-open="isDeleteModalOpen"
        title="Confirmar Exclusão"
        size="sm"
        @close="handleCloseDeleteModal"
      >
        <p class="text-gray-700">
          Tem certeza que deseja excluir o cliente <strong>{{ deletingCliente?.cliente }}</strong>?
        </p>
        <p class="text-gray-500 text-sm mt-2">
          Esta ação não pode ser desfeita.
        </p>

        <template #footer>
          <BaseButton
            id="cancelar-delete-btn"
            variant="outline"
            @click="handleCloseDeleteModal"
          >
            Cancelar
          </BaseButton>
          <BaseButton
            id="confirmar-delete-btn"
            variant="error"
            @click="handleConfirmDelete"
            :disabled="loading"
          >
            {{ loading ? 'Deletando...' : 'Deletar' }}
          </BaseButton>
        </template>
      </BaseModal>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import type { Cliente } from '../../shared/types/Cliente'

const { clientes, loading, error, fetchClientes, addCliente, updateCliente, deleteCliente } = useProfissionais()
const toast = useToast()

const isModalOpen = ref(false)
const isEditMode = ref(false)
const editingId = ref<number | undefined>(undefined)
const editingCliente = ref<Cliente | undefined>(undefined)

const isDeleteModalOpen = ref(false)
const deletingId = ref<number | undefined>(undefined)
const deletingCliente = ref<Cliente | undefined>(undefined)

const handleOpenModal = () => {
  isEditMode.value = false
  editingId.value = undefined
  editingCliente.value = undefined
  isModalOpen.value = true
}

const handleOpenEditModal = (id: number) => {
  const cliente = clientes.value.find(c => c.id === id)
  
  if (cliente) {
    isEditMode.value = true
    editingId.value = id
    editingCliente.value = cliente
    isModalOpen.value = true
  }
}

const handleOpenDeleteModal = (id: number) => {
  deletingId.value = id
  deletingCliente.value = clientes.value.find(c => c.id === id)
  isDeleteModalOpen.value = true
}

const handleCloseModal = () => {
  isModalOpen.value = false
  isEditMode.value = false
  editingId.value = undefined
  editingCliente.value = undefined
}

const handleCloseDeleteModal = () => {
  isDeleteModalOpen.value = false
  deletingId.value = undefined
  deletingCliente.value = undefined
}

const handleConfirm = async (data: { id?: number; cpf: string; cliente: string; endereco?: string; email?: string; telefone?: string }) => {
  if (data.id) {
    // Atualizar cliente existente
    const result = await updateCliente(
      data.id,
      data.cpf,
      data.cliente,
      data.endereco,
      data.email,
      data.telefone
    )
    
    if (result.success) {
      toast.success(result.message)
      await fetchClientes()
    } else {
      toast.error(result.message)
    }
  } else {
    // Adicionar novo cliente
    const result = await addCliente(
      data.cpf,
      data.cliente,
      data.endereco,
      data.email,
      data.telefone
    )
    
    if (result.success) {
      toast.success(result.message)
      await fetchClientes()
    } else {
      toast.error(result.message)
    }
  }
}

const handleConfirmDelete = async () => {
  if (!deletingId.value) return

  const result = await deleteCliente(deletingId.value)
  
  if (result.success) {
    toast.success(result.message)
    await fetchClientes()
    handleCloseDeleteModal()
  } else {
    toast.error(result.message)
  }
}

onMounted(() => {
  fetchClientes()
})
</script>
