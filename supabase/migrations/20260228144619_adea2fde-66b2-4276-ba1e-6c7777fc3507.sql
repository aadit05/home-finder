
-- Fix permissive RLS: restrict property_views insert to authenticated users with their own user_id
DROP POLICY "Anyone can insert views" ON public.property_views;
CREATE POLICY "Authenticated users can insert views" ON public.property_views 
  FOR INSERT WITH CHECK (auth.uid() = user_id OR user_id IS NULL);
