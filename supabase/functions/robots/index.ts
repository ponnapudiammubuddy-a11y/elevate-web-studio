import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Content-Type': 'text/plain',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    console.log('Fetching robots.txt content...');

    const { data, error } = await supabase
      .from('global_seo_settings')
      .select('robots_txt_content')
      .limit(1)
      .maybeSingle();

    if (error) {
      console.error('Error fetching robots.txt:', error);
      throw error;
    }

    const robotsContent = data?.robots_txt_content || `User-agent: *
Allow: /

Sitemap: https://www.thahaseenweb.site/sitemap.xml`;

    console.log('Robots.txt served successfully');

    return new Response(robotsContent, {
      headers: corsHeaders,
    });
  } catch (error) {
    console.error('Error serving robots.txt:', error);
    return new Response(
      `User-agent: *
Allow: /

Sitemap: https://www.thahaseenweb.site/sitemap.xml`,
      { headers: corsHeaders }
    );
  }
});
