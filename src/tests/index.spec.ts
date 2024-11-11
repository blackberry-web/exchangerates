import {describe, expect, test} from '@jest/globals';
import axios from 'axios';
import { exchange, getCurrenciesData, getCurrenciesDataOnDate, getCurrencyData, yesterday } from '../index';

jest.mock('axios');

describe('tests', () => {
  test('gets currencies data successfully', async() => {
    const data = {
      'EUR': {
        symbol: '€',
        name: 'Euro',
        symbol_native: '€',
        decimal_digits: 2,
        rounding: 0,
        code: 'EUR',
        name_plural: 'Euros',
        type: 'fiat'
      },
      'USD': {
        symbol: '$',
        name: 'US Dollar',
        symbol_native: '$',
        decimal_digits: 2,
        rounding: 0,
        code: 'USD',
        name_plural: 'US dollars',
        type: 'fiat'
      },
  };
    (axios.get as jest.Mock).mockResolvedValue({ data });
    const result = await getCurrenciesData();
    expect(result).toEqual(data);
  });

  test('gets currency data successfully', async() => {
    const data = {
      'EUR': {
        symbol: '€',
        name: 'Euro',
        symbol_native: '€',
        decimal_digits: 2,
        rounding: 0,
        code: 'EUR',
        name_plural: 'Euros',
        type: 'fiat'
      }
    };
    (axios.get as jest.Mock).mockResolvedValue({ data });
    const result = await getCurrencyData(['EUR']);
    expect(result).toEqual(data);
  });

  test('gets currencies data on date successfully', async() => {
    const data = {
      'EUR': 9.332301238, 
      'GBP': 7.742200883, 
    };
    (axios.get as jest.Mock).mockResolvedValue({ data });
    const result = await getCurrenciesDataOnDate(['EUR', 'GBP'], yesterday)
    expect(result).toEqual(data);
  });

  test('exchanges currencies successfully', async() => {
    const data = {
      data: {
        'EUR': 0.9332301238,
        'USD': 0.7742200883,
      }
  };
    (axios.get as jest.Mock).mockResolvedValue({ data });
    let mockedResult = {};
    for (const [key, value] of Object.entries(data.data)) {
      mockedResult[key] = value as number * 10;
    }
    const result = await exchange(10, 'USD', ['EUR'], '2024-11-10');
    expect(result).toEqual(mockedResult);
  });

  test('handles errors when fetching currencies data with the wrong argument type', async () => {
    (axios.get as jest.Mock).mockRejectedValue(new Error('Type \'number\' is not assignable to type \'string\''));
    try {
      await getCurrencyData([1 as any]);
    } catch (e) {
      expect(e.message).toBe('Currency must be a string in a format \'XXX\'');
    }
  });

  test('handles errors when fetching currencies data with the wrong date', async () => {
    const date = new Date(Date.now()).toISOString().split('T')[0];
    (axios.get as jest.Mock).mockRejectedValue(new RangeError);
    try {
      await getCurrenciesDataOnDate(['EUR', 'USD'], date);
    } catch (e) {
      expect(e.message).toBe('Date should be a day before today in a format \'yyyy-mm-dd\'');
    }
  });
});