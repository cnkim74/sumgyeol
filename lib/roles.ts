export const ROLES = ["member", "funeral", "park", "admin"] as const;
export type Role = (typeof ROLES)[number];

export const ROLE_LABELS: Record<Role, string> = {
  member: "일반회원",
  funeral: "장례식장",
  park: "하늘공원",
  admin: "관리자",
};

// 가입 가능한 등급 — 관리자는 자기가입 불가, SQL 로 수동 승격
export const SIGNUP_ROLES: Role[] = ["member", "funeral", "park"];

// 기관 이름이 필수인 등급
export const ORG_REQUIRED_ROLES: Role[] = ["funeral", "park"];

// 홍보 배너 신청 가능한 등급
export const PROMO_ELIGIBLE_ROLES: Role[] = ["funeral", "park"];

export function isRole(value: unknown): value is Role {
  return typeof value === "string" && (ROLES as readonly string[]).includes(value);
}

export function canSignupAs(value: unknown): value is Role {
  return isRole(value) && SIGNUP_ROLES.includes(value);
}
