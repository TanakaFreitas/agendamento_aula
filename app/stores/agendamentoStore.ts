import { defineStore } from 'pinia'

export const useAgendamentoStore = defineStore('agendamento', () => {
  // Estado reativo
  const dataReferencia = ref<Date>(new Date())

  // Computed reativo - diasSemana sempre atualiza quando dataReferencia muda
  const diasSemana = computed(() => {
    const dias: Date[] = []
    const referencia = new Date(dataReferencia.value)
    
    // Descobrir qual dia da semana é (0 = domingo, 6 = sábado)
    const diaDaSemana = referencia.getDay()
    
    // Calcular o domingo da semana (subtrair o número do dia da semana)
    const domingo = new Date(referencia)
    domingo.setDate(referencia.getDate() - diaDaSemana)
    
    // Gerar array com os 7 dias da semana (domingo a sábado)
    for (let i = 0; i < 7; i++) {
      const dia = new Date(domingo)
      dia.setDate(domingo.getDate() + i)
      dias.push(dia)
    }
    
    return dias
  })

  // Avançar 7 dias
  function avancarSemana() {
    const novaData = new Date(dataReferencia.value)
    novaData.setDate(novaData.getDate() + 7)
    dataReferencia.value = novaData
  }

  // Voltar 7 dias
  function voltarSemana() {
    const novaData = new Date(dataReferencia.value)
    novaData.setDate(novaData.getDate() - 7)
    dataReferencia.value = novaData
  }

  function setDataReferencia(novaData: Date) {
    dataReferencia.value = novaData
  }

  return {
    dataReferencia,
    diasSemana,
    avancarSemana,
    voltarSemana,
    setDataReferencia
  }
})
