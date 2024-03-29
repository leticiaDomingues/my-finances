import "./Home.css";
import { BsCurrencyBitcoin, BsCurrencyExchange } from "react-icons/bs";
import { AiOutlineLineChart } from "react-icons/ai";
import { SlWallet } from "react-icons/sl";
import { MdOutlineSavings } from "react-icons/md";
import { BiBuildingHouse, BiCreditCard } from "react-icons/bi";
import { Link } from "react-router-dom";


const Home = () => {
    return (
        <div className="home">
            <div className="cards-wrapper">
                <Link to="/acoes" className="card">
                    <AiOutlineLineChart className="icon"/>
                    Ações
                </Link>
                <div className="card">
                    <MdOutlineSavings className="icon"/>
                    Renda Fixa
                </div>
                <div className="card">
                    <BiBuildingHouse className="icon"/>
                    Fundos Imobiliários
                </div>
                <div className="card">
                    <BsCurrencyBitcoin className="icon"/>
                    Criptomoedas
                </div>
                <div className="card">
                    <BsCurrencyExchange className="icon"/>
                    BDRs
                </div>
                <div className="card">
                    <BiCreditCard className="icon"/>
                    ETFs
                </div>
                <div className="card">
                    <SlWallet className="icon"/>
                    Carteira Total
                </div>
            </div>
        </div>
    );
};

export default Home;