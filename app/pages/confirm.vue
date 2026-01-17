<script setup lang="ts">
import { useSupabaseUser, useSupabaseCookieRedirect } from '#imports'
import { navigateTo } from '#app'

const user = useSupabaseUser()
const redirectInfo = useSupabaseCookieRedirect()

watch(user, () => {
  if (user.value) {
    const path = redirectInfo.pluck()
    return navigateTo(path || '/')
  }
}, { immediate: true })
</script>

<template>
  <div id="confirm-page" class="flex items-center justify-center min-h-screen">
    <div class="text-center">
      <p>Aguardando confirmação do login...</p>
    </div>
  </div>
</template>
