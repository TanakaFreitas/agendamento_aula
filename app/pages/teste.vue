<template>
  <NuxtLayout name="default-layout">
  <div class="min-h-screen bg-neutral-50 py-12 px-4">
    <div class="max-w-4xl mx-auto space-y-12">
      
      <!-- Header -->
      <div class="text-center">
        <h1 class="text-4xl font-bold text-neutral-900 mb-2">
          Teste de Componentes
        </h1>
        <p class="text-neutral-600">
          Avaliação do BaseButton e BaseInput
        </p>
      </div>

      <!-- BaseButton Section -->
      <section class="bg-white rounded-xl shadow-md p-8">
        <h2 class="text-2xl font-bold text-neutral-900 mb-6">
          BaseButton
        </h2>
        
        <div class="space-y-8">
          <!-- Variants -->
          <div>
            <h3 class="text-lg font-semibold text-neutral-700 mb-4">Variantes</h3>
            <div class="flex flex-wrap gap-3">
              <BaseButton variant="primary">
                <span class="flex items-center gap-2">
                  <UserIcon class="w-5 h-5" />
                  Primary
                </span>
              </BaseButton>
              <BaseButton variant="secondary">
                <span class="flex items-center gap-2">
                  <Cog6ToothIcon class="w-5 h-5" />
                  Secondary
                </span>
              </BaseButton>
              <BaseButton variant="success">
                <span class="flex items-center gap-2">
                  <CheckCircleIcon class="w-5 h-5" />
                  Success
                </span>
              </BaseButton>
              <BaseButton variant="error">
                <span class="flex items-center gap-2">
                  <TrashIcon class="w-5 h-5" />
                  Error
                </span>
              </BaseButton>
              <BaseButton variant="outline">
                <span class="flex items-center gap-2">
                  <PencilIcon class="w-5 h-5" />
                  Outline
                </span>
              </BaseButton>
            </div>
          </div>

          <!-- Sizes -->
          <div>
            <h3 class="text-lg font-semibold text-neutral-700 mb-4">Tamanhos</h3>
            <div class="flex flex-wrap items-center gap-3">
              <BaseButton size="sm">
                <span class="flex items-center gap-1.5">
                  <PlusIcon class="w-4 h-4" />
                  Small
                </span>
              </BaseButton>
              <BaseButton size="md">
                <span class="flex items-center gap-2">
                  <PlusIcon class="w-5 h-5" />
                  Medium
                </span>
              </BaseButton>
              <BaseButton size="lg">
                <span class="flex items-center gap-2">
                  <PlusIcon class="w-6 h-6" />
                  Large
                </span>
              </BaseButton>
            </div>
          </div>

          <!-- States -->
          <div>
            <h3 class="text-lg font-semibold text-neutral-700 mb-4">Estados</h3>
            <div class="flex flex-wrap gap-3">
              <BaseButton>Normal</BaseButton>
              <BaseButton disabled>Disabled</BaseButton>
            </div>
          </div>

          <!-- Full Width -->
          <div>
            <h3 class="text-lg font-semibold text-neutral-700 mb-4">Full Width</h3>
            <BaseButton full-width variant="primary">
              <span class="flex items-center justify-center gap-2">
                <CalendarIcon class="w-5 h-5" />
                Agendar Horário
              </span>
            </BaseButton>
          </div>
        </div>
      </section>

      <!-- BaseInput Section -->
      <section class="bg-white rounded-xl shadow-md p-8">
        <h2 class="text-2xl font-bold text-neutral-900 mb-6">
          BaseInput
        </h2>
        
        <div class="space-y-6 max-w-md">
          <!-- Basic Input with Icon -->
          <div>
            <label class="block text-sm font-medium text-neutral-700 mb-1.5">
              Nome
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <UserIcon class="h-5 w-5 text-neutral-400" />
              </div>
              <input
                v-model="formData.name"
                type="text"
                placeholder="Digite seu nome"
                class="block w-full pl-10 pr-4 py-2.5 border border-neutral-300 rounded-lg text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>

          <!-- Email Input with Icon -->
          <div>
            <label class="block text-sm font-medium text-neutral-700 mb-1.5">
              E-mail <span class="text-error-500">*</span>
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <EnvelopeIcon class="h-5 w-5 text-neutral-400" />
              </div>
              <input
                v-model="formData.email"
                type="email"
                placeholder="seu@email.com"
                required
                class="block w-full pl-10 pr-4 py-2.5 border border-neutral-300 rounded-lg text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            <p class="mt-1.5 text-sm text-neutral-500">Seu e-mail não será compartilhado</p>
          </div>

          <!-- Password Input with Icon and Error -->
          <div>
            <label class="block text-sm font-medium text-neutral-700 mb-1.5">
              Senha
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LockClosedIcon class="h-5 w-5 text-neutral-400" />
              </div>
              <input
                v-model="formData.password"
                type="password"
                placeholder="Digite sua senha"
                :class="[
                  'block w-full pl-10 py-2.5 border rounded-lg text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2',
                  passwordError 
                    ? 'pr-10 border-error-300 focus:border-error-500 focus:ring-error-500' 
                    : 'pr-4 border-neutral-300 focus:border-primary-500 focus:ring-primary-500'
                ]"
              />
              <div v-if="passwordError" class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span class="text-error-500 text-sm">⚠</span>
              </div>
            </div>
            <p v-if="passwordError" class="mt-1.5 text-sm text-error-600">{{ passwordError }}</p>
          </div>

          <!-- Phone Input with Icon -->
          <div>
            <label class="block text-sm font-medium text-neutral-700 mb-1.5">
              Telefone
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <PhoneIcon class="h-5 w-5 text-neutral-400" />
              </div>
              <input
                v-model="formData.phone"
                type="tel"
                placeholder="(00) 00000-0000"
                class="block w-full pl-10 pr-4 py-2.5 border border-neutral-300 rounded-lg text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>

          <!-- Date Input with Icon -->
          <div>
            <label class="block text-sm font-medium text-neutral-700 mb-1.5">
              Data de Agendamento
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <CalendarDaysIcon class="h-5 w-5 text-neutral-400" />
              </div>
              <input
                v-model="formData.date"
                type="date"
                class="block w-full pl-10 pr-4 py-2.5 border border-neutral-300 rounded-lg text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>

          <!-- Disabled Input with Icon -->
          <div>
            <label class="block text-sm font-medium text-neutral-700 mb-1.5">
              Campo Desabilitado
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LockClosedIcon class="h-5 w-5 text-neutral-300" />
              </div>
              <input
                value="Campo desabilitado"
                disabled
                class="block w-full pl-10 pr-4 py-2.5 border border-neutral-300 rounded-lg text-neutral-900 bg-neutral-50 cursor-not-allowed"
              />
            </div>
          </div>
        </div>

        <!-- Form Data Display -->
        <div class="mt-8 p-4 bg-neutral-50 rounded-lg border border-neutral-200">
          <h3 class="text-sm font-semibold text-neutral-700 mb-2">Dados do Formulário:</h3>
          <pre class="text-xs text-neutral-600">{{ formData }}</pre>
        </div>
      </section>

      <!-- Toast Section -->
      <section class="bg-white rounded-xl shadow-md p-8">
        <h2 class="text-2xl font-bold text-neutral-900 mb-6">
          Toast Notifications
        </h2>
        
        <div class="space-y-6">
          <div>
            <h3 class="text-lg font-semibold text-neutral-700 mb-4">Tipos de Notificação</h3>
            <div class="flex flex-wrap gap-3">
              <BaseButton variant="success" @click="showSuccessToast">
                <span class="flex items-center gap-2">
                  <CheckCircleIcon class="w-5 h-5" />
                  Success Toast
                </span>
              </BaseButton>
              
              <BaseButton variant="error" @click="showErrorToast">
                <span class="flex items-center gap-2">
                  <XMarkIcon class="w-5 h-5" />
                  Error Toast
                </span>
              </BaseButton>
              
              <BaseButton variant="primary" @click="showInfoToast">
                <span class="flex items-center gap-2">
                  <InformationCircleIcon class="w-5 h-5" />
                  Info Toast
                </span>
              </BaseButton>
              
              <BaseButton variant="secondary" @click="showWarningToast">
                <span class="flex items-center gap-2">
                  <ExclamationTriangleIcon class="w-5 h-5" />
                  Warning Toast
                </span>
              </BaseButton>
              
              <BaseButton variant="outline" @click="showLoadingToast">
                <span class="flex items-center gap-2">
                  <ArrowPathIcon class="w-5 h-5" />
                  Loading Toast
                </span>
              </BaseButton>
            </div>
          </div>

          <div>
            <h3 class="text-lg font-semibold text-neutral-700 mb-4">Toast com Ação</h3>
            <BaseButton variant="primary" @click="showActionToast">
              <span class="flex items-center gap-2">
                <BellIcon class="w-5 h-5" />
                Toast com Botão
              </span>
            </BaseButton>
          </div>
        </div>
      </section>

      <!-- Combined Example -->
      <section class="bg-white rounded-xl shadow-md p-8">
        <h2 class="text-2xl font-bold text-neutral-900 mb-6">
          Exemplo de Uso Combinado
        </h2>
        
        <form @submit.prevent="handleSubmit" class="space-y-6 max-w-md">
          <BaseInput
            v-model="loginData.email"
            type="email"
            label="E-mail"
            placeholder="seu@email.com"
            required
            id="login-email"
          />

          <BaseInput
            v-model="loginData.password"
            type="password"
            label="Senha"
            placeholder="••••••••"
            required
            id="login-password"
          />

          <div class="flex gap-3">
            <BaseButton type="submit" full-width variant="primary">
              <span class="flex items-center justify-center gap-2">
                <ArrowRightOnRectangleIcon class="w-5 h-5" />
                Entrar
              </span>
            </BaseButton>
            <BaseButton type="button" variant="outline" @click="resetForm">
              <span class="flex items-center justify-center gap-2">
                <XMarkIcon class="w-5 h-5" />
                Limpar
              </span>
            </BaseButton>
          </div>
        </form>

        <div v-if="submitMessage" class="mt-4 p-4 bg-success-50 border border-success-200 rounded-lg">
          <p class="text-success-800">{{ submitMessage }}</p>
        </div>
      </section>

    </div>
  </div>
  </NuxtLayout>
</template>


<script setup lang="ts">
import { ref, computed } from 'vue'
import { 
  UserIcon, 
  Cog6ToothIcon, 
  CheckCircleIcon, 
  TrashIcon, 
  PencilIcon,
  PlusIcon,
  CalendarIcon,
  CalendarDaysIcon,
  ArrowRightOnRectangleIcon,
  XMarkIcon,
  EnvelopeIcon,
  LockClosedIcon,
  PhoneIcon,
  InformationCircleIcon,
  ExclamationTriangleIcon,
  ArrowPathIcon,
  BellIcon
} from '@heroicons/vue/24/outline'

const toast = useToast()

const formData = ref({
  name: '',
  email: '',
  password: '',
  phone: '',
  date: ''
})

const loginData = ref({
  email: '',
  password: ''
})

const submitMessage = ref('')

const passwordError = computed(() => {
  if (formData.value.password && formData.value.password.length < 6) {
    return 'A senha deve ter no mínimo 6 caracteres'
  }
  return ''
})

const handleSubmit = () => {
  submitMessage.value = `Login realizado com sucesso! E-mail: ${loginData.value.email}`
  setTimeout(() => {
    submitMessage.value = ''
  }, 3000)
}

const showSuccessToast = () => {
  toast.success('Operação realizada com sucesso!')
}

const showErrorToast = () => {
  toast.error('Ocorreu um erro ao processar sua solicitação')
}

const showInfoToast = () => {
  toast.info('Esta é uma informação importante')
}

const showWarningToast = () => {
  toast.warning('Atenção! Verifique os dados inseridos')
}

const showLoadingToast = () => {
  toast.loading('Carregando dados...')
}

const showActionToast = () => {
  toast.success('Agendamento realizado!', {
    action: {
      label: 'Ver detalhes',
      onClick: () => console.log('Ação clicada!')
    }
  })
}

const resetForm = () => {
  loginData.value.email = ''
  loginData.value.password = ''
  submitMessage.value = ''
}
</script>
