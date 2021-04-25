export interface Job {
  id: number
  title: string
  description: string
  salary_range_max: number
  salary_range_min: number
  is_private: boolean
  is_active: boolean
  quantity: number
  career_id: number
  career_seniority_id: number
  flow_id: string
  business_owner_id: string
}
