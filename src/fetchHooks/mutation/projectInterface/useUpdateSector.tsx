import { useMutation } from "@tanstack/react-query"
import { UpdateSectorsById } from "../../../ServerTypes/ProjectInterface"
import { toast } from "react-toastify"
import { axiosClient } from "../../../provider/axiosClient"
import { Text } from "@mantine/core"
import { parseResponseMessage } from "../../../utils/StringUtils"
import { AxiosError } from "axios"
import { queryClient } from "../../../provider/queryClient"

export default () => {
    return useMutation({
        mutationFn: async (request: UpdateSectorsById) => {
            await toast.promise(axiosClient.post('/project-interface/sectors/update-by-id', request), {
                pending: {
                    render () { return <Text c="black">Update New Sector ...</Text> }
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
                queryKey: ['project-interface', 'get-all-sector']
            })
        }
    })
}