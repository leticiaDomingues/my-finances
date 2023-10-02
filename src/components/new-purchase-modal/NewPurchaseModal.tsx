import "./NewPurchaseModal.css";
import Modal from 'react-modal';
import { MdClose } from 'react-icons/md';
import { useForm } from "react-hook-form";
import { Category, Stock } from "../../data/stocks";


interface INewPurchaseModalPropos {
    isOpen: boolean;
    title: string;
    subtitle: string;
    closeModal: () => void;
    newPurchase: (stock: Stock) => void;
}

const NewPurchaseModal = (props: INewPurchaseModalPropos) => {
    const { title, subtitle, isOpen, closeModal, newPurchase } = props;    
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [qty, price] = watch(["avgPurchasePrice", "qty"]);
    
    const onSubmit = (data: any) => {
        const avgPurchasePrice = Number(data.avgPurchasePrice);
        const qty = Number(data.qty);
        const category = getEnumVale(data.category);
        const stock: Stock = {...data, avgPurchasePrice, qty,  totalPurchasePrice: qty * avgPurchasePrice, category};
        newPurchase(stock);
    }

    const getEnumVale = (s: string) => {
        return Category[s as keyof typeof Category];
    }

    return (
        <Modal className="modal"
            isOpen={isOpen}
            onRequestClose={closeModal}
        >
            <div className="close-button">
                <button onClick={closeModal}><MdClose /></button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h2 className="title">{title}</h2>
                <h3 className="subtitle">{subtitle}</h3>
                
                    <input type="text" 
                        placeholder="Ticker" className={errors.ticker && "error"}
                        {...register("ticker", { required: true, maxLength: 5 })} />
                    <select placeholder="Setor" className={errors.category && "error"}
                        {...register("category", { required: true} )}>
                        <option value="BANKS">Bancos</option>
                        <option value="ENERGY">Energia</option>
                        <option value="FINANTIAL">Financeiro</option>
                        <option value="CONSUMPTION_RETAIL">Consumo e Varejo</option>
                    </select>
                    <input type="number"
                        placeholder="Quantidade" className={errors.qty && "error"}
                        {...register("qty", { required: true, min:1 })}/>
                    <input type="number" step=".01"
                        placeholder="Preço por ação" className={errors.avgPurchasePrice && "error"}
                        {...register("avgPurchasePrice", { required: true, min: 0 })} />
                    <p>Total da compra: R${ (qty || 0) * (price || 0)}</p> 
                    
                <div className="buttons-wrapper">
                    <button onClick={closeModal}>Cancelar</button>
                    <input type="submit" value="Salvar" />
                </div>
            </form>
        </Modal>
    )
}

export default NewPurchaseModal;