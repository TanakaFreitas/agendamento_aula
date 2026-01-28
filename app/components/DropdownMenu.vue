<template>
  <div id="dropdown-menu" class="relative">
    <!-- Trigger slot -->
    <div @click="toggleMenu">
      <slot name="trigger" />
    </div>

    <!-- Menu dropdown -->
    <Transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div
        v-if="isOpen"
        id="dropdown-content"
        class="absolute bottom-full left-0 mb-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50"
      >
        <button
          id="btn-perfil"
          class="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 flex items-center gap-3 transition-colors"
        >
          <ClientOnly>
            <UserIcon class="w-5 h-5" />
          </ClientOnly>
          <span>Perfil</span>
        </button>

        <div class="border-t border-gray-200 my-1"></div>

        <button
          id="btn-sair"
          class="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 flex items-center gap-3 transition-colors"
          @click="handleLogout"
        >
          <ClientOnly>
            <ArrowRightOnRectangleIcon class="w-5 h-5" />
          </ClientOnly>
          <span>Sair</span>
        </button>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { UserIcon, ArrowRightOnRectangleIcon } from '@heroicons/vue/24/outline'
import { useAuth } from '~/composables/useAuth'

const isOpen = ref(false)
const { logout } = useAuth()

const toggleMenu = () => {
  isOpen.value = !isOpen.value
}

const closeMenu = () => {
  isOpen.value = false
}

const handleLogout = async () => {
  closeMenu()
  await logout()
}

// Fechar menu ao clicar fora
const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement
  if (!target.closest('#dropdown-menu')) {
    closeMenu()
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
