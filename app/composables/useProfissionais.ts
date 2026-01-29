import type { Especialidade } from '../../shared/types/Especialidade'

export const useProfissionais = () => {
  const supabase = useSupabaseClient()
  
  const especialidades = ref<Especialidade[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchEspecialidades = async () => {
    loading.value = true
    error.value = null

    try {
      const { data, error: fetchError } = await supabase
        .from('ag_especialidades')
        .select('id, especialidade')
        .order('especialidade', { ascending: true })

      if (fetchError) {
        error.value = fetchError.message
        console.error('Erro ao buscar especialidades:', fetchError)
        return
      }

      especialidades.value = data as Especialidade[]
    } catch (err) {
      error.value = 'Erro ao buscar especialidades'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  return {
    especialidades,
    loading,
    error,
    fetchEspecialidades
  }
}
