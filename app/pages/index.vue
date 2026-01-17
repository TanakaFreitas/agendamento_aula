<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex flex-col">
    <!-- Header com informações do usuário -->
    <header class="p-4 flex justify-end items-center gap-4">
      <div v-if="user" class="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
        <div class="flex items-center gap-2">
          <ClientOnly>
            <UserCircleIcon class="w-6 h-6 text-white" />
          </ClientOnly>
          <span class="text-white font-medium">{{ user.email }}</span>
        </div>
        
        <BaseButton
          variant="outline"
          size="sm"
          @click="handleLogout"
          class="!text-white !border-white hover:!bg-white/20"
        >
          <span class="flex items-center gap-2">
            <ClientOnly>
              <ArrowRightOnRectangleIcon class="w-4 h-4" />
            </ClientOnly>
            Sair
          </span>
        </BaseButton>
      </div>
    </header>

    <!-- Conteúdo principal -->
    <div class="flex-1 flex items-center justify-center p-4">
      <div class="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full">
        <h1 class="text-4xl font-bold text-gray-800 mb-4">
          Olá, Nuxt 4! 👋
        </h1>
        
        <p class="text-gray-600 mb-6">
          Este é um teste do Tailwind CSS. Se você está vendo este conteúdo estilizado, 
          tudo está funcionando perfeitamente!
        </p>

        <div class="space-y-4">
          <button 
            class="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
          >
            Botão Primário
          </button>

          <button 
            class="w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
          >
            Botão Secundário
          </button>
        </div>

        <div class="mt-6 p-4 bg-green-50 border-l-4 border-green-500 rounded">
          <p class="text-green-700 font-medium">
            ✓ Tailwind CSS está funcionando!
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { UserCircleIcon, ArrowRightOnRectangleIcon } from '@heroicons/vue/24/outline'

const { user, logout } = useAuth()

const handleLogout = async () => {
  await logout()
}
</script>
