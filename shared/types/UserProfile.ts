export type UserRole = 'USER' | 'ADMIN' | 'PROFISSIONAL'

export interface UserProfile {
  id: number
  created_at: string
  user_id: string | null
  nome: string | null
  role: UserRole | null
}
