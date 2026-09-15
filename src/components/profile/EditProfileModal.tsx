"use client";

import { useState, type FormEvent } from "react";
import { Alert, Button, Input, Modal, Result, Upload } from "antd";
import { TbUpload } from "react-icons/tb";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { updateProfile } from "@/redux/slices/authSlice";
import { updateProfileDetails } from "@/services/actions/profile";
import { useParams } from "next/navigation";
import { getTranslation } from "@/utils/translations";

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function EditProfileModal({ isOpen, onClose }: EditProfileModalProps) {
  const user = useAppSelector((state) => state.auth.user);

  if (!isOpen) return null;
  return <EditProfileModalContent initialName={user?.name ?? ""} onClose={onClose} />;
}

function EditProfileModalContent({
  initialName,
  onClose,
}: {
  initialName: string;
  onClose: () => void;
}) {
  const dispatch = useAppDispatch();
  const params = useParams();
  const t = getTranslation(params?.locale as string);
  const [name, setName] = useState(initialName);
  const [photo, setPhoto] = useState<File | null>(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!name) return;

    const formData = new FormData();
    formData.append("full_name", name);
    if (photo) formData.append("profile_photo", photo);

    setLoading(true);
    setError("");
    const result = await updateProfileDetails(formData);
    setLoading(false);

    if (!result.success) {
      setError(result.error);
      return;
    }

    dispatch(
      updateProfile({
        name,
        ...(result.data && typeof result.data === "object" && result.data.profile_photo
          ? { profilePhoto: result.data.profile_photo }
          : {}),
      }),
    );

    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <Modal
      open
      onCancel={onClose}
      title={<span className="text-sm font-semibold">{t.profile.updateProfile}</span>}
      footer={null}
      centered
      width={480}
      destroyOnHidden
    >
      {success ? (
        <Result
          status="success"
          title={<span className="text-sm font-semibold">{t.profile.updateProfile}</span>}
          subTitle={<span className="text-xs text-slate-500">{t.settings.saveSettings}</span>}
          className="py-5"
        />
      ) : (
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <label className="block text-xs font-semibold text-slate-600">
            <span className="mb-1.5 block">{t.profile.contactPerson}</span>
            <Input value={name} onChange={(event) => setName(event.target.value)} required />
          </label>

          <div className="rounded border border-slate-200 bg-slate-50/60 p-3">
            <p className="mb-2 text-xs font-semibold text-slate-600">{t.profile.personalInfo}</p>
            <div className="flex flex-wrap items-center gap-2">
              <Upload
                accept="image/*"
                maxCount={1}
                showUploadList={false}
                beforeUpload={(file) => {
                  setPhoto(file);
                  return false;
                }}
              >
                <Button icon={<TbUpload />}>{t.common.submit}</Button>
              </Upload>
              <span className="max-w-64 truncate text-[11px] text-slate-500">
                {photo?.name || t.common.loading}
              </span>
            </div>
          </div>

          {error && <Alert type="error" showIcon message={error} className="text-xs" />}

          <div className="flex justify-end gap-2 border-t border-slate-200 pt-4">
            <Button onClick={onClose}>{t.common.cancel}</Button>
            <Button type="primary" htmlType="submit" loading={loading} className="text-xs font-semibold">
              {t.profile.saveChanges}
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
}
