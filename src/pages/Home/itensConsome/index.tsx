import { v4 as uuidv4 } from 'uuid'
import { AddShoppingCart, ArrowDropDown } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Autocomplete, Box, Button, Grid, TextField } from "@mui/material";
import { Controller, Form, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useEffect, useState } from "react";
import getItens from "../../../services/serviceListProdut/getItem";
import { AllCommunityModule, ModuleRegistry, } from 'ag-grid-community';
import { userContext } from "../../../App";
import { SubmitCart } from "../../../services/serviceCart/SubmitCart";
import { AgGridReact } from "ag-grid-react";
import { IconButton } from "@mui/material";
import { Add, Delete, Remove } from "@mui/icons-material";
import { z } from "zod";



 const SchemaCartItens = z.object({
  quantidade: z.number().min(1),
  nameItem: z.string().min(2),
});

 type typeCart = z.infer<typeof SchemaCartItens>;

 type initialValueCart = {
  quantidade: number;
  nameItem: string;
};

ModuleRegistry.registerModules([AllCommunityModule])

function Consumido() {

  const context = useContext(userContext)

  const { handleShowAlert } = context!

  const [rowData , setRowData] = useState<Array<{
    nameItem: string,
    quantidade:number,
    id: string
  }>>([])

    const [colDefs] = useState<ColDef[]>([
    {
      field: "nameItem",
      headerName: "Item"
    },
{
      field: "quantidade",
      headerName:"Quantidade",
      cellRenderer: (p: ICellRendererParams) => p.data ? ActionAmount(p.data.quantidade, p.data.id) : null
    },
    {
      headerName:"Deletar",
      cellRenderer: (p: ICellRendererParams) => p.data ? ActionDelete (p.data.id) : null
    },
    {
      field: "id"
    },
])

    const [allitens, setAllItens] = useState([])
  

    useEffect(() => {
        async function fetchData() {
            const all = await getItens();
            if (all.data.length !== 0) {
                let iten: [] = []
                //@ts-ignore
                all.data.map((item) => iten.push(item.nome!))
                setAllItens(iten)
            }
        }
        fetchData()
    }, [])

    const { control } = useForm(
        {
            resolver: zodResolver(SchemaCartItens),
            mode: 'all'
        }
    )


  
    const buscarItemsConsumo = () => {

      return JSON.parse(localStorage.getItem("Consumo")) || []
    }

    const addItemConsumo = (data:{nameItem: string, quantidade:number}) => {

     const allItensConsumo = buscarItemsConsumo()
     
     const verifica = allItensConsumo.find((p) => p.nameItem === data.nameItem)
    if(!verifica){
      allItensConsumo.push({
       nameItem: data.nameItem,
       quantidade: data.quantidade,
       id: uuidv4()
      })
       localStorage.setItem("Consumo",JSON.stringify(allItensConsumo))
        setRowData(allItensConsumo)
      handleShowAlert("atualizado", "success")
    } else if (verifica) {
      const mod = allItensConsumo.filter(obj => obj.nameItem !== verifica.nameItem)
      mod.push({
        nameItem:data.nameItem,
        quantidade: (verifica.quantidade + data.quantidade),
        id: verifica.id
      })

       localStorage.setItem("Consumo",JSON.stringify(mod))
        setRowData(mod)
      handleShowAlert("atualizado", "success")
    }
    }
    
    function atualizaIdiceLista(id: string, metod: string){
     const allItensConsumo = buscarItemsConsumo()
     const indice = allItensConsumo.find((p) => p.id === id)
     const mod = allItensConsumo.filter(obj => obj.id !== id)

      metod === "sub"  ?
      mod.push({
        nameItem: indice.nameItem,
        quantidade: indice.quantidade - 1,
        id: indice.id
      })
      :
      mod.push({
        nameItem: indice.nameItem,
        quantidade: indice.quantidade + 1,
        id: indice.id
      })


      localStorage.setItem("Consumo",JSON.stringify(mod))
      setRowData(mod)
      handleShowAlert("atualizado", "success")
  }

  function deleteIndiceList(id:string){
    const allItensConsumo = buscarItemsConsumo()
    const mod = allItensConsumo.filter(obj => obj.id !== id)


      localStorage.setItem("Consumo",JSON.stringify(mod))
      setRowData(mod)
      handleShowAlert("item deletado", "success")
  }

    useEffect(() => {
    const p = buscarItemsConsumo()
     setRowData(p)
  }, [])



  
    function ActionAmount(quantidade: number, id: string) {
        return (
            <>
                <IconButton
                  onClick={() => atualizaIdiceLista(id, "mut")}
        >
                    <Add />
                </IconButton>
                {quantidade}
                <IconButton
                   onClick={() => atualizaIdiceLista(id, "sub")}
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
                  onClick={() => deleteIndiceList(id)}
        >
                    <Delete/>
                </IconButton>
            </>
        )
    }





    return (
        <div style={{height:"90vh" , width:"100vw"}}>
            <Form<initialValieCart, typeCart> control={control} style={{ width: '100%' }} onSubmit={(data)=> addItemConsumo(data.data) }>
                <Accordion defaultExpanded={true}>
                    <AccordionSummary
                        aria-controls="panel1a-content"
                        expandIcon={<ArrowDropDown />}
                    >
                        {"Adicionar ao consumido"}
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid size={12} sx={{ display: 'flex', gap: '2rem', flexDirection: 'column' }}>
                            <Controller
                                name='quantidade'
                                control={control}
                                render={({ field, fieldState }) => (
                                    <TextField
                                        {...field}
                                        onChange={(e) => field.onChange(Number(e.target.value))}
                                        sx={{ width: 300 }}
                                        label="Quantidade"
                                        error={!!fieldState.error}
                                        helperText={fieldState.error?.message}
                                        type="number"
                                    />
                                )}
                            />
                            <Controller
                                name='nameItem'
                                control={control}
                                render={({ field, fieldState }) => (
                                    <Autocomplete
                                        value={field.value ?? null}
                                        onChange={(_, value) => field.onChange(value)}
                                        disablePortal
                                        options={allitens}
                                        sx={{ width: 300 }}
                                        renderInput={(params) =>
                                            <TextField
                                                error={!!fieldState.error}
                                                helperText={fieldState.error?.message}
                                                {...params} label="Selecione um item" />}
                                        getOptionLabel={(option: any) => option.toString()}
                                    />
                                )}
                            />
                        </Grid>
                        <Button type="submit">Adicionar ao consumo</Button>
                    </AccordionDetails>
                </Accordion>
            </Form>
            <div className="ag-theme-alpine" style={{ height: '80vh', width: '100%', alingItems: 'center', justifyContent: 'center' , display: 'flex'}}>
                <div style={{ height: '80%', width:'45%' }}>
                <h2>Consumo</h2>
                <AgGridReact
                    rowData={rowData}
                    columnDefs={colDefs}
                />
                </div>
            </div>
            <Button
                sx={{
                    backgroundColor: 'blue ',
                    color: 'white',
                    width: 250,
                    height: 70,
                    margin: '1rem',
                    borderRadius: '10px',
                    position: 'absolute',
                    bottom: 40,
                    right: 40,
                    gap: '.7rem'
                }}
              //  onClick={() => SubmitConsumo()
                //    .then(() => {
                    //    handleShowAlert('Descontado com sucesso', 'success')
                  //  }
                  //  ).catch((err: any) => {
                   //     const msg = err?.response?.data?.message || 'Erro ao finalizar compra'
                    //    console.log(err)
                      //  handleShowAlert(msg, 'error')
                   // })
                //}
            >
                {"Descontar Consumo"}
                {<AddShoppingCart />}
            </Button>
        </div>
    )
}
export default Consumido
