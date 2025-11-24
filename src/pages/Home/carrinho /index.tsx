import { Accordion, AccordionDetails, AccordionSummary, Autocomplete, Box, Button, Grid, TextField } from "@mui/material";
import ListCart from "./ListCart";
import { AddShoppingCart, ArrowDropDown } from "@mui/icons-material";
import { Controller, Form, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SchemaCartItens, type initialValueCart, type typeCart } from "./typeCart";
import { useContext, useEffect, useState } from "react";
import getItens from "../../../services/serviceListProdut/getItem";
import { multipleSendItens } from "../../../services/serviceCart/multipleSendItens";
import { AllCommunityModule, ModuleRegistry, } from 'ag-grid-community';
import { userContext } from "../../../App";
import { SubmitCart } from "../../../services/serviceCart/SubmitCart";

ModuleRegistry.registerModules([AllCommunityModule])
export default function Cart() {

    const context = useContext(userContext)

    const { handleShowAlert } = context!

    const { control } = useForm(
        {
            resolver: zodResolver(SchemaCartItens),
            mode: 'all'
        }
    )
    const [allitens, setAllItens] = useState([])
    const [cartChange, setCartChange] = useState(false)

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


    const handleSubmitCart = async ({ data }: { data: typeCart }) => {
        const { nameItem, quantidade } = data
        await multipleSendItens(quantidade, nameItem)
            .then(() => {
                handleShowAlert('Adicionado ao carrinho', 'success')
            })
            .catch((err: any) => {
                const msg = err?.response?.data?.message || 'Erro ao adicionar ao carrinho'
                handleShowAlert(msg, 'error')
            })
        setCartChange((prev) => !prev)

    }

    return (
        <Box sx={{ width: '100%', height: '100%' }}>
            <Form<initialValueCart, typeCart> onSubmit={handleSubmitCart} control={control} style={{ width: '100%' }}>
                <Accordion defaultExpanded={true}>
                    <AccordionSummary
                        aria-controls="panel1a-content"
                        expandIcon={<ArrowDropDown />}
                    >
                        {"Adicionar ao carrinho"}
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
                        <Button type="submit">Adicionar ao carrinho</Button>
                    </AccordionDetails>
                </Accordion>
            </Form>
            <Box sx={{ width: '100%', height: '80vh', alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
                <ListCart cartChanged={cartChange} />
            </Box>
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
                onClick={() => SubmitCart()
                    .then(() => {
                        setCartChange((prev) => !prev)
                        handleShowAlert('Compra finalizada com sucesso', 'success')
                    }
                    ).catch((err: any) => {
                        const msg = err?.response?.data?.message || 'Erro ao finalizar compra'
                        console.log(err)
                        handleShowAlert(msg, 'error')
                    })
                }
            >
                {"Finalizar compra"}
                {<AddShoppingCart />}
            </Button>
        </Box>
    )
}
