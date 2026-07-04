import { unstable_setRequestLocale } from "next-intl/server";

export const metadata = {
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  return <>{children}</>;
}
