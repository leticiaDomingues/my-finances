import { MdAdd } from "react-icons/md";

interface INewButtonProps {
    onClick: () => void;
}

const NewButton = (props: INewButtonProps) => {
    return (
        <button onClick={_ => props.onClick()}>
            <MdAdd className="icon" />
            Nova entrada
        </button>
    );
}

export default NewButton;