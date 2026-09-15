"use client";

import { useEffect, useState } from "react";
import { Alert, Button, Card, Skeleton, Switch } from "antd";
import { TbBell, TbDeviceFloppy } from "react-icons/tb";
import {
  useGetClientSettingsQuery,
  updateClientSettings,
  type ClientSettings,
} from "@/services/actions/client";

const panelStyles = { body: { padding: 20 } };

import { useParams } from "next/navigation";
import { getTranslation } from "@/utils/translations";

export default function SettingsPage() {
  const params = useParams<{ locale: string }>();
  const t = getTranslation(params?.locale);

  const [email, setEmail] = useState(false);
  const [sms, setSms] = useState(false);
  const [language, setLanguage] = useState("English (US)");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { data: settingsRes, isLoading: loading, error: queryError, refetch } = useGetClientSettingsQuery();
  const data: ClientSettings | null = settingsRes ?? null;

  useEffect(() => {
    if (data) {
      setEmail(data.notification_alerts.email_notifications);
      setSms(data.notification_alerts.sms_cleaning_alerts);
      setLanguage(data.portal_preferences.portal_language);
    }
  }, [data]);

  const save = async () => {
    setSaving(true);
    setError("");
    setSuccess("");

    const result = await updateClientSettings({
      email_notifications: email,
      sms_cleaning_alerts: sms,
      portal_language: language,
    });

    setSaving(false);
    if (!result.success) {
      setError(result.error);
      return;
    }

    void refetch();
    setSuccess(t.notificationsPage.settingsSaved);
  };

  if (loading) {
    return (
      <div className="grid gap-4 lg:grid-cols-2">
        {[1, 2].map((item) => (
          <Card key={item} className="border-slate-200" styles={panelStyles}>
            <Skeleton active paragraph={{ rows: 5 }} />
          </Card>
        ))}
      </div>
    );
  }

  if (!data) {
    return <Alert type="error" showIcon message={error || "Unable to load settings"} />;
  }

  return (
    <div className="space-y-4 text-sm">
      <header>
        <h1 className="text-lg font-bold text-slate-900">{t.settings.title}</h1>
        <p className="mt-0.5 text-xs text-slate-500">
          {t.settings.notifications}
        </p>
      </header>

      {error && <Alert type="error" showIcon message={error} closable onClose={() => setError("")} />}
      {success && <Alert type="success" showIcon message={success} closable onClose={() => setSuccess("")} />}

      <div className="grid gap-4 lg:grid-cols-2">
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
              description={data.notification_alerts.email_notifications_description || t.settings.emailDesc}
            />
            <PreferenceToggle
              checked={sms}
              onChange={setSms}
              title={t.settings.smsAlerts}
              description={data.notification_alerts.sms_cleaning_alerts_description || t.settings.smsDesc}
            />
          </div>
          <div className="mt-4 flex justify-end border-t border-slate-200 pt-4">
            <Button
              type="primary"
              icon={<TbDeviceFloppy />}
              loading={saving}
              onClick={() => void save()}
              className="text-xs font-semibold cursor-pointer"
            >
              {t.settings.saveSettings}
            </Button>
          </div>
        </Card>
      </div>
    </div>
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
