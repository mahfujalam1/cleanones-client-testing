import { Button, Card, Switch } from "antd";
import { TbBell, TbDeviceFloppy } from "react-icons/tb";

const panelStyles = { body: { padding: 20 } };

export function NotificationAlertsCard({
  t,
  email,
  setEmail,
  sms,
  setSms,
  emailDescription,
  smsDescription,
  saving,
  onSave,
}: {
  t: any;
  email: boolean;
  setEmail: (value: boolean) => void;
  sms: boolean;
  setSms: (value: boolean) => void;
  emailDescription: string;
  smsDescription: string;
  saving: boolean;
  onSave: () => void;
}) {
  return (
    <Card className="border-slate-200" styles={panelStyles}>
      <div className="mb-4 flex items-center gap-2 border-b border-slate-200 pb-3">
        <TbBell className="text-base text-sky-500" />
        <h2 className="text-xs font-bold uppercase tracking-wide text-slate-700">
          {t.settings.notificationAlerts}
        </h2>
      </div>
      <div className="space-y-3">
        <PreferenceToggle
          checked={email}
          onChange={setEmail}
          title={t.settings.emailAlerts}
          description={emailDescription}
        />
        <PreferenceToggle
          checked={sms}
          onChange={setSms}
          title={t.settings.smsAlerts}
          description={smsDescription}
        />
      </div>
      <div className="mt-4 flex justify-end border-t border-slate-200 pt-4">
        <Button
          type="primary"
          icon={<TbDeviceFloppy />}
          loading={saving}
          onClick={onSave}
          className="text-xs font-semibold cursor-pointer"
        >
          {t.settings.saveSettings}
        </Button>
      </div>
    </Card>
  );
}

function PreferenceToggle({
  checked,
  onChange,
  title,
  description,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded border border-slate-200 bg-slate-50/60 p-3">
      <div className="min-w-0">
        <p className="text-xs font-semibold text-slate-800">{title}</p>
        <p className="mt-1 text-[11px] leading-4 text-slate-500">{description}</p>
      </div>
      <Switch size="small" checked={checked} onChange={onChange} aria-label={title} />
    </div>
  );
}
