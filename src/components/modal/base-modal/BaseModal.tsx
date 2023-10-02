import "./BaseModal.css";
import Modal from 'react-modal';
import { MdClose } from 'react-icons/md';


interface IBaseModalProps {
    isOpen: boolean;
    title: string;
    subtitle: string;
    children: any;
    closeModal: () => void;
}

const BaseModal = (props: IBaseModalProps) => {
    const { title, subtitle, isOpen, closeModal, children } = props;

    return (
        <Modal className="modal"
            isOpen={isOpen}
            onRequestClose={closeModal}
        >
            <div className="close-button">
                <button onClick={closeModal}><MdClose /></button>
            </div>
            <h2 className="title">{title}</h2>
            <h3 className="subtitle">{subtitle}</h3>
            { children }
        </Modal>
    )
}

export default BaseModal;