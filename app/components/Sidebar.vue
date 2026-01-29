<template>
  <aside 
    id="sidebar" 
    :class="[
      'bg-white text-gray-800 flex flex-col h-screen border-r border-gray-200 transition-all duration-300',
      isCollapsed ? 'w-20' : 'w-64'
    ]"
  >
    <!-- Cabeçalho -->
    <header class="p-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
      <div v-if="!isCollapsed">
        <h2 class="text-xl font-bold text-gray-800">Menu</h2>
        <p class="text-sm text-gray-600">Navegação</p>
      </div>
      
      <button
        id="btn-toggle-sidebar"
        @click="toggleSidebar"
        class="p-2 hover:bg-gray-200 rounded-lg transition-colors"
        :class="{ 'mx-auto': isCollapsed }"
      >
        <ClientOnly>
          <ChevronLeftIcon v-if="!isCollapsed" class="w-5 h-5 text-gray-600" />
          <ChevronRightIcon v-else class="w-5 h-5 text-gray-600" />
        </ClientOnly>
      </button>
    </header>

    <!-- Conteúdo Principal -->
    <nav class="flex-1 p-4 space-y-2 overflow-y-auto">
      <NuxtLink
        to="/"
        id="btn-dashboard"
        exact-active-class="!bg-blue-50 border-l-4 border-blue-500"
        :class="[
          'w-full px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-gray-800 flex items-center',
          isCollapsed ? 'justify-center' : 'gap-3'
        ]"
      >
        <ClientOnly>
          <ChartBarIcon class="w-5 h-5 flex-shrink-0" />
        </ClientOnly>
        <span v-if="!isCollapsed">Dashboard</span>
      </NuxtLink>
      
      <NuxtLink
        to="/especialidades"
        id="btn-especialidades"
        active-class="!bg-blue-50 border-l-4 border-blue-500"
        :class="[
          'w-full px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-gray-800 flex items-center',
          isCollapsed ? 'justify-center' : 'gap-3'
        ]"
      >
        <ClientOnly>
          <AcademicCapIcon class="w-5 h-5 flex-shrink-0" />
        </ClientOnly>
        <span v-if="!isCollapsed">Especialidades</span>
      </NuxtLink>
      
      <NuxtLink
        to="/agendamentos"
        id="btn-agendamentos"
        active-class="!bg-blue-50 border-l-4 border-blue-500"
        :class="[
          'w-full px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-gray-800 flex items-center',
          isCollapsed ? 'justify-center' : 'gap-3'
        ]"
      >
        <ClientOnly>
          <CalendarIcon class="w-5 h-5 flex-shrink-0" />
        </ClientOnly>
        <span v-if="!isCollapsed">Agendamentos</span>
      </NuxtLink>
      
      <NuxtLink
        to="/clientes"
        id="btn-clientes"
        active-class="!bg-blue-50 border-l-4 border-blue-500"
        :class="[
          'w-full px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-gray-800 flex items-center',
          isCollapsed ? 'justify-center' : 'gap-3'
        ]"
      >
        <ClientOnly>
          <UsersIcon class="w-5 h-5 flex-shrink-0" />
        </ClientOnly>
        <span v-if="!isCollapsed">Clientes</span>
      </NuxtLink>
      
      <NuxtLink
        to="/profissionais"
        id="btn-profissionais"
        active-class="!bg-blue-50 border-l-4 border-blue-500"
        :class="[
          'w-full px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-gray-800 flex items-center',
          isCollapsed ? 'justify-center' : 'gap-3'
        ]"
      >
        <ClientOnly>
          <UserGroupIcon class="w-5 h-5 flex-shrink-0" />
        </ClientOnly>
        <span v-if="!isCollapsed">Profissionais</span>
      </NuxtLink>
    </nav>

    <!-- Rodapé -->
    <footer class="p-4 bg-gray-50 border-t border-gray-200">
      <DropdownMenu>
        <template #trigger>
          <button
            id="btn-configuracoes"
            :class="[
              'w-full px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors flex items-center text-gray-800',
              isCollapsed ? 'justify-center' : 'gap-3'
            ]"
          >
            <ClientOnly>
              <UserCircleIcon class="w-5 h-5 flex-shrink-0" />
            </ClientOnly>
            <span v-if="!isCollapsed">Configurações</span>
          </button>
        </template>
      </DropdownMenu>
    </footer>
  </aside>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { 
  ChartBarIcon, 
  AcademicCapIcon, 
  CalendarIcon, 
  UsersIcon, 
  UserGroupIcon,
  UserCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/vue/24/outline'
import DropdownMenu from '~/components/DropdownMenu.vue'

const isCollapsed = ref(false)

onMounted(() => {
  const saved = localStorage.getItem('sidebar-collapsed')
  if (saved !== null) {
    isCollapsed.value = saved === 'true'
  }
})

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value
  localStorage.setItem('sidebar-collapsed', String(isCollapsed.value))
}
</script>
