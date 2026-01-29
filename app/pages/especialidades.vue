<template>
  <NuxtLayout name="default-layout">
    <div id="especialidades-page" class="p-6">
      <h1 class="text-3xl font-bold text-gray-800 mb-6">Especialidades</h1>
      
      <EspecialidadesTable 
        :especialidades="especialidades"
        :loading="loading"
        :error="error"
        @add-especialidade="handleOpenModal"
        @edit-especialidade="handleOpenEditModal"
        @delete-especialidade="handleOpenDeleteModal"
      />

      <EspecialidadeModal
        :is-open="isModalOpen"
        :is-edicao="isEditMode"
        :especialidade-id="editingId"
        :especialidade-data="editingEspecialidade"
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
          Tem certeza que deseja excluir a especialidade <strong>{{ deletingEspecialidade?.especialidade }}</strong>?
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
import type { Especialidade } from '../../shared/types/Especialidade'

const { especialidades, loading, error, fetchEspecialidades, addEspecialidade, updateEspecialidade, getEspecialidadeById, deleteEspecialidade } = useProfissionais()
const toast = useToast()

const isModalOpen = ref(false)
const isEditMode = ref(false)
const editingId = ref<number | undefined>(undefined)
const editingEspecialidade = ref<Especialidade | undefined>(undefined)

const isDeleteModalOpen = ref(false)
const deletingId = ref<number | undefined>(undefined)
const deletingEspecialidade = ref<Especialidade | undefined>(undefined)

const handleOpenModal = () => {
  isEditMode.value = false
  editingId.value = undefined
  editingEspecialidade.value = undefined
  isModalOpen.value = true
}

const handleOpenEditModal = (id: number) => {
  isEditMode.value = true
  editingId.value = id
  editingEspecialidade.value = getEspecialidadeById(id)
  isModalOpen.value = true
}

const handleOpenDeleteModal = (id: number) => {
  deletingId.value = id
  deletingEspecialidade.value = getEspecialidadeById(id)
  isDeleteModalOpen.value = true
}

const handleCloseModal = () => {
  isModalOpen.value = false
  isEditMode.value = false
  editingId.value = undefined
  editingEspecialidade.value = undefined
}

const handleCloseDeleteModal = () => {
  isDeleteModalOpen.value = false
  deletingId.value = undefined
  deletingEspecialidade.value = undefined
}

const handleConfirm = async (data: { id?: number; especialidade: string }) => {
  let result
  
  if (isEditMode.value && data.id) {
    result = await updateEspecialidade(data.id, data.especialidade)
  } else {
    result = await addEspecialidade(data.especialidade)
  }
  
  if (result.success) {
    toast.success(result.message)
    await fetchEspecialidades()
  } else {
    toast.error(result.message)
  }
}

const handleConfirmDelete = async () => {
  if (!deletingId.value) return

  const result = await deleteEspecialidade(deletingId.value)
  
  if (result.success) {
    toast.success(result.message)
    await fetchEspecialidades()
    handleCloseDeleteModal()
  } else {
    toast.error(result.message)
  }
}

onMounted(() => {
  fetchEspecialidades()
})
</script>
