import { notFound } from "next/navigation";
import Link from "next/link";
import { getRoomByCode, getRoomPosts } from "@/lib/rooms";
import { getSession } from "@/lib/session";
import RoomPostForm from "@/components/RoomPostForm";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  const room = await getRoomByCode(code);
  if (!room) return { title: "추모방 — 숨결" };
  return {
    title: `${room.name} — 숨결 추모방`,
    description: room.description ?? `${room.name} 추모방`,
  };
}

export default async function RoomPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  const room = await getRoomByCode(code);
  if (!room) notFound();

  const [posts, session] = await Promise.all([
    getRoomPosts(room.id),
    getSession(),
  ]);

  // Unique contributors
  const authorSet = new Set(posts.map((p) => p.authorName));

  return (
    <div className="room-root">
      {/* Header */}
      <div className="pt-10 pb-6 border-b border-[var(--color-rule)]">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-[var(--color-ink-mute)] mb-2">
          추모방
        </p>
        <h1 className="text-[2rem] font-bold tracking-tight leading-tight mb-2">
          {room.name}
        </h1>
        {room.description && (
          <p className="text-[15px] text-[var(--color-ink-soft)] leading-relaxed mb-3">
            {room.description}
          </p>
        )}
        <div className="flex items-center gap-4 flex-wrap">
          <span className="text-[13px] text-[var(--color-ink-mute)]">
            글 {posts.length}개 · 참여자 {authorSet.size}명
          </span>
          {room.memorialId && (
            <Link
              href={`/하늘/`}
              className="text-[13px] text-link"
            >
              하늘공원 보기 →
            </Link>
          )}
        </div>
      </div>

      {/* Post form */}
      <div className="py-6 border-b border-[var(--color-rule)]">
        <h2 className="text-[13px] font-semibold text-[var(--color-ink-soft)] mb-4">
          글 남기기
        </h2>
        <RoomPostForm
          code={code}
          initialName={session.name}
        />
      </div>

      {/* Posts feed */}
      <div className="py-6">
        {posts.length === 0 ? (
          <p className="text-[14px] text-[var(--color-ink-mute)] text-center py-10">
            첫 번째 글을 남겨 주세요.
          </p>
        ) : (
          <div className="flex flex-col gap-4">
            {posts.map((post) => (
              <div key={post.id} className="room-post">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-[15px] text-[var(--color-ink)]">
                    {post.authorName}
                  </span>
                  <span className="text-[12px] text-[var(--color-ink-mute)]">
                    {post.createdAt.slice(0, 10)}
                  </span>
                </div>
                <p className="text-[14px] text-[var(--color-ink-soft)] leading-relaxed whitespace-pre-wrap">
                  {post.content}
                </p>
                {post.imageUrl && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={post.imageUrl}
                    alt="첨부 이미지"
                    className="mt-3 rounded-lg max-w-full"
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
