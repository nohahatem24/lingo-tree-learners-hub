
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
  bio?: string | null;
  specialization?: string | null;
  total_stars?: number;
  level?: number;
  created_at?: string | null;
  updated_at?: string | null;
}

export async function signIn(email: string, password: string) {
  console.log('Attempting sign in for:', email);
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  if (error) {
    console.error('Sign in error:', error);
    throw error;
  }
  console.log('Sign in successful:', data.user?.id);
  return data;
}

export async function signUp(email: string, password: string, role: UserRole, displayName: string) {
  console.log('Attempting sign up for:', email, 'with role:', role);
  
  // Get the current origin for the redirect URL
  const redirectUrl = `${window.location.origin}/dashboard`;
  
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: redirectUrl,
      data: {
        role,
        display_name: displayName,
      },
    },
  });
  
  if (error) {
    console.error('Sign up error:', error);
    throw error;
  }
  
  console.log('Sign up successful:', data.user?.id);
  return data;
}

export async function signOut() {
  console.log('Signing out user');
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error('Sign out error:', error);
    throw error;
  }
  console.log('Sign out successful');
}

export async function getCurrentUser(): Promise<User | null> {
  const { data } = await supabase.auth.getUser();
  return data.user;
}

export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  try {
    console.log('Fetching profile for user:', userId);
    
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
      
    if (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
    
    if (!data) {
      console.log('No profile found for user:', userId);
      return null;
    }
    
    console.log('Profile fetched successfully:', data);
    
    // Map the data to our UserProfile interface
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
      bio: data.bio || null,
      specialization: data.specialization || null,
      total_stars: data.total_stars || 0,
      level: data.level || 1,
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
    console.log('Updating profile for user:', userId, updates);
    
    const { error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId);
      
    if (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
    
    console.log('Profile updated successfully');
  } catch (err) {
    console.error('Error updating profile:', err);
    throw err;
  }
}
