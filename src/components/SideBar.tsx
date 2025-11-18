import { Add, InventoryTwoTone, ProductionQuantityLimits, ShoppingCartTwoTone } from "@mui/icons-material";
import { Box, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { useNavigate } from "react-router";

function SideBar({ toggleDrawer }: { toggleDrawer: (param: boolean) => () => void }) {

    const navigate = useNavigate()

    return (<>
        <Box sx={{ width: "250" }} role="presentation" onClick={toggleDrawer(false)}>
            <List>
                {['lista de Itens', 'Carrinho', 'Consumido'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton onClick={() => {
                            { index === 0 ? navigate('/home') : null }
                            { index === 1 ? navigate('/home/cart') : null }
                            { index === 2 ? navigate('/home/consumo') : null }
                            toggleDrawer(false)
                        }}>
                            <ListItemIcon >
                                {index === 0 ? <InventoryTwoTone /> : null}
                                {index === 1 ? <ShoppingCartTwoTone /> : null}
                                {index === 2 ? <ProductionQuantityLimits /> : null}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                <ListItem key={'Cadastro de item'} disablePadding>
                    <ListItemButton onClick={() => {
                        navigate('/home/cadItem')
                        toggleDrawer(false)
                    }}>
                        <ListItemIcon>
                            <Add />
                        </ListItemIcon>
                        <ListItemText primary={'Cadastro de Item'} />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    </>)
}

export default SideBar