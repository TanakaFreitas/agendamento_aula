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

    <form class="space-y-5">
      <BaseInput
        type="email"
        label="E-mail"
        placeholder="seu@email.com"
        required
        id="login-email-form"
      />

      <BaseInput
        type="password"
        label="Senha"
        placeholder="••••••••"
        required
        id="login-password-form"
      />

      <div class="flex items-center justify-between text-sm">
        <label class="flex items-center gap-2 cursor-pointer">
          <input
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
      >
        Entrar
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
</script>
