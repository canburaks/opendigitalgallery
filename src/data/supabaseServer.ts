import { Database } from '@/types';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import type { NextApiRequest, NextApiResponse } from 'next';

export const supabaseServer = (req: NextApiRequest, res: NextApiResponse) =>
  createServerSupabaseClient<Database>({
    req,
    res,
  });
