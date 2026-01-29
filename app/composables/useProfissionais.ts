import type { Especialidade } from '../../shared/types/Especialidade'
import type { Profissional } from '../../shared/types/Profissional'

export const useProfissionais = () => {
  const supabase = useSupabaseClient()
  
  const especialidades = ref<Especialidade[]>([])
  const profissionais = ref<Profissional[]>([])
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

  const addEspecialidade = async (especialidade: string) => {
    loading.value = true
    error.value = null

    try {
      const { data, error: rpcError } = await supabase
        .rpc('ag_add_especialidade', {
          p_especialidade: especialidade
        } as any)

      if (rpcError) {
        error.value = rpcError.message
        console.error('Erro ao adicionar especialidade:', rpcError)
        return { success: false, message: rpcError.message }
      }

      return data as { success: boolean; message: string }
    } catch (err) {
      error.value = 'Erro ao adicionar especialidade'
      console.error(err)
      return { success: false, message: 'Erro ao adicionar especialidade' }
    } finally {
      loading.value = false
    }
  }

  const updateEspecialidade = async (id: number, novaEspecialidade: string) => {
    loading.value = true
    error.value = null

    try {
      const { data, error: rpcError } = await supabase
        .rpc('ag_update_especialidade', {
          p_id: id,
          p_nova_especialidade: novaEspecialidade
        } as any)

      if (rpcError) {
        error.value = rpcError.message
        console.error('Erro ao atualizar especialidade:', rpcError)
        return { success: false, message: rpcError.message }
      }

      return data as { success: boolean; message: string }
    } catch (err) {
      error.value = 'Erro ao atualizar especialidade'
      console.error(err)
      return { success: false, message: 'Erro ao atualizar especialidade' }
    } finally {
      loading.value = false
    }
  }

  const getEspecialidadeById = (id: number): Especialidade | undefined => {
    return especialidades.value.find(esp => esp.id === id)
  }

  const deleteEspecialidade = async (id: number) => {
    loading.value = true
    error.value = null

    try {
      const { error: deleteError } = await supabase
        .from('ag_especialidades')
        .delete()
        .eq('id', id)

      if (deleteError) {
        error.value = deleteError.message
        console.error('Erro ao deletar especialidade:', deleteError)
        return { success: false, message: deleteError.message }
      }

      return { success: true, message: 'Especialidade deletada com sucesso' }
    } catch (err) {
      error.value = 'Erro ao deletar especialidade'
      console.error(err)
      return { success: false, message: 'Erro ao deletar especialidade' }
    } finally {
      loading.value = false
    }
  }

  const fetchProfissionais = async () => {
    loading.value = true
    error.value = null

    try {
      const { data, error: rpcError } = await supabase
        .rpc('ag_get_profissionais')

      if (rpcError) {
        error.value = rpcError.message
        console.error('Erro ao buscar profissionais:', rpcError)
        return
      }

      profissionais.value = data as Profissional[]
    } catch (err) {
      error.value = 'Erro ao buscar profissionais'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  return {
    especialidades,
    profissionais,
    loading,
    error,
    fetchEspecialidades,
    addEspecialidade,
    updateEspecialidade,
    getEspecialidadeById,
    deleteEspecialidade,
    fetchProfissionais
  }
}
