-- Add university column to profiles table
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS university TEXT;

-- Add index for better query performance
CREATE INDEX IF NOT EXISTS idx_profiles_university ON public.profiles(university);

-- Update existing profiles to have 'metu' as default for legacy data
UPDATE public.profiles 
SET university = 'metu' 
WHERE university IS NULL;
