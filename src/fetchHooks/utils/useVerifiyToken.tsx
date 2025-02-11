import { useMutation } from "@tanstack/react-query"
import { axiosClient } from "../../provider/axiosClient"

export default () => {
    return useMutation({
        mutationFn: async () => {
            const tokenResponse = localStorage.getItem("_auth_token")

            const response = await axiosClient.post('/account/verify-token', {
                token: tokenResponse
            })

            return response.data
        }
    })
}