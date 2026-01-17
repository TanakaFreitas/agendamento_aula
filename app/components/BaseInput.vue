<template>
  <div class="w-full">
    <label 
      v-if="label"
      :for="`base-input-${id}`"
      class="block text-sm font-medium text-neutral-700 mb-1.5"
    >
      {{ label }}
      <span v-if="required" class="text-error-500">*</span>
    </label>
    
    <div class="relative">
      <div v-if="icon" class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <ClientOnly>
          <component :is="icon" class="h-5 w-5 text-neutral-400" />
        </ClientOnly>
      </div>
      
      <input
        :id="`base-input-${id}`"
        :type="currentType"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :required="required"
        :class="inputClasses"
        @input="handleInput"
        @blur="$emit('blur', $event)"
        @focus="$emit('focus', $event)"
      />
      
      <button
        v-if="type === 'password'"
        type="button"
        @click="togglePasswordVisibility"
        class="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-neutral-700 transition-colors"
        :class="error ? 'right-8' : 'right-0'"
      >
        <ClientOnly>
          <EyeIcon v-if="showPassword" class="h-5 w-5 text-neutral-400" />
          <EyeSlashIcon v-else class="h-5 w-5 text-neutral-400" />
        </ClientOnly>
      </button>
      
      <div 
        v-else-if="error"
        class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
      >
        <span class="text-error-500 text-sm">⚠</span>
      </div>
    </div>
    
    <p 
      v-if="error"
      class="mt-1.5 text-sm text-error-600"
    >
      {{ error }}
    </p>
    
    <p 
      v-else-if="hint"
      class="mt-1.5 text-sm text-neutral-500"
    >
      {{ hint }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { EyeIcon, EyeSlashIcon } from '@heroicons/vue/24/outline'
import type { Component } from 'vue'

interface Props {
  modelValue?: string | number
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'date' | 'time' | 'datetime-local'
  label?: string
  placeholder?: string
  hint?: string
  error?: string
  disabled?: boolean
  required?: boolean
  id?: string
  icon?: Component
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  type: 'text',
  disabled: false,
  required: false,
  id: 'default'
})

const showPassword = ref(false)
const currentType = computed(() => {
  if (props.type === 'password' && showPassword.value) {
    return 'text'
  }
  return props.type
})

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

const emit = defineEmits<{
  'update:modelValue': [value: string]
  blur: [event: FocusEvent]
  focus: [event: FocusEvent]
}>()

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}

const inputClasses = computed(() => {
  const base = 'block w-full rounded-lg border py-2.5 text-neutral-900 placeholder-neutral-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:bg-neutral-50 disabled:cursor-not-allowed'
  
  const paddingLeft = props.icon ? 'pl-10' : 'px-4'
  const paddingRight = props.type === 'password' || props.error ? 'pr-10' : 'pr-4'
  
  const errorClasses = props.error
    ? 'border-error-300 focus:border-error-500 focus:ring-error-500'
    : 'border-neutral-300 focus:border-primary-500 focus:ring-primary-500'
  
  return `${base} ${paddingLeft} ${paddingRight} ${errorClasses}`
})
</script>
