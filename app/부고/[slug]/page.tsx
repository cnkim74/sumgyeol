import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getObituaryBySlug } from "@/lib/obituaries";
import ObituarySharePanel from "@/components/ObituarySharePanel";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const obit = await getObituaryBySlug(slug);
  if (!obit) return { title: "부고 — 숨결" };
  return {
    title: `고(故) ${obit.deceasedName} 님 부고 — 숨결`,
    description: `${obit.funeralHome} · ${obit.diedDate} 별세`,
  };
}

function formatDate(dateStr: string | null, withYear = true): string {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const day = d.getDate();
  return withYear ? `${year}년 ${month}월 ${day}일` : `${month}월 ${day}일`;
}

function formatDatetime(dateStr: string | null): string {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`;
}

export default async function ObituaryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const obit = await getObituaryBySlug(slug);
  if (!obit || obit.status !== "live") notFound();

  const bornYear = obit.bornDate ? new Date(obit.bornDate).getFullYear() : null;
  const diedYear = new Date(obit.diedDate).getFullYear();

  return (
    <div className="obit-root">
      {/* 상단 국화 헤더 */}
      <header className="obit-header">
        <div className="obit-chrysanthemum" aria-hidden="true">
          <ChryIcon />
        </div>
        <p className="obit-kicker">부 고 (訃告)</p>
      </header>

      {/* 고인 정보 */}
      <section className="obit-deceased">
        {obit.profileImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={obit.profileImage}
            alt={obit.deceasedName}
            className="obit-portrait"
          />
        )}
        <div className="obit-name-block">
          <p className="obit-title-text">
            {obit.deceasedTitle ? `${obit.deceasedTitle} ` : ""}
            <span className="obit-name">고(故) {obit.deceasedName}</span>
            {" "}님께서
          </p>
          <p className="obit-died-line">
            {formatDate(obit.diedDate)}
            {obit.diedTime && ` ${obit.diedTime}`}
            {" "}별세하셨습니다.
          </p>
          {bornYear && (
            <p className="obit-years">
              {bornYear} — {diedYear}
            </p>
          )}
        </div>
      </section>

      <div className="obit-divider">
        <span />
        <ChrySmall />
        <span />
      </div>

      {/* 장례 일정 */}
      <section className="obit-section">
        <h2 className="obit-section-title">장례 일정</h2>
        <dl className="obit-info-grid">
          <div className="obit-info-row">
            <dt>장례식장</dt>
            <dd>{obit.funeralHome}</dd>
          </div>
          {obit.funeralAddress && (
            <div className="obit-info-row">
              <dt>주소</dt>
              <dd>
                <a
                  href={`https://map.kakao.com/?q=${encodeURIComponent(obit.funeralAddress)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="obit-map-link"
                >
                  {obit.funeralAddress}
                  <span className="obit-map-badge">지도</span>
                </a>
              </dd>
            </div>
          )}
          {obit.funeralRoom && (
            <div className="obit-info-row">
              <dt>빈소</dt>
              <dd>{obit.funeralRoom}</dd>
            </div>
          )}
          {obit.funeralDate && (
            <div className="obit-info-row">
              <dt>입관</dt>
              <dd>{formatDatetime(obit.funeralDate)}</dd>
            </div>
          )}
          {obit.ceremonyDate && (
            <div className="obit-info-row obit-info-row--accent">
              <dt>발인</dt>
              <dd>{formatDatetime(obit.ceremonyDate)}</dd>
            </div>
          )}
          {obit.burialPlace && (
            <div className="obit-info-row">
              <dt>장지</dt>
              <dd>{obit.burialPlace}</dd>
            </div>
          )}
        </dl>
      </section>

      {/* 상주 */}
      {obit.chiefMourners.length > 0 && (
        <>
          <div className="obit-divider"><span /><span /></div>
          <section className="obit-section">
            <h2 className="obit-section-title">상주</h2>
            <ul className="obit-mourners">
              {obit.chiefMourners.map((m, i) => (
                <li key={i} className="obit-mourner">
                  <span className="obit-mourner-relation">{m.relation}</span>
                  <span className="obit-mourner-name">{m.name}</span>
                </li>
              ))}
            </ul>
          </section>
        </>
      )}

      {/* 연락처 */}
      {(obit.contactName || obit.contactPhone) && (
        <>
          <div className="obit-divider"><span /><span /></div>
          <section className="obit-section">
            <h2 className="obit-section-title">연락처</h2>
            <p className="obit-contact">
              {obit.contactName && (
                <span className="obit-contact-name">{obit.contactName}</span>
              )}
              {obit.contactPhone && (
                <a
                  href={`tel:${obit.contactPhone.replace(/-/g, "")}`}
                  className="obit-contact-phone"
                >
                  {obit.contactPhone}
                </a>
              )}
            </p>
          </section>
        </>
      )}

      {/* 부의금 */}
      {(obit.bankName || obit.bankAccount) && (
        <>
          <div className="obit-divider"><span /><span /></div>
          <section className="obit-section">
            <h2 className="obit-section-title">부의금 계좌</h2>
            <div className="obit-bank">
              <p className="obit-bank-info">
                <span className="obit-bank-name">{obit.bankName}</span>
                <span className="obit-bank-account">{obit.bankAccount}</span>
                {obit.bankHolder && (
                  <span className="obit-bank-holder">예금주: {obit.bankHolder}</span>
                )}
              </p>
            </div>
          </section>
        </>
      )}

      {/* 추가 메시지 */}
      {obit.extraMessage && (
        <>
          <div className="obit-divider"><span /><span /></div>
          <section className="obit-section obit-section--message">
            <p className="obit-extra-message">{obit.extraMessage}</p>
          </section>
        </>
      )}

      {/* 하늘공원 링크 */}
      {obit.memorialSlug && (
        <>
          <div className="obit-divider"><span /><span /></div>
          <section className="obit-section obit-section--memorial">
            <a href={`/하늘/${obit.memorialSlug}`} className="obit-memorial-link">
              <span className="obit-memorial-icon">🏞</span>
              <div>
                <p className="obit-memorial-title">온라인 하늘공원 방문하기</p>
                <p className="obit-memorial-desc">
                  {obit.deceasedName} 님의 추모 공간에서 메시지를 남겨 주세요.
                </p>
              </div>
              <span className="obit-memorial-arrow">→</span>
            </a>
          </section>
        </>
      )}

      {/* 공유 패널 */}
      <div className="obit-divider obit-divider--light"><span /><span /></div>
      <div className="obit-share-wrap">
        <ObituarySharePanel slug={slug} deceasedName={obit.deceasedName} />
      </div>

      {/* 하단 */}
      <footer className="obit-footer">
        <p>삼가 고인의 명복을 빕니다.</p>
        <p className="obit-footer-brand">숨결 (sumgyeol.kr)</p>
      </footer>
    </div>
  );
}

function ChryIcon() {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="32" cy="32" r="6" fill="currentColor" opacity="0.7" />
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i * 30 * Math.PI) / 180;
        const x1 = 32 + 9 * Math.cos(angle);
        const y1 = 32 + 9 * Math.sin(angle);
        const x2 = 32 + 24 * Math.cos(angle);
        const y2 = 32 + 24 * Math.sin(angle);
        const cx1 = 32 + 14 * Math.cos(angle - 0.3);
        const cy1 = 32 + 14 * Math.sin(angle - 0.3);
        const cx2 = 32 + 20 * Math.cos(angle + 0.3);
        const cy2 = 32 + 20 * Math.sin(angle + 0.3);
        return (
          <path
            key={i}
            d={`M${x1.toFixed(1)},${y1.toFixed(1)} C${cx1.toFixed(1)},${cy1.toFixed(1)} ${cx2.toFixed(1)},${cy2.toFixed(1)} ${x2.toFixed(1)},${y2.toFixed(1)}`}
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            opacity={0.5 + (i % 3) * 0.15}
          />
        );
      })}
    </svg>
  );
}

function ChrySmall() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="obit-divider-icon" aria-hidden="true">
      <circle cx="12" cy="12" r="2.5" fill="currentColor" opacity="0.5" />
      {Array.from({ length: 8 }).map((_, i) => {
        const a = (i * 45 * Math.PI) / 180;
        const x1 = 12 + 3.5 * Math.cos(a), y1 = 12 + 3.5 * Math.sin(a);
        const x2 = 12 + 9 * Math.cos(a), y2 = 12 + 9 * Math.sin(a);
        return (
          <line key={i} x1={x1.toFixed(1)} y1={y1.toFixed(1)} x2={x2.toFixed(1)} y2={y2.toFixed(1)}
            stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.45" />
        );
      })}
    </svg>
  );
}
