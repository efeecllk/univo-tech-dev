-- Migration: Add university column to communities table
-- This enables proper university-specific filtering for communities

-- Step 1: Add university column to communities table
ALTER TABLE communities 
ADD COLUMN IF NOT EXISTS university TEXT DEFAULT 'metu';

-- Step 2: Update existing communities based on admin's university
UPDATE communities c
SET university = p.university
FROM profiles p
WHERE c.admin_id = p.id
AND c.university IS NULL OR c.university = 'metu';

-- Step 3: Set default for any remaining NULL values
UPDATE communities
SET university = 'metu'
WHERE university IS NULL;

-- Verify the changes
SELECT id, name, university, admin_id FROM communities ORDER BY created_at DESC LIMIT 20;
