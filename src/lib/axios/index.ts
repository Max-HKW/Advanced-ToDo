/**
 * Node moudles
 */
import axios from 'axios';
import { supabase } from '@/lib/supabase';

/**
 * Envirnment varibles
 */
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

export const http = axios.create({
  baseURL: supabaseUrl,
});

http.interceptors.request.use(async (config) => {
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;

  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
    config.headers['apikey'] = supabaseKey;
  }

  return config;
});
