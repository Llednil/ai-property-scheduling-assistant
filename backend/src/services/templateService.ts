import { supabase } from "./supabaseClient";

async function getTemplates(zone?: string) {
    const query = supabase.from("templates").select("*");
  
    let result;
    if (zone) {
      result = await query.eq("zone", zone);
    } else {
      result = await query;
    }
  
    if (result.error) throw result.error;
    return result.data;
}

async function createTemplate(name: string, body: string, zone: string) {
    const { data, error } = await supabase.from('templates').insert({ name, body, zone }).select().single();
    if (error) throw error;
    return data;
}

async function updateTemplate(id: string, name: string, body: string, zone: string) {
    const { data, error } = await supabase.from('templates').update({ name, body, zone }).eq('id', id).select().single();
    if (error) throw error;
    return data;
}

async function deleteTemplate(id: string) {
    const { data, error } = await supabase.from('templates').delete().eq('id', id).select().single();
    if (error) throw error;
    return data;
}

export { getTemplates, createTemplate, updateTemplate, deleteTemplate };