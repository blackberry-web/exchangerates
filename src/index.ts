import axios from 'axios';
import 'dotenv/config';
import { Currency, CurrencyOnDate, ExchangedRate } from './types';

export const yesterday: string = new Date(Date.now() - 86400000).toISOString().split("T")[0];

export const getCurrenciesData = async (): Promise<Currency[]> => {
    return await axios.get(`${process.env.API_URL}/v1/currencies?apikey=${process.env.API_KEY}&currencies=`)
        .then((response) => response.data)
        .catch((error) => {
            throw new Error(error);
    })
}

export const getCurrencyData = async (currencies: string[]): Promise<Currency[]> => {
    currencies.forEach((el) => {
        if (typeof el !== "string") {
            throw new TypeError("Currency must be a string in a format 'XXX'");
        }
    })
    return await axios.get(`${process.env.API_URL}/v1/currencies?apikey=${process.env.API_KEY}&currencies=${currencies.join()}`)
        .then((response) => response.data)
        .catch((error) => {
            throw new Error(error);
    })
}

export const getCurrenciesDataOnDate = async (currencies: string[], date: string): Promise<CurrencyOnDate> => {
        if (new Date(date) > new Date(yesterday) || new Date(date) < new Date(yesterday)) {
            throw new RangeError("Date should be a day before today in a format 'yyyy-mm-dd'");
        }
        currencies.forEach((el) => {
            if (typeof el !== "string") {
                throw new TypeError("Currency must be a string in a format 'XXX'");
            }
        })
    return await axios.get(`${process.env.API_URL}/v1/historical?apikey=${process.env.API_KEY}&currencies=${currencies.join()}&date_to=${date}`)
        .then((response) => response.data)
        .catch((error) => {
            throw new Error(error);
    })
}

export const exchange = async (sum: number, baseCurrency: string, exchangeCurrencies: string[], date: string): Promise<ExchangedRate> => {
    let result = {};
        if (new Date(date) > new Date(yesterday) || new Date(date) < new Date(yesterday)) {
            throw new RangeError("Date should be a day before today in a format 'yyyy-mm-dd'");
        }
        [...exchangeCurrencies, baseCurrency].forEach((el) => {
            if (typeof el !== "string") {
                throw new TypeError("Currency must be a string in a format 'XXX'");
            }
        })
    const response = await axios.get(`${process.env.API_URL}/v1/latest?apikey=${process.env.API_KEY}&currencies=${exchangeCurrencies.join()}&base_currency=${baseCurrency}&date_to=${date}`)
        .then((response) => response.data)
        .catch((error) => {
                throw new Error(error);
        })
    for (const [key, value] of Object.entries(response.data)) {
        result[key] = value as number * sum;
      }
    return result;
};