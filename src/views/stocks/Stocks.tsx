import "./Stocks.css";
import Table from "../../components/table/Table";
import { MdHistory, MdAdd } from "react-icons/md";
import StocksData, { StocksHeaders, isProfitOrLossClass } from "../../data/stocks";
import { currencyFormatter } from "../../utils/formatter";
import { useState } from "react";
import ExportButton from "../../components/export-button/ExportButton";
import ImportButton from "../../components/import-button/ImportButton";

const Stocks = () => {
    const [ stocks, setStocks ] = useState(StocksData);

    const totalPurchasePrice = stocks.map(d => d.totalPurchasePrice).reduce((acc, curr) => acc + curr, 0);
    const totalCurrentPrice = stocks.map(d => d.totalCurrentPrice).reduce((acc, curr) => acc + curr, 0);
    const profitOrLoss = stocks.map(d => d.profitLoss).reduce((acc, curr) => acc + curr, 0);

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
                <ImportButton onLoad={setStocks}/>
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