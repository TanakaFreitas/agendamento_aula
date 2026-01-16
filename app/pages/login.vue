<template>
  <div class="min-h-screen flex">
    <!-- Left Column - Login Form -->
    <div class="flex-1 flex items-center justify-center p-8 bg-neutral-50">
      <LoginForm />
    </div>

    <!-- Right Column - Branding -->
    <div class="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary-600 to-primary-800 p-12 flex-col justify-between">
      <div>
        <div class="flex items-center gap-3">
          <div class="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center">
            <CalendarIcon class="w-7 h-7 text-white" />
          </div>
          <h1 class="text-2xl font-bold text-white">
            AgendaFácil
          </h1>
        </div>
      </div>

      <div class="space-y-6">
        <h2 class="text-4xl font-bold text-white leading-tight">
          Gerencie seus agendamentos de forma simples e eficiente
        </h2>
        <p class="text-lg text-primary-100">
          Organize horários, acompanhe compromissos e otimize seu tempo com nossa plataforma intuitiva.
        </p>
        
        <div class="flex gap-8 pt-4">
          <div>
            <div class="text-3xl font-bold text-white mb-1">500+</div>
            <div class="text-primary-200 text-sm">Usuários ativos</div>
          </div>
          <div>
            <div class="text-3xl font-bold text-white mb-1">10k+</div>
            <div class="text-primary-200 text-sm">Agendamentos</div>
          </div>
          <div>
            <div class="text-3xl font-bold text-white mb-1">98%</div>
            <div class="text-primary-200 text-sm">Satisfação</div>
          </div>
        </div>
      </div>

      <div class="text-primary-200 text-sm">
        © 2026 AgendaFácil. Todos os direitos reservados.
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CalendarIcon } from '@heroicons/vue/24/outline'
</script>
