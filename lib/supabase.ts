import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const supabase = createClient(supabaseUrl, supabaseKey,{
    auth: {
        persistSession: false,
        autoRefreshToken: false,
    }
});
