import "./Table.css";

interface TableProps {
    headers: Header[];
    data: any[];
}
interface Header {
    key: string;
    label: string;
    conditionalClass?: (d: any) => string;
    formatter?: (d: any) => any;
}
const Table = (props: TableProps) => {
    const { headers, data } = props; 
    return (
        <div className="table-wrapper">
            <table className="Table">
                <thead>
                    <tr>
                        { headers.map(h =><th key={h.key}>{h.label}</th>) }
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map(d =>(
                            <tr key={d.ticker}>
                                {
                                    headers.map(h => {
                                        const value = h.formatter ? h.formatter(d[h.key]) : d[h.key];
                                        const className = h.conditionalClass ? h.conditionalClass(d[h.key]) : "";
                                        return ( <td key={d.ticker+h.key} className={className}>{value}</td> );
                                    })
                                }
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
};

export default Table;