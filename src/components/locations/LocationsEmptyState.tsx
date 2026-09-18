import { Empty } from "antd";

export function LocationsEmptyState({ message }: { message: string }) {
  return (
    <section className="flex min-h-72 items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white p-6">
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description={<span className="text-xs text-slate-500">{message}</span>}
      />
    </section>
  );
}
