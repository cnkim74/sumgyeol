import { getSession } from "@/lib/session";
import { ROLE_LABELS, PROMO_ELIGIBLE_ROLES, type Role } from "@/lib/roles";
import HeaderClient, { type HeaderUser } from "./HeaderClient";

export default async function Header() {
  const session = await getSession();
  const user: HeaderUser | null =
    session.userId && session.role
      ? {
          id: session.userId,
          name: session.name ?? "",
          email: session.email ?? "",
          role: session.role,
          roleLabel: ROLE_LABELS[session.role as Role],
          canPromo: PROMO_ELIGIBLE_ROLES.includes(session.role as Role),
          isAdmin: session.role === "admin",
        }
      : null;
  return <HeaderClient user={user} />;
}
