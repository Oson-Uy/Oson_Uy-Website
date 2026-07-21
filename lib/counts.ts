export function formatProjectsCountParts(
    count: number,
    locale: string,
): { value: number; label: string } {
    if (locale === "ru") {
        const mod10 = count % 10;
        const mod100 = count % 100;
        let label = "жилых комплексов";
        if (mod10 === 1 && mod100 !== 11) label = "жилой комплекс";
        else if ([2, 3, 4].includes(mod10) && ![12, 13, 14].includes(mod100)) {
            label = "жилых комплекса";
        }
        return { value: count, label };
    }

    if (locale === "uz") {
        return { value: count, label: "turar-joy majmuasi" };
    }

    return {
        value: count,
        label: count === 1 ? "residential complex" : "residential complexes",
    };
}

export function formatProjectsCount(count: number, locale: string): string {
    const { value, label } = formatProjectsCountParts(count, locale);
    return `${value} ${label}`;
}
