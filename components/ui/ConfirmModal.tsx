import { useEffect, useRef } from "react";
import { AlertCircle } from "lucide-react";
import { Button } from "./Button";

interface ConfirmModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

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
      document.body.style.overflow = "hidden";
      // Focus the confirm button when modal opens
      setTimeout(() => confirmButtonRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onCancel();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
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
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-fadeIn"
      onClick={handleBackdropClick}
      role="dialog"
    >
      <div
        className="bg-white rounded-2xl max-w-sm w-full overflow-hidden shadow-xl animate-scaleIn"
        ref={modalRef}
      >
        <div className="p-6">
          <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-6 h-6 text-amber-600" />
          </div>
          <h3
            className="text-lg font-semibold text-gray-900 text-center mb-2"
            id="modal-title"
          >
            Start a new recording?
          </h3>
          <p
            className="text-gray-500 text-center text-sm"
            id="modal-description"
          >
            Ready to try again? Your current session will be cleared.
          </p>
        </div>
        <div className="px-6 pb-6 flex gap-3">
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
