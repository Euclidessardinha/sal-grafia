import { supabase } from "./supabase";

export async function testSupabaseConnection() {
  const { data, error } = await supabase
    .from("test_connection")
    .select("*");

  console.log("Supabase data:", data);
  console.log("Supabase error:", error);
}