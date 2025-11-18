import { useEffect, useState } from "react";
import { AllCommunityModule, ModuleRegistry, type ColDef } from 'ag-grid-community';
import { Grid } from "@mui/material";
import { AgGridReact } from "ag-grid-react";
import getStock from "../../../services/servicesListStock/getItens";
import getHistory from "../../../services/serviceHistory/getHistory";

ModuleRegistry.registerModules([AllCommunityModule])

function ListStock() {


    const [rowData, setRowData] = useState<[{ nomeitem: string, quantidade: number, id: string | null }]>([{ nomeitem: "Sem itens", quantidade: 0, id: null }]);
    const [colDefs, setColDefs] = useState<ColDef[]>([
        { field: "nomeitem", headerName: "Item" },
        { field: "id" },
        { field: "quantidade" },
    ]);

    async function atualizaStock() {
        const all = await getStock()
        if (all.data.length !== 0) {
            setRowData(all.data)
        }
    }

    async function atualizaHistory() {
        const all = await getHistory();
        if (all.data.length !== 0) {
            setRowData(all.data)
        }
    }

    useEffect(() => {
        atualizaStock()
        atualizaHistory()
    }, [])

    function ListHistory() {

        const [rowData, setRowData] = useState<[{ nomePessoa: string, nomeItem: string, quantidade: number, operacao: string }]>([{ nomePessoa: "Sem itens", nomeItem: "Sem itens", quantidade: 0, operacao: "Sem itens" }]);

        const [colDefs, setColDefs] = useState<ColDef[]>([
            { field: "nomePessoa" },
            { field: "nomeItem" },
            { field: "quantidade" },
            { field: "operacao" }
        ]);

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
                        rowData={rowData}
                        columnDefs={colDefs}
                    />
                </div>
                <ListHistory />
            </Grid>
        </>
    )
}

export default ListStock