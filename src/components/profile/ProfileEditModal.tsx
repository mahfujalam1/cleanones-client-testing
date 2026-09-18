import { useEffect, useMemo, useState, type ReactNode } from "react";
import { message } from "antd";
import { App, Avatar, Button, Input, Modal, Upload } from "antd";
import { TbUpload } from "react-icons/tb";
import { useParams } from "next/navigation";
import { getTranslation } from "@/utils/translations";
import { useUpdateProfileMutation } from "@/redux/apis/profile";
import type { ClientProfile as ApiClientProfile } from "@/types/api";

export function ProfileEditModal({
  open,
  data,
  onClose,
  onSaved,
}: {
  open: boolean;
  data: ApiClientProfile;
  onClose: () => void;
  onSaved: (profile: ApiClientProfile) => void;
}) {
  const editParams = useParams<{ locale: string }>();
  const t = getTranslation(editParams?.locale);
  const [updateProfileMutation, { isLoading: saving }] = useUpdateProfileMutation();
  const [form, setForm] = useState({
    name: data.name || "",
    phone: data.phone || "",
  });
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const { notification } = App.useApp();
  const photoPreview = useMemo(() => (photoFile ? URL.createObjectURL(photoFile) : null), [photoFile]);
  useEffect(() => () => { if (photoPreview) URL.revokeObjectURL(photoPreview); }, [photoPreview]);

  const updateField = (field: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      title={<span className="text-sm font-semibold">{t.profile.updateProfile}</span>}
      footer={null}
      centered
      width={520}
      destroyOnHidden
    >
      <form
        className="mt-4 grid gap-3 sm:grid-cols-2"
        onSubmit={async (event) => {
          event.preventDefault();
          try {
            const formData = new FormData();
            formData.append("name", form.name);
            formData.append("phone", form.phone);
            if (photoFile) {
              formData.append("profile_image", photoFile);
            }

            const result = await updateProfileMutation(formData).unwrap();
            if (result.success && result.data) {
              message.success(t.actionFeedback.saved);
              onSaved(result.data);
            } else {
              message.error(result.message || t.actionFeedback.error);
            }
          } catch (err: unknown) {
            const errObj = err as { data?: { message?: string }; message?: string };
            message.error(errObj?.data?.message || errObj?.message || t.actionFeedback.error);
          }
        }}
      >
        <FormField label={t.profile.contactPerson}>
          <Input
            value={form.name}
            onChange={(event) => updateField("name", event.target.value)}
            required
          />
        </FormField>
        <FormField label={t.profile.phone}>
          <Input
            value={form.phone}
            onChange={(event) => updateField("phone", event.target.value)}
            required
          />
        </FormField>
        <div className="sm:col-span-2">
          <div className="block text-xs font-semibold text-slate-600">
            <span className="mb-1.5 block">{t.profile.personalInfo}</span>
            <div className="flex flex-wrap items-center gap-2">
              <Avatar size={40} src={photoPreview ?? data.profile_image ?? undefined} />
              <Upload
                accept="image/*"
                maxCount={1}
                showUploadList={false}
                beforeUpload={(file) => {
                  setPhotoFile(file);
                  return false;
                }}
              >
                <Button icon={<TbUpload />}>{t.common.submit}</Button>
              </Upload>
              <span className="max-w-48 truncate text-[11px] text-slate-500">
                {photoFile?.name || t.common.loading}
              </span>
            </div>
          </div>
        </div>
        <div className="mt-2 flex justify-end gap-2 border-t border-slate-200 pt-4 sm:col-span-2">
          <Button onClick={onClose}>{t.common.cancel}</Button>
          <Button type="primary" htmlType="submit" loading={saving} className="text-xs font-semibold">
            {t.profile.saveChanges}
          </Button>
        </div>
      </form>
    </Modal>
  );
}

function FormField({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block text-xs font-semibold text-slate-600">
      <span className="mb-1.5 block">{label}</span>
      {children}
    </label>
  );
}
