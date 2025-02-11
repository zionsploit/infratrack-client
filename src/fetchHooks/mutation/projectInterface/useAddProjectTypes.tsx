import { useMutation } from "@tanstack/react-query"
import { ProjectTypes } from "../../../ServerTypes/ProjectInterface"
import { toast } from "react-toastify"
import { axiosClient } from "../../../provider/axiosClient"
import { Text } from "@mantine/core"
import { parseResponseMessage } from "../../../utils/StringUtils"
import { AxiosError } from "axios"
import { queryClient } from "../../../provider/queryClient"

export default () => {
    return useMutation({
        mutationFn: async (request: ProjectTypes) => {
            await toast.promise(axiosClient.post('/project-interface/project-types/add', request), {
                pending: {
                    render () { return <Text c="black">Adding New Project Type ...</Text> }
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
            queryClient.invalidateQueries({
                queryKey: ['project-interface', 'get-all-pt']
            })
        } 
    })
}