import { useContext, useState } from "react";
import { Controller, Form, useForm } from "react-hook-form";
import { SchemaCadastro, SchemaUser, type cadastro, type user, type userInitialValue } from "./user";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Grid, IconButton, InputAdornment, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import createUser from "../../services/servicesUser/CreateUsers";
import LoginUser from "../../services/servicesUser/LoginUser";
import { useNavigate } from "react-router";
import { userContext } from "../../App";


export default function InitialPage() {

    const contexto = useContext(userContext)

    const { handleShowAlert } = contexto!

    const [cadastro, setCadastro] = useState(true)
    const navigate = useNavigate()
    return (
        <>
            <img src="https://instafruta.com.br/wp-content/uploads/2022/11/feira-online-1536x1023.jpeg" alt="sla" width={'70%'} height={'100%'} />
            {cadastro ? <Login /> : <Cadastro />}
        </>
    )


    function Login() {



        const { control } = useForm<userInitialValue>({ resolver: zodResolver(SchemaUser), mode: 'all' });
        const contexto = useContext(userContext)


        const [verSenha, setVerSenha] = useState(false)


        const handleLogin = async ({ data }: { data: user }) => {
            await LoginUser({
                login: data.login,
                senha: data.senha
            }).then((res) => {
                localStorage.setItem('token', res.data.token)
                contexto!.setUsuario({
                    nome: res.data.user.nome,
                    id: res.data.user.id,
                    login: res.data.user.login
                })
                navigate('/home')
                handleShowAlert('Logado com sucesso', 'success')
            })
                .catch((err) => {
                    const msg = err?.response?.data?.message || 'Erro'
                    handleShowAlert(msg, 'error')
                }
                )
        };

        return (
            <>
                <Form<userInitialValue, user> control={control} onSubmit={handleLogin} style={{ width: '30%', height: '100%' }}>
                    <Grid sx={{ backgroundColor: 'white', width: '100%', height: '100%', alignItems: 'start', padding: '3.5rem' }}>

                        <h2 style={{ color: 'black' }}>{"Login"}</h2>
                        <Grid size={12} margin={'2rem 0'}>
                            <Controller
                                name="login"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <TextField
                                        sx={{ width: '15vw' }}
                                        size="small"
                                        {...field}
                                        error={!!fieldState.error}
                                        helperText={fieldState.error?.message}
                                        label="login"
                                        variant="outlined"
                                    />
                                )} />
                        </Grid>
                        <Grid size={12} margin={'2rem 0'}>
                            <Controller
                                name="senha"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <TextField
                                        sx={{ width: '15vw' }}
                                        size="small"
                                        {...field}
                                        error={!!fieldState.error}
                                        helperText={fieldState.error?.message}
                                        label="senha"
                                        variant="outlined"
                                        type={verSenha ? 'text' : 'password'}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton onClick={() => setVerSenha(!verSenha)}>
                                                        {verSenha ? <Visibility /> : <VisibilityOff />}
                                                    </IconButton>
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                )} />
                        </Grid>


                        <Grid size={12} margin={'2rem 0'}>
                            <Button type="submit" style={{ width: '100%', height: '2.5rem', backgroundColor: 'black', color: 'white' }}>Entrar</Button>
                        </Grid>


                        <Button
                            size="small"
                            variant="outlined"
                            onClick={() => setCadastro(!cadastro)}
                            style={{ border: 'transparent' }}
                        >
                            cadastre-se
                        </Button>
                    </Grid >
                </Form>
            </>
        )
    }


    function Cadastro() {

        const [verSenha, setVerSenha] = useState(false)

        const { control } = useForm({ resolver: zodResolver(SchemaCadastro), mode: 'all' });

        async function handleCadastro({ data }: { data: cadastro }) {
            const { nome, login, senha } = data
            await createUser({ nome, login, senha }).then(() => {
                handleShowAlert('Cadastrado com sucesso', 'success')
                setCadastro(!cadastro)
            }).catch((err: any) => {
                const msg = err?.response?.data?.message || 'Erro ao logar'
                handleShowAlert(msg, 'error')
            })
        }
        return (
            <>
                <Form control={control} onSubmit={handleCadastro} style={{ width: '30%', height: '100%' }}>
                    <Grid sx={{ backgroundColor: 'white', width: '100%', height: '100%', alignItems: 'start', padding: '3.5rem' }}>
                        <h2 style={{ color: 'black' }}>{"Cadastro"}</h2>
                        <Grid size={12} margin={'2rem 0'}>
                            <Controller
                                name='nome'
                                control={control}
                                render={({ field, fieldState }) => (
                                    <TextField
                                        sx={{ width: '15vw' }}
                                        size="small"
                                        {...field}
                                        error={!!fieldState.error}
                                        helperText={fieldState.error?.message}
                                        label='nome'
                                        variant="outlined"
                                    />
                                )} />
                        </Grid>
                        <Grid size={12} margin={'2rem 0'}>
                            <Controller
                                name="login"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <TextField
                                        sx={{ width: '15vw' }}
                                        size="small"
                                        {...field}
                                        error={!!fieldState.error}
                                        helperText={fieldState.error?.message}
                                        label="login"
                                        variant="outlined"
                                    />
                                )} />
                        </Grid>
                        <Grid size={12} margin={'2rem 0'}>
                            <Controller
                                name="senha"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <TextField
                                        sx={{ width: '15vw' }}
                                        size="small"
                                        {...field}
                                        error={!!fieldState.error}
                                        helperText={fieldState.error?.message}
                                        label="senha"
                                        variant="outlined"
                                        type={verSenha ? 'text' : 'password'}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton onClick={() => setVerSenha(!verSenha)}>
                                                        {verSenha ? <Visibility /> : <VisibilityOff />}
                                                    </IconButton>
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                )} />
                        </Grid>
                        <Grid size={12} margin={'2rem 0'}>
                            <Controller
                                name="confirmarSenha"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <TextField
                                        sx={{ width: '15vw' }}
                                        size="small"
                                        {...field}
                                        error={!!fieldState.error}
                                        helperText={fieldState.error?.message}
                                        label="Confirmar senha"
                                        variant="outlined"
                                        type={verSenha ? 'text' : 'password'}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton onClick={() => setVerSenha(!verSenha)}>
                                                        {verSenha ? <Visibility /> : <VisibilityOff />}
                                                    </IconButton>
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                )} />
                        </Grid>

                        <Grid size={12} margin={'2rem 0'}>
                            <Button
                                type="submit"
                                style={{ width: '100%', height: '2.5rem', backgroundColor: 'black', color: 'white' }}
                            >
                                Cadastrar
                            </Button>
                        </Grid>


                        <Button
                            size="small"
                            variant="outlined"
                            style={{ border: 'transparent' }}
                            onClick={() => setCadastro(!cadastro)}
                        >
                            Entrar
                        </Button>
                    </Grid>
                </Form>
            </>
        )
    }
}