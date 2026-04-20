import { getRequestConfig } from 'next-intl/server';
import { cookies } from 'next/headers';

export default getRequestConfig(async () => {
    const locales = ['uz', 'ru'];
    const cookieStore = await cookies();
    let locale = cookieStore.get("locale")?.value || 'uz';

    if (!locales.includes(locale)) {
        locale = "uz";
    }

    return {
        locale,
        messages: (await import(`../langs/${locale}.json`)).default
    };
});