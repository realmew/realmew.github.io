import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://aaislnpcmetdvsugnggz.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFhaXNsbnBjbWV0ZHZzdWduZ2d6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI3ODMzNjQsImV4cCI6MjA2ODM1OTM2NH0.wwkEVh5Qm3oIjPQptWJp8OMbd-GZk7fUjcOocL403oI';

export const supabase = createClient(supabaseUrl, supabaseKey);
