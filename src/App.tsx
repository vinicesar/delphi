import Header from "./components/Header"
//@ts-ignore
import './index.css'
//@ts-ignore
import './App.css'
import { Box } from "@mui/material"
import { Outlet } from "react-router"
import { createContext, useState } from "react"
import type { typeAlert } from "./components/Alerts/failedAlert"
import AllAlert from "./components/Alerts/failedAlert"

type userLogin = {
    login: string
    nome: string
    id: string
} | null

type dateLogin = {
    usuario: userLogin;
    setUsuario: React.Dispatch<React.SetStateAction<userLogin>>;
    handleShowAlert: (message: string, type: typeAlert) => void
} | null



export const userContext = createContext<dateLogin | null>(null)

function App() {

    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('error');



    function handleShowAlert(message: string, type: typeAlert) {
        setAlertMessage(message);
        setAlertType(type);
        setAlertOpen(true);
    };

    const handleCloseAlert = () => {
        setAlertOpen(false);
    };

    const UserProvider = ({ children }: { children: React.ReactNode }) => {

        const [usuario, setUsuario] = useState<userLogin>(null)

        return (
            <userContext.Provider
                value={{ usuario: usuario, setUsuario: setUsuario, handleShowAlert: handleShowAlert }}>
                {children}
            </userContext.Provider>
        )
    }

    return (
        <UserProvider>
            <AllAlert open={alertOpen} message={alertMessage} type={alertType} onClose={handleCloseAlert} />
            <Header />
            <Box sx={{ display: 'flex', height: 'calc(100vh - 50px)' }}>
                <Outlet />
            </Box>
        </UserProvider>
    )
}

export default App