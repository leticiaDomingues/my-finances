import "./InfoModal.css";
import { Stock } from "../../../data/stocks";
import BaseModal from "../base-modal/BaseModal";
import { currencyFormatter } from "../../../utils/formatter";
import { useForm } from "react-hook-form";


interface IInfoModalProps {
    isOpen: boolean;
    title: string;
    subtitle: string;
    item: any;
    closeModal: () => void;
    sellItem: (item: any, qty: number) => void;
}

const InfoModal = (props: IInfoModalProps) => {
    const { title, subtitle, isOpen, closeModal, sellItem, item } = props;
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const sell = (data: any) => sellItem(item, data.qty);
    
    return (
        <BaseModal isOpen={isOpen} title={title} subtitle={subtitle} closeModal={closeModal} >
            <div className="info-modal">
                <div className="cards-wrapper">
                    <div className="card">
                        <p className="label">Quantidade</p>
                        <p className="value">{item.qty}</p>
                    </div>
                    <div className="card">
                        <p className="label">Preço compra</p>
                        <p className="value">{currencyFormatter(item.totalPurchasePrice ?? 0)}</p>
                    </div>
                    <div className="card">
                        <p className="label">Preço atual</p>
                        <p className="value">{currencyFormatter(item.totalCurrentPrice ?? 0)}</p>
                    </div>
                </div>
                <form className="buttons-wrapper" onSubmit={handleSubmit(sell)}>
                    <div className="sell-wrapper">
                        <input type="number" max={item.qty}
                            placeholder="Quantidade" className={errors.qty && "error"}
                            {...register("qty", { required: true, min: 1, max: item.qty })} />
                        <input type="submit" className="delete" value="Vender ações" />
                    </div>
                    <button onClick={closeModal}>Fechar</button>
                </form>
            </div>
        </BaseModal>
    )
}

export default InfoModal;