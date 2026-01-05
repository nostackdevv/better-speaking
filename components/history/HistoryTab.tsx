import { Card } from "@/components/ui/Card";
import { SessionItem } from "./SessionItem";

const mockSessionHistory = [
  {
    id: 1,
    date: "Today",
    duration: 83,
    fillerCount: 12,
    fillersPerMin: 8.7,
    trend: -23,
  },
  {
    id: 2,
    date: "Dec 26",
    duration: 120,
    fillerCount: 18,
    fillersPerMin: 9.0,
    trend: -5,
  },
  {
    id: 3,
    date: "Dec 24",
    duration: 95,
    fillerCount: 15,
    fillersPerMin: 9.5,
    trend: -13,
  },
  {
    id: 4,
    date: "Dec 22",
    duration: 110,
    fillerCount: 20,
    fillersPerMin: 10.9,
    trend: +2,
  },
  {
    id: 5,
    date: "Dec 20",
    duration: 88,
    fillerCount: 14,
    fillersPerMin: 9.5,
    trend: -8,
  },
];

export const HistoryTab = () => {
  return (
    <div>
      <Card className="overflow-hidden">
        {mockSessionHistory.map((session, index) => (
          <SessionItem
            key={session.id}
            session={session}
            showBorder={index !== mockSessionHistory.length - 1}
          />
        ))}
      </Card>
      <p className="text-xs text-gray-400 mt-3 text-center">
        Your last 5 sessions
      </p>
    </div>
  );
};
