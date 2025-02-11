import { useMutation } from "@tanstack/react-query"
import { Categories } from "../../../ServerTypes/ProjectInterface"
import { toast } from "react-toastify"
import { axiosClient } from "../../../provider/axiosClient"
import { Text } from "@mantine/core"
import { AxiosError } from "axios"
import { parseResponseMessage } from "../../../utils/StringUtils"
import { queryClient } from "../../../provider/queryClient"

export default () => {
    return useMutation({
        mutationFn: async (request: Categories) => {
            await toast.promise(axiosClient.post('/project-interface/categories/add', request), {
                pending: {
                    render () { return <Text c="black">Adding New Category ...</Text> }
                },
                success: {
                    render ({data}) { return <Text c="green">{parseResponseMessage(String(data.data))}</Text> }
                },
                error: {
                    render ({data}) {
                        const errorMessage = data as AxiosError
                        return <Text c="red">{parseResponseMessage(String(errorMessage.response?.data))}</Text>
                    }
                }
            })
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['project-interface', 'get-all-categories']
            })
        }
    })
}