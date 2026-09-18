export function ChatPageHeader({ title, subtitle, hidden }: { title: string; subtitle: string; hidden: boolean }) {
  return (
    <header className={hidden ? "hidden lg:block" : "block"}>
      <h1 className="text-lg font-bold text-slate-900">{title}</h1>
      <p className="text-xs text-slate-500">{subtitle}</p>
    </header>
  );
}
