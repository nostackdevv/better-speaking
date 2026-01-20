import { AlertCircle } from 'lucide-react';
import { useEffect, useRef } from 'react';

import { Button } from './Button';

type ConfirmModalProps = {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export const ConfirmModal = ({
  isOpen,
  onConfirm,
  onCancel,
}: ConfirmModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const confirmButtonRef = useRef<HTMLButtonElement>(null);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Focus the confirm button when modal opens
      setTimeout(() => confirmButtonRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onCancel();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onCancel]);

  // Click outside to close
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onCancel();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      aria-describedby="modal-description"
      aria-labelledby="modal-title"
      aria-modal="true"
      className="animate-fadeIn fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={handleBackdropClick}
      role="dialog"
    >
      <div
        className="animate-scaleIn w-full max-w-sm overflow-hidden rounded-2xl bg-white shadow-xl"
        ref={modalRef}
      >
        <div className="p-6">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-amber-100">
            <AlertCircle className="h-6 w-6 text-amber-600" />
          </div>
          <h3
            className="mb-2 text-center text-lg font-semibold text-gray-900"
            id="modal-title"
          >
            Start a new recording?
          </h3>
          <p
            className="text-center text-sm text-gray-500"
            id="modal-description"
          >
            Ready to try again? Your current session will be cleared.
          </p>
        </div>
        <div className="flex gap-3 px-6 pb-6">
          <Button className="flex-1" onClick={onCancel} variant="outline">
            Cancel
          </Button>
          <Button className="flex-1" onClick={onConfirm} ref={confirmButtonRef}>
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
};
