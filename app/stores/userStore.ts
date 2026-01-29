import { defineStore } from 'pinia'
import type { UserProfile } from '../../shared/types/UserProfile'

export const useUserStore = defineStore('user', () => {
  const supabase = useSupabaseClient()
  const supabaseUser = useSupabaseUser()
  
  // State
  const profile = ref<UserProfile | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Actions
  const fetchProfile = async () => {
    if (!supabaseUser.value) {
      profile.value = null
      return
    }

    // O Supabase retorna o ID no campo 'id' ou 'sub' dependendo do contexto
    const userId = supabaseUser.value.id || (supabaseUser.value as any).sub

    loading.value = true
    error.value = null

    try {
      const { data, error: fetchError } = await supabase
        .from('ag_profiles')
        .select('*')
        .eq('user_id', userId)
        .single()

      if (fetchError) {
        error.value = fetchError.message
        console.error('Erro ao buscar perfil:', fetchError)
        return
      }

      profile.value = data as UserProfile
    } catch (err) {
      error.value = 'Erro ao buscar perfil do usuário'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  const clearProfile = () => {
    profile.value = null
    error.value = null
  }

  // Getters
  const isAdmin = computed(() => profile.value?.role === 'ADMIN')
  const isProfissional = computed(() => profile.value?.role === 'PROFISSIONAL')
  const isUser = computed(() => profile.value?.role === 'USER')
  const userName = computed(() => profile.value?.nome || 'Usuário')

  return {
    // State
    profile,
    loading,
    error,
    
    // Actions
    fetchProfile,
    clearProfile,
    
    // Getters
    isAdmin,
    isProfissional,
    isUser,
    userName
  }
})
