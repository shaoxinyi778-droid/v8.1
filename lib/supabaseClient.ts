import { createClient } from '@supabase/supabase-js';

// IMPORTANT: Replace these with your own Supabase project details
// You can find these in your Supabase Dashboard -> Project Settings -> API
const SUPABASE_URL = 'https://skkwnahyqzkaqljdcxkp.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNra3duYWh5cXprYXFsamRjeGtwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAwMDkzNzEsImV4cCI6MjA4NTU4NTM3MX0.qbIBwnE9Cu5QMkZNb1Rc5uqobBtetzW4k5_KsylpAgg';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);