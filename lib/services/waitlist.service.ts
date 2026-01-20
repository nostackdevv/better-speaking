import { supabaseAdmin } from '@/lib/supabase/client';

export interface AddToWaitlistParams {
  email: string;
  source?: string;
}

export interface AddToWaitlistResult {
  success: boolean;
  alreadyExists: boolean;
}

/**
 * Add an email to the waitlist
 * Handles duplicate emails gracefully
 */
export async function addToWaitlist({
  email,
  source = 'web',
}: AddToWaitlistParams): Promise<AddToWaitlistResult> {
  const trimmedEmail = email.toLowerCase().trim();

  const { error } = await supabaseAdmin
    .from('waitlist')
    .insert({ email: trimmedEmail, source });

  if (error) {
    // PostgreSQL unique constraint violation code
    if (error.code === '23505') {
      return { success: true, alreadyExists: true };
    }

    throw new Error(`Failed to add to waitlist: ${error.message}`);
  }

  return { success: true, alreadyExists: false };
}
