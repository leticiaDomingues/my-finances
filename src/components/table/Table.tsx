import "./Table.css";

const Table = () => {
    return (
        <div className="table-wrapper">
            <table className="Table">
                <thead>
                    <tr>
                        <th>Ticker</th>
                        <th>Nome</th>
                        <th>Setor</th>
                        <th>Quantidade</th>
                        <th>PM compra</th>
                        <th>PM atual</th>
                        <th>Preço total compra</th>
                        <th>Preço total atual</th>
                        <th>Lucro/prejuízo</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>ITSA4</td>
                        <td>Itaúsa</td>
                        <td>Bancos</td>
                        <td>226</td>
                        <td>R$ 10,93</td>
                        <td>R$ 7,85</td>
                        <td>R$ 2.470,18</td>
                        <td>R$ 1.774,10</td>
                        <td className="loss">-R$ 696,08</td>
                    </tr>
                    <tr>
                        <td>CPLE6</td>
                        <td>Copel (Cia Paranaense De Energia)</td>
                        <td>Energia</td>
                        <td>140</td>
                        <td>R$ 6,20</td>
                        <td>R$ 6,72</td>
                        <td>R$ 868,00</td>
                        <td>R$ 940,80</td>
                        <td className="profit">R$ 72,80</td>
                    </tr>
                    <tr>
                        <td>ITSA4</td>
                        <td>Itaúsa</td>
                        <td>Bancos</td>
                        <td>226</td>
                        <td>R$ 10,93</td>
                        <td>R$ 7,85</td>
                        <td>R$ 2.470,18</td>
                        <td>R$ 1.774,10</td>
                        <td className="loss">-R$ 696,08</td>
                    </tr>
                    <tr>
                        <td>CPLE6</td>
                        <td>Copel (Cia Paranaense De Energia)</td>
                        <td>Energia</td>
                        <td>140</td>
                        <td>R$ 6,20</td>
                        <td>R$ 6,72</td>
                        <td>R$ 868,00</td>
                        <td>R$ 940,80</td>
                        <td className="profit">R$ 72,80</td>
                    </tr>
                    <tr>
                        <td>ITSA4</td>
                        <td>Itaúsa</td>
                        <td>Bancos</td>
                        <td>226</td>
                        <td>R$ 10,93</td>
                        <td>R$ 7,85</td>
                        <td>R$ 2.470,18</td>
                        <td>R$ 1.774,10</td>
                        <td className="loss">-R$ 696,08</td>
                    </tr>
                    <tr>
                        <td>CPLE6</td>
                        <td>Copel (Cia Paranaense De Energia)</td>
                        <td>Energia</td>
                        <td>140</td>
                        <td>R$ 6,20</td>
                        <td>R$ 6,72</td>
                        <td>R$ 868,00</td>
                        <td>R$ 940,80</td>
                        <td className="profit">R$ 72,80</td>
                    </tr>
                    <tr>
                        <td>ITSA4</td>
                        <td>Itaúsa</td>
                        <td>Bancos</td>
                        <td>226</td>
                        <td>R$ 10,93</td>
                        <td>R$ 7,85</td>
                        <td>R$ 2.470,18</td>
                        <td>R$ 1.774,10</td>
                        <td className="loss">-R$ 696,08</td>
                    </tr>
                    <tr>
                        <td>CPLE6</td>
                        <td>Copel (Cia Paranaense De Energia)</td>
                        <td>Energia</td>
                        <td>140</td>
                        <td>R$ 6,20</td>
                        <td>R$ 6,72</td>
                        <td>R$ 868,00</td>
                        <td>R$ 940,80</td>
                        <td className="profit">R$ 72,80</td>
                    </tr>
                    <tr>
                        <td>ITSA4</td>
                        <td>Itaúsa</td>
                        <td>Bancos</td>
                        <td>226</td>
                        <td>R$ 10,93</td>
                        <td>R$ 7,85</td>
                        <td>R$ 2.470,18</td>
                        <td>R$ 1.774,10</td>
                        <td className="loss">-R$ 696,08</td>
                    </tr>
                    <tr>
                        <td>CPLE6</td>
                        <td>Copel (Cia Paranaense De Energia)</td>
                        <td>Energia</td>
                        <td>140</td>
                        <td>R$ 6,20</td>
                        <td>R$ 6,72</td>
                        <td>R$ 868,00</td>
                        <td>R$ 940,80</td>
                        <td className="profit">R$ 72,80</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default Table;