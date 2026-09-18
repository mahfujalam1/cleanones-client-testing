import { Card, Rate } from "antd";

export function FeedbackStatsRow({ stats }: { stats: { label: string; value: string; sub: string }[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {stats.map((stat, index) => (
        <Card
          key={stat.label}
          className="border-slate-200 text-center"
          styles={{ body: { padding: 16 } }}
        >
          <p className="text-lg font-extrabold leading-tight text-slate-800">{stat.value}</p>
          {index === 0 && <Rate disabled value={5} className="mt-1 text-sm" />}
          <p className="mt-1 text-[10px] font-bold uppercase tracking-wide text-slate-500">
            {stat.label}
          </p>
          <p className="mt-0.5 text-[10px] text-slate-400">{stat.sub}</p>
        </Card>
      ))}
    </div>
  );
}
