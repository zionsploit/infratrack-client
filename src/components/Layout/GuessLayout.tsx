import { Outlet, useNavigate } from "react-router"
import useVerifiyToken from "../../fetchHooks/utils/useVerifiyToken"
import { useEffect } from "react"
import { Loading } from "../ui/Loading"

export const GuessLayout = () => {

    const verifyToken = useVerifiyToken()
    const navigate = useNavigate()

    useEffect(() => {
        const verify = async () => {
            const response = await verifyToken.mutateAsync()
            
            if (response) {
                navigate("/")
            }
        }
        verify()
    }, [])

    if (verifyToken.isPending) return <Loading />

    if (verifyToken.isError) return  <Outlet />
    return <></>
}