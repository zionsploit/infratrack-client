import { useMutation } from "@tanstack/react-query"
import { axiosClient } from "../../../provider/axiosClient"
import { toast } from "react-toastify"
import { AxiosError } from "axios"
import { IconExclamationCircle } from "@tabler/icons-react"
import { Text, ThemeIcon } from "@mantine/core"
import { AccountRegistration } from "../../../ServerTypes/Account"
import { parseResponseMessage } from "../../../utils/StringUtils"

export default () => {
    return useMutation({
        mutationKey: ['register'],
        mutationFn: async (request: AccountRegistration) => {
            toast.promise(axiosClient.post('/account/registration', request), {
                pending: {
                    render () {
                        return <Text c="black">Registering Newly Account ...</Text>
                    }
                },
                success: {
                    render({ data }) {
                        return <Text c="green">{parseResponseMessage(String(data.data))}</Text>
                    },
                },
                error: {
                    render({ data }) {
                        const errorMessage = data as AxiosError
                        return <Text c="red">{parseResponseMessage(String(errorMessage.response?.data))}</Text>
                    },
                    icon: <ThemeIcon color="red" variant="transparent">
                        <IconExclamationCircle />
                    </ThemeIcon>
                },
            })
        }
    })
}