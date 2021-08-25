interface Param {
    readonly key: string;
    readonly value: string;
}

export const mountUri = async (base: string, params: Param[]) => {
    try {
        const url = new URL(base);
        await params.map(param => {
            if (param.key) {
                let value = "";
                if (param.value) {
                    value = param.value;
                }
                url.searchParams.set(param.key, value);
            }
        });
        return url.toString();
    } catch (error) { }
    return base;
}