import React, {useState} from 'react';
import {Area, CartesianGrid, Line, LineChart, Tooltip, XAxis} from 'recharts';
import {fetchBitcoinHistoricalPrice} from "../service/fetchBitcoinhistoricalPrice";
import {DATA_FETCH_FREQUENCY} from "../App";

type props = {
    selectedCurrency: string;
}
const ChartSection: React.FC<props> = ({selectedCurrency}: props): JSX.Element => {
    const [historicalPrice, setHistoricalPrice] = useState([]);

    const [errorMessage, setErrorMessage] = useState({});

    const fetchData = async () => {
        const currentPrice = await fetchBitcoinHistoricalPrice(selectedCurrency);
        if (currentPrice) {
            // @ts-ignore
            setHistoricalPrice(currentPrice);
        } else {
            setErrorMessage(true);
        }
    }

    React.useEffect(() => {
        fetchData()
        const interval = setInterval(() => {
            fetchData()
        }, DATA_FETCH_FREQUENCY);
        return () => clearInterval(interval);
    }, [selectedCurrency])

    const prepareData = () => {
        const arr = [];
        for (let [name, uv] of Object.entries(historicalPrice)) {
            const item = {name, uv}
            arr.push(item)
        }
        return arr
    }

    return (
        <div>
            <LineChart
                width={800}
                height={500}
                data={prepareData()}
                margin={{top: 5, right: 20, left: 10, bottom: 5}}
            >
                <XAxis dataKey="name"/>
                <Tooltip/>
                <CartesianGrid stroke="#f5f5f5"/>
                <Line type="monotone" dataKey="uv" stroke="#ff7300" yAxisId={0}/>
                <Line type="monotone" dataKey="pv" stroke="#387908" yAxisId={1}/>
                <Area
                    type='monotone'
                    dataKey='uv'
                    stroke='#8884d8'
                    fill='#8884d8'
                />
            </LineChart>
        </div>
    );
};

export default ChartSection;