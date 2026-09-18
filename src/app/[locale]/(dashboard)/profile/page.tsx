"use client";

import { useCallback, useEffect, useState } from "react";
import { Alert, App } from "antd";
import { useAppDispatch } from "@/redux/hooks";
import { updateProfile as updateReduxProfile } from "@/redux/slices/auth";
import { useGetMyProfileQuery } from "@/redux/apis/profile";
import { ChangePasswordModal } from "@/components/profile/ChangePasswordModal";
import type { ClientProfile as ApiClientProfile } from "@/types/api";
import { ProfileSkeleton } from "@/components/profile/ProfileSkeleton";
import { ProfileHeaderCard } from "@/components/profile/ProfileHeaderCard";
import { ProfileContactInfoCard } from "@/components/profile/ProfileContactInfoCard";
import { ProfileAccountDetailsCard } from "@/components/profile/ProfileAccountDetailsCard";
import { ProfileChangePasswordCard } from "@/components/profile/ProfileChangePasswordCard";
import { ProfileEditModal } from "@/components/profile/ProfileEditModal";

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

      <ProfileHeaderCard
        profile={profile}
        companyName={companyName}
        contractType={contractType}
        editLabel={t.common.edit}
        onEdit={() => setEditing(true)}
      />

      <ProfileContactInfoCard
        title={t.profile.contactInfo}
        companyLabel={t.profile.companyName}
        companyName={companyName}
        contactPersonLabel={t.profile.contactPerson}
        contactPerson={contactPerson}
        emailLabel={t.profile.email}
        email={email}
        phoneLabel={t.profile.phone}
        phone={phone}
      />

      <ProfileAccountDetailsCard
        title={t.profile.accountDetails}
        memberSinceLabel={t.profile.memberSince}
        memberSince={memberSince}
        contractTypeLabel={t.profile.contractType}
        contractType={contractType}
      />

      <ProfileChangePasswordCard
        title={t.profile.changePassword}
        description={t.profile.lastPasswordChanged}
        onChangePassword={() => setPasswordOpen(true)}
      />

      {editing && (
        <ProfileEditModal
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
