import { MdDownload } from "react-icons/md";

interface IExportButtonProps {
    fileName: string;
    data: any;
}

const ExportButton = (props: IExportButtonProps) => {
    const { fileName, data } = props;

    const exportJson = () => {
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
        const link = document.createElement("a");
    
        const href = URL.createObjectURL(blob);
        link.href = href;
        link.download = fileName + ".json";
        document.body.appendChild(link);
        link.click();
    
        document.body.removeChild(link);
        URL.revokeObjectURL(href);
    }
    
    return (
        <button onClick={_ => exportJson()}>
            <MdDownload className="icon" />
            Exportar
        </button>
    )
}

export default ExportButton;