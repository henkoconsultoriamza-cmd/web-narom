import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://ojtydeemezhuujwbnvep.supabase.co'
const SUPABASE_KEY = 'sb_publishable_qYhb59mKiD2soQLOvTVWPA_nCV-VtJo'

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)
