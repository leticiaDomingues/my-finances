import "./Stocks.css";
import Table from "../../components/table/Table";
import { MdHistory, MdAdd } from "react-icons/md";

const Stocks = () => {
    return (
        <div className="stocks">
            <h1>Balanço geral de ações</h1>
            <div className="actions">
            <button>
                    <MdHistory className="icon" />
                    Histórico
                </button>
                <button>
                    <MdAdd className="icon" />
                    Nova entrada
                </button>
            </div>
            <Table />
        </div>
    );
};

export default Stocks;