import "./Stocks.css";
import Table from "../../components/table/Table";
import { MdHistory, MdAdd } from "react-icons/md";
import StocksData, { StocksHeaders } from "../../data/stocks";
import { currencyFormatter } from "../../utils/formatter";
import { useState } from "react";
import ExportButton from "../../components/export-button/ExportButton";
import ImportButton from "../../components/import-button/ImportButton";

const Stocks = () => {
    const [ stocks, setStocks ] = useState(StocksData);
    
    const profitOrLoss = stocks.map(d => d.profitLoss).reduce((acc, curr) => acc + curr, 0);

    return (
        <div className="stocks">
            <h1>Balanço geral de ações</h1>
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
            Total de lucro/prejuízo: {currencyFormatter(profitOrLoss)}
        </div>
    );
};

export default Stocks;