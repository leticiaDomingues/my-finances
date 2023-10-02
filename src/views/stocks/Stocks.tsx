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
import NewPurchaseModal from "../../components/new-purchase-modal/NewPurchaseModal";
import ReactLoading from 'react-loading';

const Stocks = () => {
    const [ stocks, setStocks ] = useState([] as Stock[]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const totalPurchasePrice = stocks.map(d => d.totalPurchasePrice).reduce((acc, curr) => acc + curr, 0);
    const totalCurrentPrice = stocks.map(d => d.totalCurrentPrice).reduce((acc, curr) => acc + curr, 0);
    const profitOrLoss = totalCurrentPrice - totalPurchasePrice;
    
    const balance = [
        { label: 'Preço total de compra:', value: totalPurchasePrice, formatter: currencyFormatter },
        { label: 'Preço total atual:', value: totalCurrentPrice, formatter: currencyFormatter },
        { label: 'Total de lucro/prejuízo:', value: profitOrLoss, formatter: currencyFormatter, conditionalClass: isProfitOrLossClass }
    ];

    useEffect(() => {
        updateStocksInformation([...StocksWallet]);
    }, []);

    const updateStocksInformation = async (newStocks: Stock[]) => {
        const updatedStocks = [];
        setIsLoading(true);
        for (const newStock of newStocks) {
            const res = await getStockInfo(newStock.ticker);
            const stockInfo = res.data.results[0];

            const totalCurrentPrice = stockInfo.regularMarketPrice * newStock.qty;
            updatedStocks.push({
                ...newStock,
                name: stockInfo.longName,
                avgCurrentPrice: stockInfo.regularMarketPrice,
                totalCurrentPrice: totalCurrentPrice,
                profitLoss: totalCurrentPrice - newStock.totalPurchasePrice
            } as Stock);
        }
        setStocks(updatedStocks);
        setIsLoading(false);
    }


    // Due to this API limitation, we need to call the API one time for each stock ticker
    const getStockInfo = (ticker: string) => {
        const token = '?token=wgJNcSMyUNWbVUN16qPK8a';
        return axios.get(`https://brapi.dev/api/quote/${ticker}${token}`);
    }

    const addNewStock = (stock: Stock) => {
        const existentStock = stocks.find(s => s.ticker === stock.ticker);
        if (existentStock) {
            existentStock.qty += stock.qty;
            existentStock.totalPurchasePrice += (stock.qty * stock.totalPurchasePrice);
            existentStock.avgPurchasePrice = existentStock.totalPurchasePrice / existentStock.qty;
        } else {
            updateStocksInformation([...stocks, stock]);
        }
        closeModal();
    }

    const showHistory = () => {
        console.log('Todo: show stocks history.');
    }

    // Modal controllers
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <div className="stocks">
            <h1>Balanço geral de ações</h1>
            <BalancePanel data={balance}></BalancePanel>
            <div className="actions">
                <ImportButton onLoad={updateStocksInformation}/>
                <ExportButton fileName={new Date().toISOString().split('.')[0]+'-stocks'} data={stocks} />
                <HistoryButton onClick={showHistory}></HistoryButton>
                <NewButton onClick={openModal} />
            </div>
            { !isLoading && <Table headers={StocksHeaders} data={stocks}/> }
            { isLoading && 
                <div className="loading">
                    <ReactLoading type='spinningBubbles' color='#ffffff' width={80} />
                </div>
            }
            <NewPurchaseModal
                title='Registro de nova compra'
                subtitle='Cada registro é referente a uma ação de cada vez'
                isOpen={isModalOpen}
                newPurchase={addNewStock}
                closeModal={closeModal} />
        </div>
    );
};

export default Stocks;