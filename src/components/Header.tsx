import { Dehaze } from "@mui/icons-material";
import { Drawer, IconButton } from "@mui/material";
import { useLocation } from "react-router";
import SideBar from "./SideBar";
import { useState } from "react";


export default function Header() {

    const location = useLocation()
    const currentRoute = location.pathname;
    
    const [openSideBr, setOpenSideBar] = useState<boolean>(false)

    const toggleDrawer = (params:boolean) => () => {
        setOpenSideBar(params)
    }


    return (
        <>
            <header style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '50px',
                backgroundColor: 'gray',
                color: 'black',
                margin: '0',
                padding: '0'
            }}>
                    {
                     currentRoute !== '/'
                     ?
                    <>
                     <IconButton  sx={{marginLeft: '.3rem'}} onClick={toggleDrawer(true)}>
                            <Dehaze/>
                         </IconButton>
                         <Drawer open={openSideBr} onClose={toggleDrawer(false)}>
                            <SideBar toggleDrawer={toggleDrawer}/>
                         </Drawer>
                    </>
                     : 
                     null
                    }

                <h2 style={{margin:'0 auto'}}>controle de compras</h2>
            </header>
        </>
    )
}