
-- Create RPC function for creating user profiles
CREATE OR REPLACE FUNCTION public.create_profile(
  user_id UUID,
  user_email TEXT,
  user_role TEXT,
  user_display_name TEXT
) RETURNS void AS $$
BEGIN
  INSERT INTO public.profiles (id, email, role, display_name)
  VALUES (user_id, user_email, user_role, user_display_name);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create RPC function for updating user profiles
CREATE OR REPLACE FUNCTION public.update_user_profile(
  user_id UUID,
  profile_updates JSONB
) RETURNS void AS $$
BEGIN
  UPDATE public.profiles
  SET
    display_name = COALESCE(profile_updates->>'display_name', display_name),
    avatar_url = COALESCE(profile_updates->>'avatar_url', avatar_url),
    first_name = COALESCE(profile_updates->>'first_name', first_name),
    last_name = COALESCE(profile_updates->>'last_name', last_name),
    date_of_birth = COALESCE(profile_updates->>'date_of_birth', date_of_birth),
    gender = COALESCE(profile_updates->>'gender', gender),
    language = COALESCE(profile_updates->>'language', language),
    phone = COALESCE(profile_updates->>'phone', phone),
    updated_at = now()
  WHERE id = user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
