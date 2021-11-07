import {render, screen, waitFor} from '@testing-library/react';
import App from './App';
import {fetchBitcoinCurrentPrice} from "./service/fetchBitcoinCurrentPrice";
import {mocked} from 'ts-jest/utils';

jest.mock('./service/fetchBitcoinCurrentPrice')

const mockedFetchBitcoinCurrentPrice = mocked(fetchBitcoinCurrentPrice);


test('display current price', async () => {
    mockedFetchBitcoinCurrentPrice.mockImplementation(async () => {
        return {
            data: {
                code: "USD",
                rate: "61,042.8191",
                description: "United States Dollar",
                rate_float: 61042.8191
            }
        };
    });
    render(<App/>);

    await waitFor(() => {
        expect(fetchBitcoinCurrentPrice("USD")).toHaveBeenCalledTimes(1);
    });
    const currentPrice = screen.findByText('61,042.8191');
    screen.debug()
    expect(currentPrice).toBeInTheDocument();
});

