<template>
  <NuxtLayout name="default-layout">
    <div id="profissionais-page" class="p-6">
      <h1 class="text-3xl font-bold text-gray-800 mb-6">Profissionais</h1>
      
      <ProfissionaisTable 
        :profissionais="profissionais"
        :loading="loading"
        :error="error"
        @add-profissional="abrirModalNovo"
        @edit-profissional="abrirModalEdicao"
        @delete-profissional="handleDeletarProfissional"
      />

      <!-- Modal de Profissional -->
      <ProfissionalModal
        :is-open="modalAberto"
        :profiles="profiles"
        :especialidades="especialidades"
        :is-edicao="modoEdicao"
        :profissional-id="profissionalSelecionadoId"
        :profissional-data="profissionalSelecionadoData"
        @close="fecharModal"
        @confirm="handleConfirmarProfissional"
      />

      <!-- Modal de Confirmação de Exclusão -->
      <BaseModal
        :is-open="modalDeletarAberto"
        title="Confirmar Exclusão"
        size="sm"
        @close="fecharModalDeletar"
      >
        <p class="text-gray-700">
          Tem certeza que deseja excluir o profissional <strong>{{ profissionalDeletando?.nome }}</strong>?
        </p>
        <p class="text-gray-500 text-sm mt-2">
          Esta ação não pode ser desfeita.
        </p>

        <template #footer>
          <BaseButton
            id="cancelar-delete-btn"
            variant="outline"
            @click="fecharModalDeletar"
          >
            Cancelar
          </BaseButton>
          <BaseButton
            id="confirmar-delete-btn"
            variant="error"
            @click="handleConfirmarDeletar"
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
const { 
  profissionais, 
  profiles, 
  especialidades, 
  loading, 
  error, 
  fetchProfissionais,
  fetchProfiles,
  fetchEspecialidades,
  addProfissional,
  updateProfissional,
  deleteProfissional
} = useProfissionais()

const toast = useToast()

const modalAberto = ref(false)
const modoEdicao = ref(false)
const profissionalSelecionadoId = ref<number | undefined>(undefined)
const profissionalSelecionadoData = ref<{ profileId: number; especialidadeId: number } | undefined>(undefined)

const modalDeletarAberto = ref(false)
const profissionalDeletandoId = ref<number | undefined>(undefined)
const profissionalDeletando = ref<{ nome: string } | undefined>(undefined)

// Busca dados ao montar a página
onMounted(async () => {
  await Promise.all([
    fetchProfissionais(),
    fetchProfiles(),
    fetchEspecialidades()
  ])
})

// Controle do modal
const abrirModalNovo = () => {
  modoEdicao.value = false
  profissionalSelecionadoId.value = undefined
  profissionalSelecionadoData.value = undefined
  modalAberto.value = true
}

const abrirModalEdicao = (profissionalId: number) => {
  const profissional = profissionais.value.find(p => p.profissional_id === profissionalId)
  
  if (profissional) {
    modoEdicao.value = true
    profissionalSelecionadoId.value = profissionalId
    profissionalSelecionadoData.value = {
      profileId: profissional.profile_id,
      especialidadeId: profissional.especialidade_id
    }
    modalAberto.value = true
  }
}

const fecharModal = () => {
  modalAberto.value = false
  modoEdicao.value = false
  profissionalSelecionadoId.value = undefined
  profissionalSelecionadoData.value = undefined
}

const handleConfirmarProfissional = async (data: { id?: number; profileId: number; especialidadeId: number }) => {
  if (data.id) {
    // Atualizar profissional existente
    const result = await updateProfissional(data.id, data.profileId, data.especialidadeId)
    
    if (result.success) {
      toast.success(result.message)
      await fetchProfissionais()
    } else {
      toast.error(result.message)
    }
  } else {
    // Adicionar novo profissional
    const result = await addProfissional(data.profileId, data.especialidadeId)
    
    if (result.success) {
      toast.success(result.message)
      await fetchProfissionais()
    } else {
      toast.error(result.message)
    }
  }
}

const handleDeletarProfissional = async (profissionalId: number) => {
  const profissional = profissionais.value.find(p => p.profissional_id === profissionalId)
  
  if (!profissional) {
    toast.error('Profissional não encontrado')
    return
  }

  profissionalDeletandoId.value = profissionalId
  profissionalDeletando.value = { nome: profissional.nome || 'Sem nome' }
  modalDeletarAberto.value = true
}

const fecharModalDeletar = () => {
  modalDeletarAberto.value = false
  profissionalDeletandoId.value = undefined
  profissionalDeletando.value = undefined
}

const handleConfirmarDeletar = async () => {
  if (!profissionalDeletandoId.value) return

  const result = await deleteProfissional(profissionalDeletandoId.value)
  
  if (result.success) {
    toast.success(result.message)
    await fetchProfissionais()
    fecharModalDeletar()
  } else {
    toast.error(result.message)
  }
}
</script>
