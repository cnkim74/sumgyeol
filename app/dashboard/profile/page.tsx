import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { findUserById } from "@/lib/users";
import ProfileForm from "@/components/ProfileForm";

export const metadata = { title: "프로필 — 숨결" };

export default async function ProfilePage() {
  const session = await getSession();
  if (!session.userId) {
    redirect("/login?next=/dashboard/profile");
  }

  const user = await findUserById(session.userId);
  if (!user) redirect("/login");

  return (
    <div className="min-h-[calc(100dvh-48px)] bg-[#f7f7f5]">
      <div className="container max-w-lg py-12">
        <p className="text-[13px] font-medium tracking-widest uppercase text-[var(--color-ink-mute)] mb-1">
          내 계정
        </p>
        <h1 className="text-[2rem] font-bold tracking-tight mb-8">프로필 편집</h1>
        <ProfileForm
          initialName={user.name}
          initialAvatarUrl={user.avatarUrl ?? ""}
          initialPhone={user.phone ?? ""}
        />
      </div>
    </div>
  );
}
