"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { Alert, Button, Input, Modal, Result } from "antd";
import { useChangePasswordMutation } from "@/redux/apis/auth";
import { useParams } from "next/navigation";
import { getTranslation } from "@/utils/translations";
import { getPlaceholderTranslation } from "@/utils/translations";

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ChangePasswordModal({ isOpen, onClose }: ChangePasswordModalProps) {
  const params = useParams();
  const t = getTranslation(params?.locale as string);
  const p = getPlaceholderTranslation(params?.locale as string);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [changePasswordMutation, { isLoading: loading }] = useChangePasswordMutation();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    setSuccess(false);

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError(`${t.profile.currentPassword} / ${t.profile.newPassword} / ${t.profile.confirmPassword}`);
      return;
    }

    if (newPassword !== confirmPassword) {
      setError(t.auth?.passwordMismatch || "Confirm passwords do not match");
      return;
    }

    if (newPassword.length < 6) {
      setError(t.auth?.passwordLength || "Password must be at least 6 characters long");
      return;
    }

    try {
      const result = await changePasswordMutation({
        oldPassword: currentPassword,
        newPassword,
        confirmNewPassword: confirmPassword,
      }).unwrap();

      if (result.success) {
        setSuccess(true);
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");

        setTimeout(() => {
          setSuccess(false);
          onClose();
        }, 1500);
      } else {
        setError("Current password does't match");
      }
    } catch (err: any) {
      setError("Current password does't match");
    }
  };

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      title={<span className="text-sm font-semibold">{t.profile.changePassword}</span>}
      footer={null}
      centered
      width={460}
      destroyOnHidden
    >
      {success ? (
        <Result
          status="success"
          title={<span className="text-sm font-semibold">{t.profile.changePassword}</span>}
          subTitle={<span className="text-xs text-slate-500">{t.common.loading}</span>}
          className="py-5"
        />
      ) : (
        <form onSubmit={handleSubmit} className="mt-4 space-y-3">
          <PasswordField label={t.profile.currentPassword}>
            <Input.Password
              value={currentPassword}
              onChange={(event) => setCurrentPassword(event.target.value)}
              placeholder={p.password}
            />
          </PasswordField>
          <PasswordField label={t.profile.newPassword}>
            <Input.Password
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
              placeholder={p.password}
            />
          </PasswordField>
          <PasswordField label={t.profile.confirmPassword}>
            <Input.Password
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              placeholder={p.password}
            />
          </PasswordField>

          {error && <Alert type="error" showIcon message={error} className="text-xs" />}

          <div className="flex justify-end gap-2 border-t border-slate-200 pt-4">
            <Button onClick={onClose}>{t.common.cancel}</Button>
            <Button type="primary" htmlType="submit" loading={loading} className="text-xs font-semibold">
              {t.profile.updateProfile}
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
}

function PasswordField({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block text-xs font-semibold text-slate-600">
      <span className="mb-1.5 block">{label}</span>
      {children}
    </label>
  );
}
