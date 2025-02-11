import { useMutation } from "@tanstack/react-query"
import { AccountLogin } from "../../../ServerTypes/Account"
import { toast } from "react-toastify"
import { axiosClient } from "../../../provider/axiosClient"
import { Text } from "@mantine/core"
import { AxiosError } from "axios"
import { parseResponseMessage } from "../../../utils/StringUtils"

export default () => {
    return useMutation({
        mutationKey: ['login'],
        mutationFn: async (request: AccountLogin) => {
            const response = await toast.promise(axiosClient.post('/account/login', request), {
                pending: {
                    render () { return <Text c="black">Logging Account ...</Text> }
                },
                success: {
                    render() {
                        return <Text c="green">Account Login</Text>
                    },
                },
                error: {
                    render({ data }) {
                        const errorMessage = data as AxiosError
                        return <Text c="red">{parseResponseMessage(String(errorMessage.response?.data))}</Text>
                    }
                },
            })

            return response.data
        }
    })
}