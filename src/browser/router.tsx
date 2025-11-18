import { createBrowserRouter } from "react-router";
import App from "../App";
import InitialPage from "../pages/login";
import Home from "../pages/Home";
import ListStock from "../pages/Home/estoque";
import Cart from "../pages/Home/carrinho ";
import CadItem from "../pages/Home/cadastro-produto";
import Consumido from "../pages/Home/itensConsome";

const router = createBrowserRouter([
    {
        element: <App />,
        children: [
            {
                index: true,
                element: <InitialPage />
            },
            {
                path: '/home',
                element: <Home />,
                children: [
                    {
                        index: true,
                        element: <ListStock />
                    },
                    {
                        path: 'cart',
                        element: <Cart />
                    },
                    {
                        path: 'consumo',
                        element: <Consumido />
                    }
                    , {
                        path: 'cadItem',
                        element: <CadItem />
                    }

                ]
            }
        ]
    },
])

export default router