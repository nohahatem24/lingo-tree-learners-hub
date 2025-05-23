
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";

export type UserRole = "student" | "teacher" | "parent" | "admin";

export interface UserProfile {
  id: string;
  email: string;
  role: UserRole;
  display_name: string | null;
  avatar_url: string | null;
  first_name?: string | null;
  last_name?: string | null;
  date_of_birth?: string | null;
  gender?: string | null;
  language?: string | null;
  phone?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  if (error) throw error;
  return data;
}

export async function signUp(email: string, password: string, role: UserRole, displayName: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        role,
        display_name: displayName,
      },
    },
  });
  
  if (error) throw error;
  
  // Create profile record
  if (data.user) {
    await supabase.from('profiles').insert({
      id: data.user.id,
      email: data.user.email,
      role,
      display_name: displayName,
    });
  }
  
  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function getCurrentUser(): Promise<User | null> {
  const { data } = await supabase.auth.getUser();
  return data.user;
}

export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
    
  if (error || !data) return null;
  
  // Mock the required fields that might not exist in the profiles table
  const mockProfile: UserProfile = {
    id: data.id,
    email: data.email || '',
    role: (data.role as UserRole) || 'student',
    display_name: data.display_name || null,
    avatar_url: data.avatar_url || null,
    first_name: data.first_name || null,
    last_name: data.last_name || null,
    date_of_birth: data.date_of_birth || null,
    gender: data.gender || null,
    language: data.language || null,
    phone: data.phone || null,
    created_at: data.created_at || null,
    updated_at: data.updated_at || null
  };
  
  return mockProfile;
}

export async function updateProfile(userId: string, updates: Partial<UserProfile>) {
  const { error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId);
    
  if (error) throw error;
}
