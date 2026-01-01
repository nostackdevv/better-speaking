import { Crown, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";

type UpgradeModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function UpgradeModal({ isOpen, onClose }: UpgradeModalProps) {
  if (!isOpen) return null;

  const features = [
    "Unlimited practice sessions",
    "All challenge categories",
    "Advanced analytics & trends",
    "Export & share results",
    "Priority support",
  ];

  return (
    <div className="fixed inset-0 bg-slate-950/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl">
        <div className="bg-linear-to-br from-slate-900 to-slate-800 p-8 text-white text-center">
          <div className="w-16 h-16 bg-linear-to-br from-amber-400 to-orange-400 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Crown className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Go Pro</h2>
          <p className="text-slate-400">Unlock your full speaking potential</p>
        </div>

        <div className="p-6 space-y-4">
          {features.map((feature, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                <Check className="w-4 h-4 text-green-600" />
              </div>
              <span className="text-slate-700">{feature}</span>
            </div>
          ))}
        </div>

        <div className="px-6 pb-6 space-y-3">
          <Button className="w-full" size="lg">
            Start Free Trial
          </Button>
          <button
            onClick={onClose}
            className="w-full py-2 text-sm text-slate-500 hover:text-slate-700 cursor-pointer"
          >
            Maybe later
          </button>
        </div>
      </div>
    </div>
  );
}
