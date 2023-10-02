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
import NewPurchaseModal from "../../components/modal/new-purchase-modal/NewPurchaseModal";
import ReactLoading from 'react-loading';
import InfoModal from "../../components/modal/info-modal/InfoModal";

const Stocks = () => {
    const [ stocks, setStocks ] = useState([] as Stock[]);
    const [isNewPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
    const [selectedStock, setSelectedStock] = useState<Stock>();
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
        closeNewPurchaseModal();
    }

    // New purchase modal controllers
    const openNewPurchaseModal = () => setIsPurchaseModalOpen(true);
    const closeNewPurchaseModal = () => setIsPurchaseModalOpen(false);


    // Info modal controllers
    const openInfoModal = (stock: Stock) => setSelectedStock(stock);
    const closeInfoModal = () => setSelectedStock(undefined);
    const isInfoModalOpen = !!selectedStock;
    const sellStock = (stock: Stock, qty: number) => {
        const indexOf = stocks.findIndex(s => s.ticker === stock.ticker);

        if (stock.qty <= qty) {
            stocks.splice(indexOf, 1);
            updateStocksInformation(stocks);
        } else {
            stocks[indexOf].qty -= qty;
            stocks[indexOf].totalPurchasePrice = stocks[indexOf].qty * stocks[indexOf].avgPurchasePrice;
            updateStocksInformation([...stocks]);
        }
        closeInfoModal();
    }
     

    return (
        <div className="stocks">
            <h1>Balanço geral de ações</h1>
            <BalancePanel data={balance}></BalancePanel>
            <div className="actions">
                <ImportButton onLoad={updateStocksInformation}/>
                <ExportButton fileName={new Date().toISOString().split('.')[0]+'-stocks'} data={stocks} />
                <NewButton onClick={openNewPurchaseModal} />
            </div>
            { !isLoading && <Table headers={StocksHeaders} data={stocks} onLineClicked={openInfoModal }/> }
            { isLoading && 
                <div className="loading">
                    <ReactLoading type='spinningBubbles' color='#ffffff' width={80} />
                </div>
            }
            <NewPurchaseModal
                title='Registro de nova compra'
                subtitle='Cada registro é referente a uma ação de cada vez'
                isOpen={isNewPurchaseModalOpen}
                newPurchase={addNewStock}
                closeModal={closeNewPurchaseModal} />
            <InfoModal 
                title={selectedStock?.ticker ?? 'Informação'}
                subtitle={selectedStock?.name ?? 'Detalhes da ação da carteira'}
                isOpen={isInfoModalOpen}
                closeModal={closeInfoModal}
                item = { selectedStock ?? {} as Stock }
                sellItem={sellStock}
            />
        </div>
    );
};

export default Stocks;