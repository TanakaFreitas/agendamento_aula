<template>
  <div class="w-full max-w-md space-y-6">
    <div class="text-center">
      <h2 class="text-3xl font-bold text-neutral-900 mb-2">
        Bem-vindo de volta
      </h2>
      <p class="text-neutral-600">
        Entre com suas credenciais para acessar o sistema
      </p>
    </div>

    <form @submit.prevent="handleLogin" class="space-y-5">
      <BaseInput
        v-model="formData.email"
        type="email"
        label="E-mail"
        placeholder="seu@email.com"
        required
        id="login-email-form"
        :icon="EnvelopeIcon"
      />

      <BaseInput
        v-model="formData.password"
        type="password"
        label="Senha"
        placeholder="••••••••"
        required
        id="login-password-form"
        :icon="LockClosedIcon"
      />

      <div class="flex items-center justify-between text-sm">
        <label class="flex items-center gap-2 cursor-pointer">
          <input
            v-model="formData.rememberMe"
            type="checkbox"
            class="w-4 h-4 rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
          />
          <span class="text-neutral-700">Lembrar-me</span>
        </label>
        
        <a href="#" class="text-primary-600 hover:text-primary-700 font-medium">
          Esqueceu a senha?
        </a>
      </div>

      <BaseButton
        type="submit"
        variant="primary"
        size="lg"
        full-width
        :disabled="isLoading"
      >
        {{ isLoading ? 'Entrando...' : 'Entrar' }}
      </BaseButton>
    </form>

    <div class="text-center text-sm text-neutral-600">
      Não tem uma conta?
      <a href="#" class="text-primary-600 hover:text-primary-700 font-medium ml-1">
        Criar conta
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { EnvelopeIcon, LockClosedIcon } from '@heroicons/vue/24/outline'

const { login } = useAuth()

const formData = ref({
  email: '',
  password: '',
  rememberMe: false
})

const isLoading = ref(false)

const handleLogin = async () => {
  if (!formData.value.email || !formData.value.password) {
    return
  }

  isLoading.value = true
  await login(formData.value.email, formData.value.password)
  isLoading.value = false
}
</script>
