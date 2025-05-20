import { useQuery } from "@tanstack/react-query"
import { AxiosError, AxiosResponse } from "axios"
import { toast } from "react-toastify"
import { parseResponseMessage } from "../../../utils/StringUtils"
import { ProjectsFunded } from "../../../ServerTypes/Project"
import { axiosClient } from "../../../provider/axiosClient"

interface IProps {
    project_funded: String,
    enabled: boolean
}

export default (props: IProps) => {
    return useQuery({
        queryKey: ['get-project', props.project_funded],
        queryFn: async () => {
            try {
                const response: AxiosResponse<Array<ProjectsFunded>> = await axiosClient.get(`/project/get-all/${props.project_funded}`)

                return response.data
            } catch (error) {
                const err = error as AxiosError
                toast.error(parseResponseMessage(String(err.response?.data)))
            }
        },
        enabled: props.enabled
    })
}