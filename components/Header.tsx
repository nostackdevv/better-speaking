import { Mic } from "lucide-react";

export function Header() {
  return (
    <header className="text-center mb-8">
      <div className="flex items-center justify-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-xl bg-linear-to-br from-orange-500 to-rose-500 flex items-center justify-center shadow-lg shadow-orange-500/20">
          <Mic className="w-5 h-5 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
          SpeakClear
        </h1>
      </div>
      <p className="text-slate-500 mt-1">
        Identify filler words. Speak with confidence.
      </p>
    </header>
  );
}
