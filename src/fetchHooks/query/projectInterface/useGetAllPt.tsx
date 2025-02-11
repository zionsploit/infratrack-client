import { useQuery } from "@tanstack/react-query"
import { AxiosError, AxiosResponse } from "axios"
import { toast } from "react-toastify"
import { parseResponseMessage } from "../../../utils/StringUtils"
import { ReturnProjectTypes } from "../../../ServerTypes/ProjectInterface"
import { axiosClient } from "../../../provider/axiosClient"

export default () => {

    return useQuery({
        queryKey: ['project-interface', 'get-all-pt'],
        queryFn: async () => {
            try {
                const response: AxiosResponse<Array<ReturnProjectTypes>> = await axiosClient.get("/project-interface/project-types/get-all")
                                
                return response.data
            } catch (error) {
                const err = error as AxiosError
                toast.error(parseResponseMessage(String(err.response?.data)))
            }
        }
    })
}