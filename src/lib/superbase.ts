import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://puxkefnscvzzrdsmckjt.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB1eGtlZm5zY3Z6enJkc21ja2p0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ4NTUwMDIsImV4cCI6MjA5MDQzMTAwMn0.b02TnDBYir17BtzA79pec1EO8Lkf3CYJsMGD4ldAXbE';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);