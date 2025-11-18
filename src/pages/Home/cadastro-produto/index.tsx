import { Button, Grid, TextField } from "@mui/material";
import { AgGridReact } from 'ag-grid-react'
import { AllCommunityModule, ModuleRegistry, type ColDef } from 'ag-grid-community';
import { useContext, useEffect, useState } from "react";
import getItens from "../../../services/serviceListProdut/getItem";
import { Controller, Form, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SchemaCadItem, SchemaEditItem, type cadItemInitialValue, type editItem, type initialValueEditItem, type item } from "./typeFomCadItem";
import addItem from "../../../services/serviceListProdut/addItem";
import updateItem from "../../../services/serviceListProdut/editItem";
import { userContext } from "../../../App";

ModuleRegistry.registerModules([AllCommunityModule])

function RenderEditItem({ fetchData }: { fetchData: () => void }) {

  const { control } = useForm<initialValueEditItem>({ resolver: zodResolver(SchemaEditItem), mode: "all" })

  const context = useContext(userContext)
  const { handleShowAlert } = context!

  return (
    <>
      <Form<initialValueEditItem, editItem> control={control} onSubmit={async ({ data }: { data: editItem }) => {
        console.log(data)
        try {
          await updateItem(data)
          fetchData()
          handleShowAlert('Item editado com sucesso', 'success')
        } catch (error: any) {
          const msg = error.response.data.message || 'Erro ao editar item'
          handleShowAlert(msg, 'error')
        }
      }}>
        <Grid size={12} margin={'3rem 0'}>
          <Controller
            name='id'
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                sx={{ width: '88%' }}
                size="small"
                {...field}
                onChange={(e) => field.onChange(Number(e.target.value))}
                type="number"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                label="item ID"
                variant="outlined"
              />
            )}
          />
          <Controller
            name="nameItem"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                sx={{ width: "88%" }}
                size="small"
                {...field}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                label="Editar nome"
                variant="outlined"
              />
            )}
          />
        </Grid>
        <Grid size={12}>
          <Button sx={{ width: "88%" }} type="submit">
            Editar
          </Button>
        </Grid>
      </Form>
    </>
  )
}

export default function CadItem() {

  const [rowData, setRowData] = useState<[{ nome: string, id: string | null }]>([{ nome: "Sem itens", id: null }]);
  const [colDefs, setColDefs] = useState<ColDef[]>([
    { field: "nome" },
    { field: "id" },
  ]);

  const defaultColdDef = {
    flex: 1,
  }

  async function pegarItens() {
    const All = await getItens()
    return All
  }

  async function fetchData() {
    const all = await pegarItens();
    if (all.data.length !== 0) {
      setRowData(all.data)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])


  const context = useContext(userContext)
  const { handleShowAlert } = context!

  const { control } = useForm<cadItemInitialValue>({ resolver: zodResolver(SchemaCadItem), mode: 'onSubmit' });

  return (
    <>
      <Grid container sx={{ width: "100%", justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <Grid container sx={{ width: "70%", backgroundColor: "#363636", minHeight: '90%', borderRadius: '10px' }}>
          <Grid size={6} sx={{ height: '100%' }}>
            <Grid size={12}>
              <h3 style={{ margin: '1rem' }}>Cadastro de item</h3>
              <Form<cadItemInitialValue, item> control={control} onSubmit={async ({ data }: { data: item }) => {
                const { nome } = data
                try {
                  await addItem(nome)
                  await fetchData()
                  handleShowAlert('Item cadastrado com sucesso', 'success')
                } catch (error: any) {

                  const msg = error?.response?.data?.message || 'Erro ao cadastrar item'

                  handleShowAlert(msg, 'error')
                }
              }} >
                <Grid size={12}>
                  <Controller
                    name="nome"
                    control={control}
                    render={({ field, fieldState }) => (
                      <TextField
                        sx={{ width: "88%" }}
                        size="small"
                        {...field}
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                        label="nome do item"
                        variant="outlined"
                      />
                    )}
                  />
                </Grid>
                <Grid size={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Button type="submit" sx={{ margin: '1rem', width: '89%' }}>
                    Enviar
                  </Button>
                </Grid>
              </Form>
              <hr />
              <Grid size={12} sx={{ marginTop: '3rem', alignItems: 'center' }}>
                <h3 style={{ margin: '1rem' }}>Editar item</h3>
                <RenderEditItem fetchData={fetchData} />
              </Grid>
            </Grid>
          </Grid>
          <Grid size={6} padding={1.3}>
            <AgGridReact
              rowData={rowData}
              columnDefs={colDefs}
              defaultColDef={defaultColdDef}
            />
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}