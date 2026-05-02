import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import RoomEditor from "@/components/RoomEditor";

export const metadata = { title: "추모방 만들기 — 숨결" };

export default async function NewRoomPage() {
  const session = await getSession();
  if (!session.userId) {
    redirect("/login?next=/dashboard/room/new");
  }

  return (
    <div className="min-h-[calc(100dvh-48px)] bg-[#f7f7f5]">
      <div className="container max-w-lg py-12">
        <p className="text-[13px] font-medium tracking-widest uppercase text-[var(--color-ink-mute)] mb-1">
          추모방
        </p>
        <h1 className="text-[2rem] font-bold tracking-tight mb-8">
          새 추모방 만들기
        </h1>
        <RoomEditor />
      </div>
    </div>
  );
}
