import { MdHistory } from "react-icons/md";

interface IHistoryButtonProps {
    onClick: () => void
}

const HistoryButton = (props: IHistoryButtonProps) => {
    return (
        <button onClick={_ => props.onClick()}>
            <MdHistory className="icon" />
            Histórico
        </button>
    );
}
export default HistoryButton;