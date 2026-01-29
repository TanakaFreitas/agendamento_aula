<template>
  <NuxtLayout name="default-layout">
    <div id="especialidades-page" class="p-6">
      <h1 class="text-3xl font-bold text-gray-800 mb-6">Especialidades</h1>
      
      <EspecialidadesTable 
        :especialidades="especialidades"
        :loading="loading"
        :error="error"
      />
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
const { especialidades, loading, error, fetchEspecialidades } = useProfissionais()

onMounted(() => {
  fetchEspecialidades()
})
</script>
