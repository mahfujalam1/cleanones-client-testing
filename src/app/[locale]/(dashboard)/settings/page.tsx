"use client";

import { useEffect, useState } from "react";
import { Alert } from "antd";
import {
  useGetClientSettingsQuery,
  updateClientSettings,
  type ClientSettings,
} from "@/services/actions/client";
import { SettingsSkeleton } from "@/components/settings/SettingsSkeleton";
import { NotificationAlertsCard } from "@/components/settings/NotificationAlertsCard";

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
    return <SettingsSkeleton />;
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
        <NotificationAlertsCard
          t={t}
          email={email}
          setEmail={setEmail}
          sms={sms}
          setSms={setSms}
          emailDescription={data.notification_alerts.email_notifications_description || t.settings.emailDesc}
          smsDescription={data.notification_alerts.sms_cleaning_alerts_description || t.settings.smsDesc}
          saving={saving}
          onSave={() => void save()}
        />
      </div>
    </div>
  );
}
