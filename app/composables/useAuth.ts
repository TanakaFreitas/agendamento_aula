export const useAuth = () => {
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()
  const toast = useToast()

  const login = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) {
        toast.error(error.message || 'Erro ao fazer login')
        return { success: false, error }
      }

      toast.success('Login realizado com sucesso!')
      await navigateTo('/')
      return { success: true, data }
    } catch (err) {
      toast.error('Erro inesperado ao fazer login')
      return { success: false, error: err }
    }
  }

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut()

      if (error) {
        toast.error(error.message || 'Erro ao fazer logout')
        return { success: false, error }
      }

      toast.success('Logout realizado com sucesso!')
      await navigateTo('/login')
      return { success: true }
    } catch (err) {
      toast.error('Erro inesperado ao fazer logout')
      return { success: false, error: err }
    }
  }

  return {
    user,
    login,
    logout
  }
}
