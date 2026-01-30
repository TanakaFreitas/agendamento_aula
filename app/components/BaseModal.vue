<template>
  <Teleport to="body">
    <Transition name="modal">
      <div 
        v-if="isOpen"
        :id="`base-modal-${id}`"
        class="fixed inset-0 z-50 overflow-y-auto"
        @mousedown="handleBackdropMouseDown"
        @click.self="handleBackdropClick"
      >
        <!-- Overlay -->
        <div class="fixed inset-0 bg-black bg-opacity-50 transition-opacity"></div>
        
        <!-- Modal Container -->
        <div class="flex min-h-full items-center justify-center p-4">
          <div 
            :class="modalSizeClasses"
            class="relative bg-white rounded-lg shadow-xl transform transition-all w-full overflow-hidden"
            @click.stop
            @mousedown.stop
          >
            <!-- Header -->
            <div class="flex items-center justify-between px-6 py-4 border-b border-neutral-200 bg-white">
              <h3 class="text-lg font-semibold text-neutral-900">
                {{ title }}
              </h3>
              <button
                v-if="closable"
                type="button"
                @click="handleClose"
                class="text-neutral-400 hover:text-neutral-600 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 rounded"
              >
                <span class="sr-only">Fechar</span>
                <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <!-- Content -->
            <div class="px-6 py-4 bg-white">
              <slot />
            </div>

            <!-- Footer -->
            <div v-if="$slots.footer" class="flex items-center justify-end gap-3 px-6 py-4 border-t border-neutral-200 bg-neutral-50">
              <slot name="footer" />
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue'

interface Props {
  isOpen: boolean
  title: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  closable?: boolean
  closeOnBackdrop?: boolean
  id?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  closable: true,
  closeOnBackdrop: true,
  id: 'default'
})

const emit = defineEmits<{
  close: []
}>()

const mouseDownOnBackdrop = ref(false)

const modalSizeClasses = computed(() => {
  const sizes = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl'
  }
  return sizes[props.size]
})

const handleClose = () => {
  emit('close')
}

const handleBackdropMouseDown = (event: MouseEvent) => {
  // Marca que o mousedown ocorreu no backdrop (não no modal)
  mouseDownOnBackdrop.value = event.target === event.currentTarget
}

const handleBackdropClick = (event: MouseEvent) => {
  // Só fecha se closeOnBackdrop estiver ativo E o mousedown também foi no backdrop
  if (props.closeOnBackdrop && mouseDownOnBackdrop.value) {
    handleClose()
  }
  // Reset para o próximo clique
  mouseDownOnBackdrop.value = false
}

// Previne scroll do body quando modal está aberto
watch(() => props.isOpen, (isOpen) => {
  if (isOpen) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .relative,
.modal-leave-active .relative {
  transition: transform 0.3s ease;
}

.modal-enter-from .relative,
.modal-leave-to .relative {
  transform: scale(0.95);
}
</style>
