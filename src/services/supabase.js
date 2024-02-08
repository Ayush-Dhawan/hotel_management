import { createClient } from '@supabase/supabase-js'



export const supabaseUrl = 'https://jaaramkfipybtkkixsmc.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImphYXJhbWtmaXB5YnRra2l4c21jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDUyMTc3MjMsImV4cCI6MjAyMDc5MzcyM30.P2PGHeYoxarSs04geYScGABqI0_CX0YGERWKP9Xgl-o"
const supabase = createClient(supabaseUrl, supabaseKey)


export default supabase;