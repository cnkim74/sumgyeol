# 숨결 (sumgyeol)

> 잘 떠나는 법, 잘 기억되는 법.

살아있는 동안 사진·글·짧은 영상으로 자기 이야기를 모아 두면, 그날이
왔을 때 그 모음이 가족에게 전해지고, 이후에도 일상 가까이에 머무르는
추모 플랫폼.

- **모음** — 본인이 살아있는 동안 (사진·일지·AI 영상·미래 메시지)
- **보냄** — 그날 (부고 자동 SMS + 영상 첨부)
- **머무름** — 그 이후 (추모 페이지·디지털 액자·기일·AI 카톡)

## 스택

- Next.js 16 (App Router, RSC)
- React 19
- Tailwind CSS v4 (CSS-first config)
- TypeScript

외부 의존을 최소화한 정적 랜딩에서 출발해, 단계별로 모음·보냄·머무름을
얹어 갈 예정.

## Phase 1 (지금 이 빌드)

랜딩 한 페이지 + 사전 신청 폼만 살아 있음.

```
app/
  page.tsx              ← 랜딩 8섹션 조립
  layout.tsx            ← 헤더/푸터 + 명조·Pretendard 로드
  globals.css           ← 새벽 (Quiet Dawn) 팔레트 토큰
  about/page.tsx        ← 소개
  help/page.tsx         ← 도움말 / FAQ / 개인정보·약관 자리
  not-found.tsx
  api/signup/route.ts   ← 사전 신청 받기
components/
  Header.tsx  Footer.tsx
  Hero.tsx  Promise.tsx  ThreeActs.tsx
  VideoPaths.tsx  Subscription.tsx  Trust.tsx  B2BLine.tsx
  WaitlistSection.tsx  WaitlistForm.tsx (client)
lib/
  waitlist.ts           ← data/waitlist.jsonl 로 append (로컬 전용)
```

## 디자인 — "새벽" 팔레트

| 역할 | 색 |
|---|---|
| 배경 | `#F4F4F2` |
| 본문 | `#1F2329` |
| 보조 | `#D5D6D2` |
| 강조 (살구) | `#E9B69A` |
| 침묵 (청회) | `#39444F` |

서체: 본문 *Noto Serif KR* / UI *Pretendard Variable*.
노인 가독성 우선 — 본문 21px 기본, 줄간격 1.95, `word-break: keep-all`.

## 실행

```bash
npm install
npm run dev      # http://localhost:3000
```

빌드:

```bash
npm run build
npm start
```

## 사전 신청 데이터

로컬 개발에서는 `data/waitlist.jsonl` 에 한 줄씩 append 됩니다 (gitignore).
Vercel 같은 서버리스 환경에서는 파일 시스템이 영속되지 않으므로 배포 시
**Vercel KV / Postgres / Resend** 중 하나로 교체 필요. `lib/waitlist.ts`
의 `appendWaitlistEntry` 만 갈아끼우면 됩니다.

## 회원·인증

- 세션: `iron-session` (쿠키 암호화) — `SESSION_PASSWORD` 필요 (32자 이상)
- DB: `@libsql/client` — 로컬 SQLite (`data/sumgyeol.db`), 프로덕션 Turso 권장
- 비밀번호: Node `crypto.scrypt` (의존성 0)
- 회원 등급: `member` 일반회원 / `funeral` 장례식장 / `park` 하늘공원 / `admin` 관리자

가입 폼은 앞 3개 등급만 노출. **관리자 승격은 SQL 로 수동**:

```sql
UPDATE users SET role = 'admin' WHERE email = 'you@example.com';
```

페이지·라우트 가드:

| 경로 | 누가 |
|---|---|
| `/signup`, `/login` | 누구나 |
| `/dashboard` | 로그인한 모든 회원 |
| `/promo` (홍보 배너 신청) | `funeral`, `park` 만 |
| `/admin` | `admin` 만 |

## 환경 변수

`.env.example` 복사해서 `.env.local` 만들고 채워 주세요.

```bash
cp .env.example .env.local
# 그 다음 SESSION_PASSWORD 발급:
openssl rand -hex 32
```

Vercel 배포 시 동일 변수를 *Project Settings → Environment Variables* 에 등록.

## 다음 단계 (Phase 2 이후)

- 모음 — 사진·일지 업로드, AI 영상 생성
- 보냄 — 부고 명단·자동 SMS
- 머무름 — 추모 페이지, 기일 알림
- 다큐멘터리 마켓플레이스(지역 크리에이터) — 신청 폼 → 자동 매칭
- 디지털 액자 (하늘공원·집)
- AI 영상통화·메신저
- B2B (상조회사·장례식장 라이선스)
