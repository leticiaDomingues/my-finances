import { useRef } from "react";
import { MdUpload } from "react-icons/md";

interface ImportButtonProps {
    onLoad: (d: any) => void
}

const ImportButton = (props: ImportButtonProps) => {
    const fileReaderRef = useRef<HTMLInputElement>(null);

    const importStocks = async (e: any ) => {
        const reader = new FileReader();
        reader.onload = async (e) => { 
            if (e.target) {
                const text = e.target.result as string;
                props.onLoad(JSON.parse(text));
            }
        };
        reader.readAsText(e.target?.files[0]);
    }
    
    const openFileReader = () => {
        fileReaderRef.current?.click();
    };

    
    return (
        <button onClick={_ => openFileReader()}>
            <input type="file" onChange={(e) => importStocks(e)} ref={fileReaderRef} />
            <MdUpload className="icon" />
            Importar
        </button>
    )
}

export default ImportButton;