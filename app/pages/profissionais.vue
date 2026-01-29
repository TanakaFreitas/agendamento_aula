<template>
  <NuxtLayout name="default-layout">
    <div id="profissionais-page" class="p-6">
      <h1 class="text-3xl font-bold text-gray-800 mb-6">Profissionais</h1>
      
      <ProfissionaisTable 
        :profissionais="profissionais"
        :loading="loading"
        :error="error"
      />
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
const { profissionais, loading, error, fetchProfissionais } = useProfissionais()

onMounted(() => {
  fetchProfissionais()
})
</script>
