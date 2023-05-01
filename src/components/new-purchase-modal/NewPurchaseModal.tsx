import "./NewPurchaseModal.css";
import Modal from 'react-modal';
import { MdClose } from 'react-icons/md';


interface INewPurchaseModalPropos {
    isOpen: boolean;
    title: string;
    subtitle: string;
    closeModal: () => void;
}

const NewPurchaseModal = (props: INewPurchaseModalPropos) => {
    const { title, subtitle, isOpen, closeModal } = props;
    return (
        <Modal className="modal"
            isOpen={isOpen}
            onRequestClose={closeModal}
        >
            <div className="close-button">
                <button onClick={closeModal}><MdClose /></button>
            </div>
            <div>
                <h2 className="title">{title}</h2>
                <h3 className="subtitle">{subtitle}</h3>
                <form>
                    <input type="text" name="ticker" placeholder="Ticker"/>
                    <input type="text" name="category" placeholder="Setor"/>
                    <input type="number" name="qty" placeholder="Quantidade"/>
                    <input type="number" name="price" placeholder="Preço por ação"/>
                    <p>Total da compra: R$00,00</p>
                </form>
            </div>
            <div className="buttons-wrapper">
                <button onClick={closeModal}>Cancelar</button>
                <button>Salvar</button>
            </div>
        </Modal>
    )
}

export default NewPurchaseModal;