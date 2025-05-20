import { Text } from "@mantine/core"
import { parseResponseMessage } from "../../../utils/StringUtils"
import { AxiosError } from "axios"
import { UpdateOptions } from "react-toastify";

interface ToastPromiseParams<TData = unknown, TError = unknown, TPending = unknown> {
    pending?: string | UpdateOptions<TPending>;
    success?: string | UpdateOptions<TData>;
    error?: string | UpdateOptions<TError>;
}

export const toastResponse: ToastPromiseParams = {
    pending: {
        render () { return <Text c="black">Initializing New Project</Text> }
    },
    success: {
        render ({ data }: any) { return <Text c="green">{parseResponseMessage(String(data.data))}</Text> }
    },
    error: {
        render ({data}: any) {
            const errorMessage = data as AxiosError
            return <Text c="red">{parseResponseMessage(String(errorMessage.response?.data))}</Text>
        }
    }
}