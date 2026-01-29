<template>
  <BaseModal
    :id="`especialidade-modal-${id}`"
    :is-open="isOpen"
    :title="isEdicao ? 'Editar Especialidade' : 'Nova Especialidade'"
    size="md"
    @close="handleClose"
  >
    <!-- Conteúdo do Modal -->
    <form @submit.prevent="handleSubmit">
      <div class="space-y-4">
        <BaseInput
          v-model="formData.especialidade"
          id="especialidade-input"
          label="Nome da Especialidade"
          placeholder="Digite o nome da especialidade"
          required
          :error="errors.especialidade"
          @blur="validateEspecialidade"
        />
      </div>
    </form>

    <!-- Footer com botões -->
    <template #footer>
      <BaseButton
        id="cancelar-btn"
        variant="outline"
        @click="handleClose"
      >
        Cancelar
      </BaseButton>
      <BaseButton
        id="confirmar-btn"
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
import type { Especialidade } from '../../shared/types/Especialidade'

interface Props {
  isOpen: boolean
  isEdicao?: boolean
  especialidadeId?: number
  especialidadeData?: Especialidade
  id?: string
}

const props = withDefaults(defineProps<Props>(), {
  isEdicao: false,
  id: 'default'
})

const emit = defineEmits<{
  close: []
  confirm: [data: { id?: number; especialidade: string }]
}>()

// Estado do formulário
const formData = reactive({
  especialidade: ''
})

const errors = reactive({
  especialidade: ''
})

const isSubmitting = ref(false)

// Validação do campo
const validateEspecialidade = () => {
  if (!formData.especialidade.trim()) {
    errors.especialidade = 'O nome da especialidade é obrigatório'
    return false
  }
  if (formData.especialidade.trim().length < 3) {
    errors.especialidade = 'O nome deve ter pelo menos 3 caracteres'
    return false
  }
  errors.especialidade = ''
  return true
}

// Verifica se o formulário é válido
const isFormValid = computed(() => {
  return formData.especialidade.trim().length >= 3 && !errors.especialidade
})

// Carrega dados quando for edição
watch(() => [props.isOpen, props.isEdicao, props.especialidadeData], () => {
  if (props.isOpen) {
    if (props.isEdicao && props.especialidadeData) {
      formData.especialidade = props.especialidadeData.especialidade || ''
      errors.especialidade = ''
    } else {
      formData.especialidade = ''
      errors.especialidade = ''
    }
  }
}, { immediate: true })

// Fecha o modal
const handleClose = () => {
  formData.especialidade = ''
  errors.especialidade = ''
  isSubmitting.value = false
  emit('close')
}

// Submete o formulário
const handleSubmit = async () => {
  // Valida antes de submeter
  if (!validateEspecialidade()) {
    return
  }

  isSubmitting.value = true

  try {
    // Emite o evento de confirmação com os dados
    const data = {
      especialidade: formData.especialidade.trim(),
      ...(props.isEdicao && props.especialidadeId ? { id: props.especialidadeId } : {})
    }
    
    emit('confirm', data)
    
    // Após sucesso, fecha o modal
    handleClose()
  } catch (error) {
    console.error('Erro ao salvar especialidade:', error)
    errors.especialidade = 'Erro ao salvar. Tente novamente.'
  } finally {
    isSubmitting.value = false
  }
}
</script>
