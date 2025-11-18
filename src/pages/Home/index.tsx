import { useEffect } from "react"
import { Outlet, useNavigate } from "react-router"

export default function Home() {


    const navigate = useNavigate()



    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token) {
            navigate('/')
        }
    }, [])




    return (
        <>
            <Outlet />
        </>
    )
}