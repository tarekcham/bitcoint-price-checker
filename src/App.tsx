import React, {useState} from 'react';
import {fetchBitcoinCurrentPrice} from './service/fetchBitcoinCurrentPrice';
import ChartSection from "./components/ChartSection";
import styles from './App.module.css';
import CurrencyDropdownSelector from "./components/CurrencyDropdownSelector";

export const DATA_FETCH_FREQUENCY = 10000;

function App() {
    const [currentPrice, setCurrentPrice] = useState({
        code: "",
        rate: "",
        description: "",
        rate_float: 0
    });
    const [errorMessage, setErrorMessage] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [selectedCurrency, setSelectedCurrency] = useState('USD');

    const fetchData = async () => {
        setIsLoading(true);
        const currentPriceData = await fetchBitcoinCurrentPrice(selectedCurrency);
        if (currentPriceData) {
            // @ts-ignore
            setCurrentPrice(currentPriceData);
        } else {
            setErrorMessage(true);
        }
        setIsLoading(false);
    }

    React.useEffect(() => {
        fetchData()
        const interval = setInterval(() => {
            fetchData()
        }, DATA_FETCH_FREQUENCY);
        return () => clearInterval(interval);
    }, [selectedCurrency])


    return (
        <div className={styles.app}>
            {errorMessage ? <p> Data is not available</p> :
                isLoading ? <p> Loading ... </p> :
                    (<div className={styles.topSection}>
                        <h2> {currentPrice.rate} </h2>
                        <CurrencyDropdownSelector setSelectedCurrency={setSelectedCurrency}/>
                    </div>)
            }
            <ChartSection selectedCurrency={selectedCurrency}/>
        </div>
    );
}

export default App;
