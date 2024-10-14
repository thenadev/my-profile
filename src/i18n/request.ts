import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";

export default getRequestConfig(async () => {
  // Read the NEXT_LOCALE cookie
  const cookieStore = cookies();
  const localeFromCookie = cookieStore.get("NEXT_LOCALE")?.value;

  // Use 'en' as the default locale if the cookie is not set
  const locale = localeFromCookie || "en";

  // Load the corresponding messages file
  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
