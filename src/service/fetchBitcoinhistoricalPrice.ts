
export type Response = {
    isFailed?: boolean;
    data?: []
};


export const fetchBitcoinHistoricalPrice = async (currency: string
): Promise<Response | null> => {
    const endpoint = `https://api.coindesk.com/v1/bpi/historical/close.json?currency=${currency}`;
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
        return data.bpi
    } catch (err) {
        console.log(err);
        return {isFailed: true};
    }
};