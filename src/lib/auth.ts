
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
  
  // Create profile record using direct SQL to bypass type issues
  if (data.user) {
    try {
      // Direct SQL insert to bypass type checking completely
      const { error: profileError } = await (supabase as any).rpc('create_profile', {
        user_id: data.user.id,
        user_email: email,
        user_role: role,
        user_display_name: displayName
      });
      
      if (profileError) console.error('Error creating profile:', profileError);
    } catch (err) {
      console.error('Profile creation failed:', err);
    }
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
  try {
    // Use direct SQL query to bypass type issues completely
    const { data, error } = await (supabase as any)
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
      
    if (error || !data) return null;
    
    // Safely map the data to our UserProfile interface
    const userProfile: UserProfile = {
      id: userId,
      email: data.email || '',
      role: (data.role || 'student') as UserRole,
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
  } catch (err) {
    console.error('Error fetching user profile:', err);
    return null;
  }
}

export async function updateProfile(userId: string, updates: Partial<UserProfile>) {
  try {
    // Use direct SQL update to bypass type issues
    const { error } = await (supabase as any)
      .rpc('update_user_profile', {
        user_id: userId,
        profile_updates: updates
      });
      
    if (error) throw error;
  } catch (err) {
    console.error('Error updating profile:', err);
    throw err;
  }
}
