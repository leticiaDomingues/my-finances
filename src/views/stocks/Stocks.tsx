import "./Stocks.css";
import Table from "../../components/table/Table";
import { MdHistory, MdAdd } from "react-icons/md";
import StocksWallet, { Stock, StocksHeaders, isProfitOrLossClass } from "../../data/stocks";
import { currencyFormatter } from "../../utils/formatter";
import { useEffect, useState } from "react";
import ExportButton from "../../components/export-button/ExportButton";
import ImportButton from "../../components/import-button/ImportButton";
import axios from "axios";

const Stocks = () => {
    const [ stocks, setStocks ] = useState([...StocksWallet] as Stock[]);

    const totalPurchasePrice = stocks.map(d => d.totalPurchasePrice).reduce((acc, curr) => acc + curr, 0);
    const totalCurrentPrice = stocks.map(d => d.totalCurrentPrice).reduce((acc, curr) => acc + curr, 0);
    const profitOrLoss = stocks.map(d => d.profitLoss).reduce((acc, curr) => acc + curr, 0);

    useEffect(() => {
        updateStocksInformation(stocks);
    }, []);

    const updateStocksInformation = (stocks: Stock[]) => {
        const stockTickers = stocks.map(s => s.ticker).join(',');
        axios.get(`https://brapi.dev/api/quote/${stockTickers}`)
            .then(res => {
                const response = res.data.results;
                const updatedStocks = stocks.map(s => {
                    const stockInfo = response.find((r: any) => s.ticker === r.symbol);
                    if (stockInfo) {
                        return {
                            ...s,
                            name: stockInfo.longName,
                            avgCurrentPrice: stockInfo.regularMarketPrice,
                            totalCurrentPrice: stockInfo.regularMarketPrice * s.qty,
                            profitLoss: s.totalCurrentPrice - s.totalPurchasePrice
                        } as Stock;
                    }
                    return {...s} as Stock;
                });
                setStocks(updatedStocks);
            });
    }

    return (
        <div className="stocks">
            <h1>Balanço geral de ações</h1>
            <div className="balance">
                <div className="card">
                    <p>Preço total de compra:</p>
                    <p>{currencyFormatter(totalPurchasePrice)}</p>
                </div>
                <div className="card">
                    <p>Preço total atual:</p>
                    <p>{currencyFormatter(totalCurrentPrice)}</p>
                </div>
                <div className="card">
                    <p>Total de lucro/prejuízo:</p>
                    <p className={isProfitOrLossClass(profitOrLoss)}>
                        {currencyFormatter(profitOrLoss)}
                    </p>
                </div>
            </div>
            <div className="actions">
                <ImportButton onLoad={updateStocksInformation}/>
                <ExportButton fileName="stocks" data={stocks} />
                <button>
                    <MdHistory className="icon" />
                    Histórico
                </button>
                <button>
                    <MdAdd className="icon" />
                    Nova entrada
                </button>
                
            </div>
            <Table headers={StocksHeaders} data={stocks}/>
        </div>
    );
};

export default Stocks;