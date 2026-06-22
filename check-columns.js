const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = 'https://tkqsqmgldmmdwtolkore.supabase.co';
const supabaseKey = 'sb_publishable__EgXGobF8gqV3V3AzA2OHQ_DUGUYE4I';
const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
  console.log("Checking if columns originalprice and isofficial exist in products table...");
  const { data, error } = await supabase.from('products').select('id, originalprice, isofficial').limit(1);
  if (error) {
    console.log("Error details:", error);
  } else {
    console.log("Success! Columns exist. Data:", data);
  }
}
check();
