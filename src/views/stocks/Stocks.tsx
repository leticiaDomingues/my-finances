import "./Stocks.css";
import Table from "../../components/table/Table";
import StocksWallet, { Stock, StocksHeaders, isProfitOrLossClass } from "../../data/stocks";
import { currencyFormatter } from "../../utils/formatter";
import { useEffect, useState } from "react";
import ExportButton from "../../components/export-button/ExportButton";
import ImportButton from "../../components/import-button/ImportButton";
import axios from "axios";
import BalancePanel from "../../components/balance-panel/BalancePanel";
import NewButton from "../../components/new-button/NewButton";
import HistoryButton from "../../components/history-button/HistoryButton";

const Stocks = () => {
    const [ stocks, setStocks ] = useState([...StocksWallet] as Stock[]);

    const totalPurchasePrice = stocks.map(d => d.totalPurchasePrice).reduce((acc, curr) => acc + curr, 0);
    const totalCurrentPrice = stocks.map(d => d.totalCurrentPrice).reduce((acc, curr) => acc + curr, 0);
    const profitOrLoss = totalCurrentPrice - totalPurchasePrice;

    const balance = [
        { label: 'Preço total de compra:', value: totalPurchasePrice, formatter: currencyFormatter },
        { label: 'Preço total atual:', value: totalCurrentPrice, formatter: currencyFormatter },
        { label: 'Total de lucro/prejuízo:', value: profitOrLoss, formatter: currencyFormatter, conditionalClass: isProfitOrLossClass }
    ];

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
                        const totalCurrentPrice = stockInfo.regularMarketPrice * s.qty;
                        return {
                            ...s,
                            name: stockInfo.longName,
                            avgCurrentPrice: stockInfo.regularMarketPrice,
                            totalCurrentPrice: totalCurrentPrice,
                            profitLoss: totalCurrentPrice - s.totalPurchasePrice
                        } as Stock;
                    }
                    return {...s} as Stock;
                });
                setStocks(updatedStocks);
            });
    }

    const addNewStock = () => {
        console.log('Todo: add new stock.');
    }

    const showHistory = () => {
        console.log('Todo: show stocks history.');
    }

    return (
        <div className="stocks">
            <h1>Balanço geral de ações</h1>
            <BalancePanel data={balance}></BalancePanel>
            <div className="actions">
                <ImportButton onLoad={updateStocksInformation}/>
                <ExportButton fileName={new Date().toISOString().split('.')[0]+'-stocks'} data={stocks} />
                <HistoryButton onClick={showHistory}></HistoryButton>
                <NewButton onClick={addNewStock} />
            </div>
            <Table headers={StocksHeaders} data={stocks}/>
        </div>
    );
};

export default Stocks;