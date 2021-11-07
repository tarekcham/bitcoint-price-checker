export type BitcoinCurrentPriceData = {
    code: string;
    rate: string;
    description: string;
    rate_float: number;
}
export type Response = {
    isFailed?: boolean;
    data?: BitcoinCurrentPriceData;
};


export const fetchBitcoinCurrentPrice = async (currency: string
): Promise<Response | null> => {
    const endpoint = `https://api.coindesk.com/v1/bpi/currentprice/${currency}.json`;

    try {
        const response = await fetch(endpoint);

        if (!response.ok) {
            console.log(new Error(`Could not fetch data. Status: ${response.status}`));
            return {isFailed: true};
        }
        const data: Response | null = await response.json();
        // @ts-ignore
        if (!data || !data.bpi) {
            return {isFailed: true};
        }
        // @ts-ignore
        return data.bpi[currency]
    } catch (err) {
        console.log(err);
        return {isFailed: true};
    }
};