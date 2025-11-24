import { useEffect, useState } from "react";
import { AllCommunityModule, ModuleRegistry, type ColDef } from 'ag-grid-community';
import { Grid } from "@mui/material";
import { AgGridReact } from "ag-grid-react";
import getStock from "../../../services/servicesListStock/getItens";
import getItens from "../../../services/serviceListProdut/getItem"
import getHistory from "../../../services/serviceHistory/getHistory";

ModuleRegistry.registerModules([AllCommunityModule])

function ListStock(){

    const [rowDataEstoque, setRowDataEstoque] = useState<[{ nomeitem: string, quantidade: number, id: string | null }]>([]);
    const [colDefsEstoque, setColDefsEstoque] = useState<ColDef[]>([
        { field: "nameitem", headerName: "Item" },
        { field: "id_stock", headerName: "Id Estoque" },
        { field: "quantidade" },
        {field: "item_id", headerName: "id do produto"}
    ]);

    async function atualizaStock() {
        const all = await getStock()
        if (all.data.length !== 0) {
        setRowDataEstoque(all.data)
        }
    }

    useEffect(() => {
        atualizaStock()
    }, [])

    function ListHistory() {

        const [rowData, setRowData] = useState<[{ nomePessoa: string, nomeItem: string, quantidade: number, operacao: string }]>([]);

        const [colDefs, setColDefs] = useState<ColDef[]>([
            { field: "nome_user" , headerName: "Usuario" },
            { field: "nome_item" , headerName: "Item"},
            { field: "quantidade" , headerName: "Quantidade"},
            { field: "tipo_movimentacao" , headerName: "Operação" },
            { field: "id" , headerName: "Historico Id"}
        ]);

    async function atualizaHistory() {
        const all = await getHistory();
        if (all.data.length !== 0) {
            setRowData(all.data)
        }
    }

    useEffect(() => {
      atualizaHistory()
    }, [])

        return (
            <>
                <div className="ag-theme-alpine" style={{ height: '80%', width: '45%', margin: '2rem' }}>
                    <h2>Historico</h2>
                    <AgGridReact
                        rowData={rowData}
                        columnDefs={colDefs}
                    />
                </div>
            </>
        )
    }



    return (
        <>
            <Grid sx={{ width: '100%', height: '100%', display: 'flex' }}>
                <div className="ag-theme-alpine" style={{ height: '80%', width: '45%', margin: '2rem' }}>
                    <h2>Estoque</h2>
                    <AgGridReact
                        rowData={rowDataEstoque}
                        columnDefs={colDefsEstoque}
                    />
                </div>
                <ListHistory />
            </Grid>
        </>
    )
}

export default ListStock
