import { supabaseAdmin } from '@/lib/supabase/client';

export interface SubmitFeedbackParams {
  message: string;
}

export interface SubmitFeedbackResult {
  success: boolean;
}

/**
 * Submit user feedback to the database
 */
export async function submitFeedback({
  message,
}: SubmitFeedbackParams): Promise<SubmitFeedbackResult> {
  const trimmedMessage = message.trim();

  const { error } = await supabaseAdmin
    .from('feedback')
    .insert({ message: trimmedMessage });

  if (error) {
    throw new Error(`Failed to submit feedback: ${error.message}`);
  }

  return { success: true };
}
