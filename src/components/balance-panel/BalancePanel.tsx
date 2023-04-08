import "./BalancePanel.css";

interface IBalancePanelProps {
    data: {
        label: string;
        value: any;
        formatter?: (p: any) => any;
        conditionalClass?: (p: any) => string;
    }[]
}

const BalancePanel = (props: IBalancePanelProps) => {
    const { data } = props;
    return (
        <div className="balance">
            { data.map((d, i) => (
                <div className="card" key={'balance-' + i}>
                    <p>{d.label}</p>
                    <p className={d.conditionalClass ? d.conditionalClass(d.value) : ''}>
                        {d.formatter ? d.formatter(d.value) : d.value}
                    </p>
                </div>
            )) }
        </div>
    );
}
export default BalancePanel;