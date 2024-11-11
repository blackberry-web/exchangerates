export type Currency = {
    [key: string]: {
        symbol: string,
        name: string,
        symbol_native: string,
        decimal_digits: number,
        rounding: number,
        code: string,
        name_plural: string,
        type: string
    }
}

export type ExchangedRate = {
    [key: string]: number
}

export type CurrencyOnDate = {
    [key: string]: ExchangedRate
}
