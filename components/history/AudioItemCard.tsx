"use client";

import { X, LucideIcon } from "lucide-react";

type AudioItemCardProps = {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  onRemove: () => void;
  removeLabel?: string;
  removeIcon?: LucideIcon;
  truncateTitle?: boolean;
};

/**
 * Displays an audio item (recording or file) with icon, metadata, and remove action.
 * Used to show selected/recorded audio before analysis.
 *
 * @example
 * // Recording display
 * <AudioItemCard
 *   icon={Mic}
 *   title="Recording"
 *   subtitle="0:45"
 *   onRemove={handleReset}
 *   removeLabel="Discard recording"
 * />
 *
 * @example
 * // File display
 * <AudioItemCard
 *   icon={FileAudio}
 *   title="my-audio.mp3"
 *   subtitle="2.5 MB"
 *   onRemove={handleDelete}
 *   removeLabel="Delete audio file"
 *   removeIcon={Trash}
 *   truncateTitle
 * />
 */
export function AudioItemCard({
  icon: Icon,
  title,
  subtitle,
  onRemove,
  removeLabel = "Remove",
  removeIcon: RemoveIcon = X,
  truncateTitle = false,
}: AudioItemCardProps) {
  return (
    <div className="flex items-center gap-3 p-4 bg-gray-50 border border-gray-200 rounded-lg">
      {/* Icon container */}
      <div className="flex items-center justify-center w-10 h-10 bg-indigo-100 rounded-lg">
        <Icon aria-hidden="true" className="w-5 h-5 text-indigo-600" />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p
          className={`text-sm font-medium text-gray-900 ${
            truncateTitle ? "truncate" : ""
          }`}
        >
          {title}
        </p>
        <p className="text-xs text-gray-500">{subtitle}</p>
      </div>

      {/* Remove button */}
      <button
        aria-label={removeLabel}
        className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded-md transition-colors cursor-pointer"
        onClick={onRemove}
        type="button"
      >
        <RemoveIcon className="w-4 h-4" />
      </button>
    </div>
  );
}
