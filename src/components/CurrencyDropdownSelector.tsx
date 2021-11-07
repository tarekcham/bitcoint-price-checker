import React from 'react';
import styles from './CurrentDropdownSelector.module.css'

const CURRENCIES = ['USD', 'EUR', 'CNY', 'JPY', 'PLN']

type props = { setSelectedCurrency: (value: string) => void }

const CurrencyDropdownSelector: React.FC<props> = ({setSelectedCurrency}: props): JSX.Element => {

    return (
        <>
            <select className={styles.dropdown} onChange={e => setSelectedCurrency(e.target.value)}>
                {CURRENCIES.map(currency => (
                    <option key={currency} value={currency}>{currency}</option>
                ))}
            </select>
        </>
    );
};

export default CurrencyDropdownSelector;