<template>
  <BaseModal
    :id="`profissional-modal-${id}`"
    :is-open="isOpen"
    :title="isEdicao ? 'Editar Profissional' : 'Novo Profissional'"
    size="md"
    @close="handleClose"
  >
    <!-- Conteúdo do Modal -->
    <form @submit.prevent="handleSubmit">
      <div class="space-y-4">
        <!-- Dropdown de Perfis -->
        <div>
          <label 
            for="profile-select" 
            class="block text-sm font-medium text-gray-700 mb-2"
          >
            Usuário
          </label>
          <select
            id="profile-select"
            v-model="formData.profileId"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
            @blur="validateProfile"
          >
            <option value="">Selecione um usuário</option>
            <option 
              v-for="profile in profiles" 
              :key="profile.id" 
              :value="profile.id"
            >
              {{ profile.nome }}
            </option>
          </select>
          <p v-if="errors.profileId" class="mt-1 text-sm text-red-600">
            {{ errors.profileId }}
          </p>
        </div>

        <!-- Dropdown de Especialidades -->
        <div>
          <label 
            for="especialidade-select" 
            class="block text-sm font-medium text-gray-700 mb-2"
          >
            Especialidade
          </label>
          <select
            id="especialidade-select"
            v-model="formData.especialidadeId"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
            @blur="validateEspecialidade"
          >
            <option value="">Selecione uma especialidade</option>
            <option 
              v-for="especialidade in especialidades" 
              :key="especialidade.id" 
              :value="especialidade.id"
            >
              {{ especialidade.especialidade }}
            </option>
          </select>
          <p v-if="errors.especialidadeId" class="mt-1 text-sm text-red-600">
            {{ errors.especialidadeId }}
          </p>
        </div>
      </div>
    </form>

    <!-- Footer com botões -->
    <template #footer>
      <BaseButton
        id="cancelar-profissional-btn"
        variant="outline"
        @click="handleClose"
      >
        Cancelar
      </BaseButton>
      <BaseButton
        id="confirmar-profissional-btn"
        variant="primary"
        @click="handleSubmit"
        :disabled="isSubmitting || !isFormValid"
      >
        {{ isSubmitting ? 'Salvando...' : (isEdicao ? 'Atualizar' : 'Criar') }}
      </BaseButton>
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
import type { Profile } from '../../shared/types/Profile'
import type { Especialidade } from '../../shared/types/Especialidade'

interface ProfissionalData {
  profileId: number
  especialidadeId: number
}

interface Props {
  isOpen: boolean
  profiles: Profile[]
  especialidades: Especialidade[]
  isEdicao?: boolean
  profissionalId?: number
  profissionalData?: ProfissionalData
  id?: string
}

const props = withDefaults(defineProps<Props>(), {
  isEdicao: false,
  id: 'default'
})

const emit = defineEmits<{
  close: []
  confirm: [data: { id?: number; profileId: number; especialidadeId: number }]
}>()

// Estado do formulário
const formData = reactive({
  profileId: '' as string | number,
  especialidadeId: '' as string | number
})

const errors = reactive({
  profileId: '',
  especialidadeId: ''
})

const isSubmitting = ref(false)

// Validação dos campos
const validateProfile = () => {
  if (!formData.profileId) {
    errors.profileId = 'Selecione um usuário'
    return false
  }
  errors.profileId = ''
  return true
}

const validateEspecialidade = () => {
  if (!formData.especialidadeId) {
    errors.especialidadeId = 'Selecione uma especialidade'
    return false
  }
  errors.especialidadeId = ''
  return true
}

// Verifica se o formulário é válido
const isFormValid = computed(() => {
  return formData.profileId !== '' && formData.especialidadeId !== ''
})

// Carrega dados quando for edição ou limpa quando for novo
watch(() => [props.isOpen, props.isEdicao, props.profissionalData], () => {
  if (props.isOpen) {
    if (props.isEdicao && props.profissionalData) {
      formData.profileId = props.profissionalData.profileId
      formData.especialidadeId = props.profissionalData.especialidadeId
    } else {
      formData.profileId = ''
      formData.especialidadeId = ''
    }
    errors.profileId = ''
    errors.especialidadeId = ''
  }
}, { immediate: true })

// Fecha o modal
const handleClose = () => {
  formData.profileId = ''
  formData.especialidadeId = ''
  errors.profileId = ''
  errors.especialidadeId = ''
  isSubmitting.value = false
  emit('close')
}

// Submete o formulário
const handleSubmit = async () => {
  // Valida antes de submeter
  const isProfileValid = validateProfile()
  const isEspecialidadeValid = validateEspecialidade()

  if (!isProfileValid || !isEspecialidadeValid) {
    return
  }

  isSubmitting.value = true

  try {
    // Emite o evento de confirmação com os dados
    const data = {
      profileId: Number(formData.profileId),
      especialidadeId: Number(formData.especialidadeId),
      ...(props.isEdicao && props.profissionalId ? { id: props.profissionalId } : {})
    }
    
    emit('confirm', data)
    
    // Após sucesso, fecha o modal
    handleClose()
  } catch (error) {
    console.error('Erro ao salvar profissional:', error)
  } finally {
    isSubmitting.value = false
  }
}
</script>
