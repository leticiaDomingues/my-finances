import { currencyFormatter } from "../utils/formatter";

interface Stock {
    ticker: string;
    name: string;
    category: Category;
    qty: number;
    avgPurchasePrice: number;
    avgCurrentPrice: number;
    totalPurchasePrice: number;
    totalCurrentPrice: number;
    profitLoss: number;
}

enum Category {
    BANKS = 'Bancos',
    ENERGY = 'Energia'
}

const StocksData = [
    {
        ticker: 'ITSA4',
        name: 'Itaúsa',
        category: Category.BANKS,
        qty: 226,
        avgPurchasePrice: 10.93,
        avgCurrentPrice: 7.85,
        totalPurchasePrice: 2470.18,
        totalCurrentPrice: 1774.10,
        profitLoss: -696.08
    } as Stock,
    {
        ticker: 'CPLE6',
        name: 'Copel (Cia Paranaense De Energia)',
        category: Category.ENERGY,
        qty: 140,
        avgPurchasePrice: 6.20,
        avgCurrentPrice: 6.72,
        totalPurchasePrice: 868.00,
        totalCurrentPrice: 940.80,
        profitLoss: 72.80
    } as Stock
];

const isProfitOrLossClass = (num: number) => 
    num >= 0 ? 'profit' : 'loss';

export const StocksHeaders = [
    { key: 'ticker', label: 'Ticker' },
    { key: 'name', label: 'Nome' },
    { key: 'category', label: 'Setor' },
    { key: 'qty', label: 'Quantidade' },
    { key: 'avgPurchasePrice', label: 'PM compra', formatter: currencyFormatter},
    { key: 'avgCurrentPrice', label: 'PM atual', formatter: currencyFormatter},
    { key: 'totalPurchasePrice', label: 'Preço total compra', formatter: currencyFormatter},
    { key: 'totalCurrentPrice', label: 'Preço total atual', formatter: currencyFormatter},
    { key: 'profitLoss', label: 'Lucro/prejuízo', formatter: currencyFormatter, conditionalClass: isProfitOrLossClass}
];
export default StocksData;