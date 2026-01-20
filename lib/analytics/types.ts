export type EventProperties = {
  source?: string[];
  [key: string]: unknown;
};

export type AnalyticsEvent = {
  name: string;
  properties: EventProperties;
};

export type GetEventCallback = (inherited: EventProperties) => AnalyticsEvent;

export type GetPropertiesCallback = (
  inherited: EventProperties
) => EventProperties;

export type RecordingStartedProperties = EventProperties & {
  inputSource: 'microphone';
};

export type RecordingCompletedProperties = EventProperties & {
  duration: number;
  isValidDuration: boolean;
};

export type RecordingDiscardedProperties = EventProperties & {
  duration: number;
  reason: 'user_action' | 'too_short' | 'too_long';
};

export type FileUploadedProperties = EventProperties & {
  fileSize: number;
  fileType: string;
  duration: number;
};

export type FileRemovedProperties = EventProperties & {
  fileSize: number;
};

export type FileUploadErrorProperties = EventProperties & {
  error: string;
  fileType?: string;
  fileSize?: number;
};

export type AnalysisStartedProperties = EventProperties & {
  inputSource: 'recording' | 'upload';
  duration: number;
};

export type AnalysisCompletedProperties = EventProperties & {
  inputSource: 'recording' | 'upload';
  duration: number;
  clarityScore: number;
  archetype: string;
  totalFillers: number;
  totalWords: number;
  fillerPercentage: number;
  fillersPerMinute: number;
  topFiller?: string;
  isPerfect: boolean;
};

export type AnalysisErrorProperties = EventProperties & {
  inputSource: 'recording' | 'upload';
  error: string;
  duration?: number;
};

export type ModeSwitchedProperties = EventProperties & {
  from: 'record' | 'upload';
  to: 'record' | 'upload';
};

export type ShareModalOpenedProperties = EventProperties & {
  clarityScore: number;
  archetype: string;
};

export type ResultSharedProperties = EventProperties & {
  method: 'native_share' | 'clipboard' | 'download';
  clarityScore: number;
  archetype: string;
  device: 'mobile' | 'desktop';
};

export type ShareErrorProperties = EventProperties & {
  method: 'native_share' | 'clipboard' | 'download';
  error: string;
};

export type HistoryOpenedProperties = EventProperties & {
  sessionCount: number;
};

export type HistoryClearedProperties = EventProperties & {
  sessionCount: number;
};

export type ChallengeCategorySelectedProperties = EventProperties & {
  from: 'interview' | 'presentation' | 'social' | 'impromptu';
  to: 'interview' | 'presentation' | 'social' | 'impromptu';
};

export type ChallengePromptRequestedProperties = EventProperties & {
  category: 'interview' | 'presentation' | 'social' | 'impromptu';
};

export type WaitlistModalOpenedProperties = EventProperties & {
  trigger: 'pro_badge' | 'challenge_mode' | 'feature_gate';
};

export type WaitlistJoinedProperties = EventProperties & {
  trigger: 'pro_badge' | 'challenge_mode' | 'feature_gate';
};

export type WaitlistErrorProperties = EventProperties & {
  error: string;
};

export type FeedbackModalOpenedProperties = EventProperties;

export type FeedbackSubmittedProperties = EventProperties & {
  messageLength: number;
};

export type FeedbackErrorProperties = EventProperties & {
  error: string;
};

export type SessionSavedProperties = EventProperties & {
  clarityScore: number;
  totalSessions: number;
  improvedFromLast?: boolean;
  scoreChange?: number;
};

export type TryAgainClickedProperties = EventProperties & {
  previousScore: number;
  previousArchetype: string;
};

export type ResultTabSwitchedProperties = EventProperties & {
  from: 'breakdown' | 'transcript';
  to: 'breakdown' | 'transcript';
};

export type AnalyticsEventMap = {
  recording_started: RecordingStartedProperties;
  recording_completed: RecordingCompletedProperties;
  recording_discarded: RecordingDiscardedProperties;
  file_uploaded: FileUploadedProperties;
  file_removed: FileRemovedProperties;
  file_upload_error: FileUploadErrorProperties;
  analysis_started: AnalysisStartedProperties;
  analysis_completed: AnalysisCompletedProperties;
  analysis_error: AnalysisErrorProperties;
  mode_switched: ModeSwitchedProperties;
  share_modal_opened: ShareModalOpenedProperties;
  result_shared: ResultSharedProperties;
  share_error: ShareErrorProperties;
  history_opened: HistoryOpenedProperties;
  history_cleared: HistoryClearedProperties;
  challenge_category_selected: ChallengeCategorySelectedProperties;
  challenge_prompt_requested: ChallengePromptRequestedProperties;
  waitlist_modal_opened: WaitlistModalOpenedProperties;
  waitlist_joined: WaitlistJoinedProperties;
  waitlist_error: WaitlistErrorProperties;
  feedback_modal_opened: FeedbackModalOpenedProperties;
  feedback_submitted: FeedbackSubmittedProperties;
  feedback_error: FeedbackErrorProperties;
  session_saved: SessionSavedProperties;
  try_again_clicked: TryAgainClickedProperties;
  result_tab_switched: ResultTabSwitchedProperties;
};

export type AnalyticsEventName = keyof AnalyticsEventMap;
