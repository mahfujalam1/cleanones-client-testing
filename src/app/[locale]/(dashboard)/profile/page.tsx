"use client";

import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { message } from "antd";
import { Alert, App, Avatar, Button, Card, Input, Modal, Skeleton, Tag, Upload } from "antd";
import {
  TbBuilding,
  TbLock,
  TbMail,
  TbPencil,
  TbPhone,
  TbUpload,
  TbUser,
} from "react-icons/tb";
import { useAppDispatch } from "@/redux/hooks";
import { updateProfile as updateReduxProfile } from "@/redux/slices/auth";
import {
  useGetMyProfileQuery,
  useUpdateProfileMutation,
} from "@/redux/apis/profile";
import { ChangePasswordModal } from "@/components/profile/ChangePasswordModal";
import type { ClientProfile as ApiClientProfile } from "@/types/api";

const panelStyles = { body: { padding: 20 } };

import { useParams } from "next/navigation";
import { getTranslation } from "@/utils/translations";

export default function ProfilePage() {
  const params = useParams<{ locale: string }>();
  const t = getTranslation(params?.locale);

  const dispatch = useAppDispatch();
  const { notification } = App.useApp();
  const [editing, setEditing] = useState(false);
  const [passwordOpen, setPasswordOpen] = useState(false);
  const [error, setError] = useState("");

  const { data: profileRes, isLoading: loading, refetch } = useGetMyProfileQuery();
  const profile = profileRes?.data ?? null;

  const storeProfile = useCallback((p: ApiClientProfile) => {
    dispatch(
      updateReduxProfile({
        name: p.name,
        company: p.company_name,
        email: p.email,
        phone: p.phone,
        clientNo: p._id,
        memberSince: p.licence_expiration_date ? new Date(p.licence_expiration_date).getFullYear().toString() : "",
        contractType: p.contract_status,
        status: p.user?.isActive ? "Active" : "Inactive",
        profilePhoto: p.profile_image,
      }),
    );
  }, [dispatch]);

  useEffect(() => {
    if (profile) {
      storeProfile(profile);
    }
  }, [profile, storeProfile]);

  if (loading) {
    return <ProfileSkeleton />;
  }

  if (!profile) {
    return <Alert type="error" showIcon message={error || "Unable to load profile"} />;
  }

  const companyName = profile.company_name || profile.name || "Company";
  const contactPerson = profile.name || "Client";
  const email = profile.email || "—";
  const phone = profile.phone || "—";
  const memberSince = profile.licence_expiration_date ? new Date(profile.licence_expiration_date).toLocaleDateString() : "Active";
  const contractType = profile.contract_status || "Standard";

  return (
    <div className="space-y-4 text-sm">
      <header>
        <h1 className="text-lg font-bold text-slate-900">{t.profile.title}</h1>
        <p className="mt-0.5 text-xs text-slate-500">
          {t.profile.personalInfo}
        </p>
      </header>

      {error && <Alert type="error" showIcon message={error} closable onClose={() => setError("")} />}

      <Card className="border-slate-200" styles={panelStyles}>
        <div className="flex items-center gap-3">
          <ProfileAvatar data={profile} />
          <div className="min-w-0">
            <h2 className="truncate text-sm font-bold text-slate-900">{companyName}</h2>
            <Tag color="blue" className="m-0 text-[10px]">
              {contractType}
            </Tag>
          </div>
          <Button
            icon={<TbPencil />}
            onClick={() => setEditing(true)}
            className="ml-auto text-xs font-semibold cursor-pointer"
          >
            {t.common.edit}
          </Button>
        </div>
      </Card>

      <Card className="border-slate-200" styles={panelStyles}>
        <SectionTitle>{t.profile.contactInfo}</SectionTitle>
        <div className="grid gap-3 sm:grid-cols-2">
          <Info icon={<TbBuilding />} label={t.profile.companyName} value={companyName} />
          <Info icon={<TbUser />} label={t.profile.contactPerson} value={contactPerson} />
          <Info icon={<TbMail />} label={t.profile.email} value={email} />
          <Info icon={<TbPhone />} label={t.profile.phone} value={phone} />
        </div>
      </Card>

      <Card className="border-slate-200" styles={panelStyles}>
        <SectionTitle>{t.profile.accountDetails}</SectionTitle>
        <div className="grid divide-y divide-slate-200 sm:grid-cols-2 sm:divide-x sm:divide-y-0">
          <Fact label={t.profile.memberSince} value={memberSince} />
          <Fact label={t.profile.contractType} value={contractType} />
        </div>
      </Card>

      <Card className="border-slate-200" styles={panelStyles}>
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded border border-orange-200 bg-orange-50 text-orange-500">
            <TbLock className="text-base" />
          </span>
          <div>
            <p className="text-xs font-semibold text-slate-800">{t.profile.changePassword}</p>
            <p className="mt-0.5 text-[11px] text-slate-500">
              {t.profile.lastPasswordChanged}
            </p>
          </div>
          <Button onClick={() => setPasswordOpen(true)} className="ml-auto text-xs font-semibold cursor-pointer">
            {t.profile.changePassword}
          </Button>
        </div>
      </Card>

      {editing && (
        <EditProfileModal
          open
          data={profile}
          onClose={() => setEditing(false)}
          onSaved={(updated) => {
            setEditing(false);
            setError("");
            notification.success({ message: "Profile updated successfully", placement: "topRight" });
            void refetch();
            storeProfile(updated);
          }}
        />
      )}
      <ChangePasswordModal isOpen={passwordOpen} onClose={() => setPasswordOpen(false)} />
    </div>
  );
}

function ProfileAvatar({ data }: { data: ApiClientProfile }) {
  const name = data.name || data.company_name || "Client";
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <Avatar size={54} src={data.profile_image || undefined} className="shrink-0 bg-sky-500 text-xs font-bold">
      {initials}
    </Avatar>
  );
}

function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <h3 className="mb-4 border-b border-slate-200 pb-3 text-xs font-bold uppercase tracking-wide text-slate-500">
      {children}
    </h3>
  );
}

function Info({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 rounded border border-slate-200 bg-slate-50/60 p-3">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded border border-sky-100 bg-sky-50 text-sky-600">
        {icon}
      </span>
      <div className="min-w-0">
        <p className="text-[10px] uppercase tracking-wide text-slate-400">{label}</p>
        <p className="truncate text-xs font-semibold text-slate-800">{value || "—"}</p>
      </div>
    </div>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="px-3 py-3 first:pl-0 last:pr-0 sm:py-1">
      <p className="text-[10px] uppercase tracking-wide text-slate-400">{label}</p>
      <p className="mt-1 text-xs font-semibold text-slate-800">{value || "—"}</p>
    </div>
  );
}

function EditProfileModal({
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

function ProfileSkeleton() {
  return (
    <div className="space-y-4">
      {[100, 210, 130].map((height) => (
        <Card key={height} className="border-slate-200" styles={panelStyles}>
          <Skeleton active paragraph={{ rows: Math.max(1, Math.round(height / 55)) }} />
        </Card>
      ))}
    </div>
  );
}
