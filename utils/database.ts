import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://kikrrfichntfpghapkny.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtpa3JyZmljaG50ZnBnaGFwa255Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA3MTM3MDcsImV4cCI6MjA0NjI4OTcwN30.nve7enNjzxwdojAFFaZ8q6N1ureSYvTMum6uw9Tn75Y";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);