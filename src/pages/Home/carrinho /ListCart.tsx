import { useContext, useEffect, useState } from "react"
import { AllCommunityModule, ModuleRegistry, type ColDef, type ICellRendererParams } from 'ag-grid-community';
import { AgGridReact } from "ag-grid-react";
import { IconButton } from "@mui/material";
import { Add, Delete, Remove } from "@mui/icons-material";
import getCartList from "../../../services/serviceCart/getCartList";
import { MoveOneItemCart } from "../../../services/serviceCart/AddOneItemCart";
import { removeProductCart } from "../../../services/serviceCart/removeProductCart";
import { removeOneItem } from "../../../services/serviceCart/RemoveOneItemCart";
import { userContext } from "../../../App";


ModuleRegistry.registerModules([AllCommunityModule])

function ListCart({ cartChanged }: { cartChanged: boolean }) {

    const context = useContext(userContext)

    const { handleShowAlert } = context!

    const [rowData, setRowData] = useState<[{
        nomeitem: string,
        quantidade: number
    }]>
        ([{
            nomeitem: "Sem itens",
            quantidade: 0
        }]);


    const [colDefs] = useState<ColDef[]>([
        {
            field: "nomeitem",
            headerName: "Item"
        },
        {
            headerName: "quantidade",
            field: "quantidade",
            cellRenderer: (p: ICellRendererParams) => p.data ? ActionAmount(p.data.quantidade, p.data.id) : null
        },
        {
            headerName: "Deletar",
            field: "deletar", cellRenderer: (p: ICellRendererParams) => p.data ? ActionDelete(p.data.id) : null
        },
    ]);


    async function atualizaCart() {
        const all = await getCartList();
        if (all.data.length !== 0) {
            setRowData(all.data)
        }
    }

    useEffect(() => {
        atualizaCart()
    }, [])
    useEffect(() => {
        atualizaCart()
    }, [cartChanged])

    async function handleMoveAddOneCart(id: number) {
        await MoveOneItemCart(id)
            .then(() => {
                handleShowAlert('Item adicionado com sucesso', 'success')
            })
            .catch((err: any) => {
                const msg = err?.response?.data?.message || 'Erro ao adicionar ao carrinho'
                handleShowAlert(msg, 'error')
            })
        atualizaCart()
    }
    async function handleMoveRemoveOneCart(id: number) {
        await removeOneItem(id)
            .then(() => {
                handleShowAlert('Item removido com sucesso', 'success')
            })
            .catch((err: any) => {
                const msg = err?.response?.data?.message || 'Erro ao remover item'
                handleShowAlert(msg, 'error')
            })
        atualizaCart()
    }

    async function HandleRemoveProductCart(id: number) {
        await removeProductCart(id)
            .then(() => {
                handleShowAlert('Preoduto removido com sucesso', 'success')
            })
            .catch((err: any) => {
                const msg = err?.response?.data?.message || 'Erro ao remover produto'
                handleShowAlert(msg, 'error')
            })
        atualizaCart()
    }

    function ActionAmount(quantidade: number, id: number) {
        return (
            <>
                <IconButton
                    onClick={() => handleMoveAddOneCart(id)}
                >
                    <Add />
                </IconButton>
                {quantidade}
                <IconButton
                    onClick={() => handleMoveRemoveOneCart(id)}
                >
                    <Remove />
                </IconButton>
            </>
        )
    }

    function ActionDelete(id: string) {
        return (
            <>
                <IconButton
                    onClick={() => HandleRemoveProductCart(Number(id))}
                >
                    <Delete />
                </IconButton>
            </>
        )
    }



    return (
        <>
            <div className="ag-theme-alpine" style={{ height: '80%', width: '45%' }}>
                <h2>Carrinho</h2>
                <AgGridReact
                    rowData={rowData}
                    columnDefs={colDefs}
                />
            </div>
        </>
    )
}

export default ListCart