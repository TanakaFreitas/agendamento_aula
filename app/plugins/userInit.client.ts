export default defineNuxtPlugin(() => {
  const userStore = useUserStore()
  const supabaseUser = useSupabaseUser()

  // Busca perfil inicial se usuário já está autenticado
  if (supabaseUser.value) {
    userStore.fetchProfile()
  }

  // Observa mudanças no estado de autenticação
  watch(supabaseUser, async (newUser) => {
    if (newUser) {
      await userStore.fetchProfile()
    } else {
      userStore.clearProfile()
    }
  })
})
