import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://tkqsqmgldmmdwtolkore.supabase.co';
const supabaseKey = 'sb_publishable__EgXGobF8gqV3V3AzA2OHQ_DUGUYE4I';

export const supabase = createClient(supabaseUrl, supabaseKey);
