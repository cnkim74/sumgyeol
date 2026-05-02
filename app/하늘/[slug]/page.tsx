import { notFound } from "next/navigation";
import { getMemorialBySlug, getMemorialMessages } from "@/lib/memorials";
import MemorialMessageForm from "@/components/MemorialMessageForm";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const memorial = await getMemorialBySlug(slug);
  if (!memorial) return { title: "하늘공원 — 숨결" };
  return {
    title: `${memorial.deceasedName} 님의 하늘공원 — 숨결`,
    description: memorial.bio?.slice(0, 120) ?? `${memorial.deceasedName} 님을 추모합니다.`,
  };
}

export default async function MemorialPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const memorial = await getMemorialBySlug(slug);
  if (!memorial || memorial.status !== "live") notFound();

  const messages = await getMemorialMessages(memorial.id);

  const born = memorial.bornDate
    ? new Date(memorial.bornDate).getFullYear()
    : null;
  const died = memorial.diedDate
    ? new Date(memorial.diedDate).getFullYear()
    : null;
  const years = born && died ? `${born} — ${died}` : born ? `${born}년생` : null;

  return (
    <>
      {/* 커버 영역 */}
      <div
        className="memorial-cover"
        style={
          memorial.coverImage
            ? { backgroundImage: `url(${memorial.coverImage})` }
            : undefined
        }
      >
        <div className="memorial-cover-overlay" />
        <div className="memorial-cover-content">
          <div className="memorial-avatar-wrap">
            {memorial.profileImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={memorial.profileImage}
                alt={memorial.deceasedName}
                className="memorial-avatar"
              />
            ) : (
              <div className="memorial-avatar-fallback">
                {memorial.deceasedName.charAt(0)}
              </div>
            )}
          </div>
          <h1 className="memorial-name">{memorial.deceasedName}</h1>
          {years && <p className="memorial-years">{years}</p>}
          <p className="memorial-tagline">이곳에 머무릅니다</p>
        </div>
      </div>

      {/* 본문 */}
      <div className="memorial-body container max-w-2xl">
        {/* 약력 */}
        {memorial.bio && (
          <section className="memorial-section">
            <h2 className="memorial-section-title">기억의 글</h2>
            <div className="memorial-bio">{memorial.bio}</div>
          </section>
        )}

        {/* 추모 메시지 */}
        <section className="memorial-section">
          <h2 className="memorial-section-title">
            추모의 말 <span className="memorial-count">{messages.length}</span>
          </h2>

          {/* 작성 폼 */}
          <MemorialMessageForm memorialId={memorial.id} />

          {/* 메시지 목록 */}
          <div className="memorial-messages">
            {messages.length === 0 ? (
              <p className="memorial-empty">
                첫 번째 추모의 말을 남겨 주세요.
              </p>
            ) : (
              messages.map((msg) => (
                <div key={msg.id} className="memorial-message">
                  <div className="memorial-message-header">
                    <span className="memorial-message-author">
                      {msg.authorName}
                    </span>
                    <span className="memorial-message-date">
                      {msg.createdAt.slice(0, 10)}
                    </span>
                  </div>
                  <p className="memorial-message-content">{msg.content}</p>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </>
  );
}
