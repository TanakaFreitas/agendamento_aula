<template>
  <BaseModal
    :id="`cliente-modal-${id}`"
    :is-open="isOpen"
    :title="isEdicao ? 'Editar Cliente' : 'Novo Cliente'"
    size="lg"
    @close="handleClose"
  >
    <!-- Conteúdo do Modal -->
    <form @submit.prevent="handleSubmit">
      <div class="space-y-4">
        <!-- Nome do Cliente -->
        <BaseInput
          v-model="formData.cliente"
          id="cliente-nome-input"
          label="Nome do Cliente"
          placeholder="Digite o nome completo"
          required
          :error="errors.cliente"
          @blur="validateCliente"
        />

        <!-- CPF -->
        <BaseInput
          v-model="formData.cpf"
          id="cliente-cpf-input"
          label="CPF"
          placeholder="Digite o CPF"
          required
          :error="errors.cpf"
          :disabled="isEdicao && !userStore.isAdmin"
          @blur="validateCpf"
        />

        <!-- Email -->
        <BaseInput
          v-model="formData.email"
          id="cliente-email-input"
          label="Email"
          type="email"
          placeholder="Digite o email (opcional)"
          :error="errors.email"
          @blur="validateEmail"
        />

        <!-- Telefone -->
        <BaseInput
          v-model="formData.telefone"
          id="cliente-telefone-input"
          label="Telefone"
          placeholder="Digite o telefone (opcional)"
          :error="errors.telefone"
        />

        <!-- Endereço -->
        <div>
          <label 
            for="cliente-endereco-input" 
            class="block text-sm font-medium text-gray-700 mb-2"
          >
            Endereço
          </label>
          <textarea
            id="cliente-endereco-input"
            v-model="formData.endereco"
            rows="3"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Digite o endereço (opcional)"
          />
          <p v-if="errors.endereco" class="mt-1 text-sm text-red-600">
            {{ errors.endereco }}
          </p>
        </div>
      </div>
    </form>

    <!-- Footer com botões -->
    <template #footer>
      <BaseButton
        id="cancelar-cliente-btn"
        variant="outline"
        @click="handleClose"
      >
        Cancelar
      </BaseButton>
      <BaseButton
        id="confirmar-cliente-btn"
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
import type { Cliente } from '../../shared/types/Cliente'

const userStore = useUserStore()

interface Props {
  isOpen: boolean
  isEdicao?: boolean
  clienteId?: number
  clienteData?: Cliente
  id?: string
}

const props = withDefaults(defineProps<Props>(), {
  isEdicao: false,
  id: 'default'
})

const emit = defineEmits<{
  close: []
  confirm: [data: { id?: number; cpf: string; cliente: string; endereco?: string; email?: string; telefone?: string }]
}>()

// Estado do formulário
const formData = reactive({
  cliente: '',
  cpf: '',
  email: '',
  telefone: '',
  endereco: ''
})

const errors = reactive({
  cliente: '',
  cpf: '',
  email: '',
  telefone: '',
  endereco: ''
})

const isSubmitting = ref(false)

// Formata CPF: 123.456.789-06
const formatCpf = (value: string) => {
  const numbers = value.replace(/\D/g, '')
  if (numbers.length <= 11) {
    return numbers
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
  }
  return numbers.slice(0, 11)
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{2})$/, '$1-$2')
}

// Formata Telefone: (31)99136-3893 ou (31)3434-7661
const formatTelefone = (value: string) => {
  const numbers = value.replace(/\D/g, '')
  if (numbers.length <= 10) {
    return numbers
      .replace(/(\d{2})(\d)/, '($1)$2')
      .replace(/(\d{4})(\d)/, '$1-$2')
  }
  return numbers.slice(0, 11)
    .replace(/(\d{2})(\d)/, '($1)$2')
    .replace(/(\d{5})(\d)/, '$1-$2')
}

// Aplica máscara ao CPF
watch(() => formData.cpf, (newValue, oldValue) => {
  // Evita loop infinito verificando se o valor já está formatado
  const formatted = formatCpf(newValue)
  if (formatted !== newValue) {
    formData.cpf = formatted
  }
})

// Aplica máscara ao Telefone
watch(() => formData.telefone, (newValue, oldValue) => {
  // Evita loop infinito verificando se o valor já está formatado
  const formatted = formatTelefone(newValue)
  if (formatted !== newValue) {
    formData.telefone = formatted
  }
})

// Validação do nome do cliente
const validateCliente = () => {
  if (!formData.cliente.trim()) {
    errors.cliente = 'O nome do cliente é obrigatório'
    return false
  }
  if (formData.cliente.trim().length < 3) {
    errors.cliente = 'O nome deve ter pelo menos 3 caracteres'
    return false
  }
  errors.cliente = ''
  return true
}

// Validação do CPF
const validateCpf = () => {
  if (!formData.cpf.trim()) {
    errors.cpf = 'O CPF é obrigatório'
    return false
  }
  
  // Remove caracteres não numéricos
  const cpfNumerico = formData.cpf.replace(/\D/g, '')
  
  if (cpfNumerico.length !== 11) {
    errors.cpf = 'O CPF deve ter 11 dígitos'
    return false
  }
  
  errors.cpf = ''
  return true
}

// Validação do email (opcional)
const validateEmail = () => {
  if (formData.email.trim()) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      errors.email = 'Email inválido'
      return false
    }
  }
  errors.email = ''
  return true
}

// Verifica se o formulário é válido
const isFormValid = computed(() => {
  return (
    formData.cliente.trim().length >= 3 &&
    formData.cpf.trim().length > 0 &&
    !errors.cliente &&
    !errors.cpf &&
    !errors.email
  )
})

// Carrega dados quando for edição
watch(() => [props.isOpen, props.isEdicao, props.clienteData], () => {
  if (props.isOpen) {
    if (props.isEdicao && props.clienteData) {
      // Aplica máscara aos dados vindos do banco
      formData.cliente = props.clienteData.cliente || ''
      formData.cpf = formatCpf(props.clienteData.cpf || '')
      formData.email = props.clienteData.email || ''
      formData.telefone = formatTelefone(props.clienteData.telefone || '')
      formData.endereco = props.clienteData.endereco || ''
      
      // Limpa erros
      errors.cliente = ''
      errors.cpf = ''
      errors.email = ''
      errors.telefone = ''
      errors.endereco = ''
    } else {
      formData.cliente = ''
      formData.cpf = ''
      formData.email = ''
      formData.telefone = ''
      formData.endereco = ''
      
      errors.cliente = ''
      errors.cpf = ''
      errors.email = ''
      errors.telefone = ''
      errors.endereco = ''
    }
  }
}, { immediate: true })

// Fecha o modal
const handleClose = () => {
  formData.cliente = ''
  formData.cpf = ''
  formData.email = ''
  formData.telefone = ''
  formData.endereco = ''
  
  errors.cliente = ''
  errors.cpf = ''
  errors.email = ''
  errors.telefone = ''
  errors.endereco = ''
  
  isSubmitting.value = false
  emit('close')
}

// Submete o formulário
const handleSubmit = async () => {
  // Valida todos os campos antes de submeter
  const isClienteValid = validateCliente()
  const isCpfValid = validateCpf()
  const isEmailValid = validateEmail()

  if (!isClienteValid || !isCpfValid || !isEmailValid) {
    return
  }

  isSubmitting.value = true

  try {
    // Emite o evento de confirmação com os dados
    // Remove formatação antes de enviar
    const data = {
      cpf: formData.cpf.replace(/\D/g, ''),
      cliente: formData.cliente.trim(),
      email: formData.email.trim() || undefined,
      telefone: formData.telefone.replace(/\D/g, '') || undefined,
      endereco: formData.endereco.trim() || undefined,
      ...(props.isEdicao && props.clienteId ? { id: props.clienteId } : {})
    }
    
    emit('confirm', data)
    
    // Após sucesso, fecha o modal
    handleClose()
  } catch (error) {
    console.error('Erro ao salvar cliente:', error)
    errors.cliente = 'Erro ao salvar. Tente novamente.'
  } finally {
    isSubmitting.value = false
  }
}
</script>
