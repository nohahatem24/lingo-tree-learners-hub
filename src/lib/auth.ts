
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
    // Use raw SQL via rpc to bypass type issues
    // This will insert into the profiles table created in our migration
    const { error: profileError } = await supabase.rpc('create_profile', {
      user_id: data.user.id,
      user_email: email,
      user_role: role,
      user_display_name: displayName
    });
    
    if (profileError) console.error('Error creating profile:', profileError);
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
  // Use a more generic fetch approach to bypass type issues
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
    
  if (error || !data) return null;
  
  // Create a valid UserProfile object with default values
  // This safely handles potential missing properties in the data object
  const userProfile: UserProfile = {
    id: userId,
    email: data.email || '',
    role: ((data.role as UserRole) || 'student') as UserRole,
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
  
  return userProfile;
}

export async function updateProfile(userId: string, updates: Partial<UserProfile>) {
  // Use a more generic fetch approach to bypass type issues
  const { error } = await supabase
    .rpc('update_user_profile', {
      user_id: userId,
      profile_updates: updates
    });
    
  if (error) throw error;
}
