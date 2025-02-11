import { useQuery } from "@tanstack/react-query"
import { AxiosError, AxiosResponse } from "axios"
import { toast } from "react-toastify"
import { parseResponseMessage } from "../../../utils/StringUtils"
import { ReturnSourceOfFunds } from "../../../ServerTypes/ProjectInterface"
import { axiosClient } from "../../../provider/axiosClient"

export default () => {

    return useQuery({
        queryKey: ['project-interface', 'get-all-sof'],
        queryFn: async () => {
            try {
                const response: AxiosResponse<Array<ReturnSourceOfFunds>> = await axiosClient.get("/project-interface/source-of-funds/get-all")
                
                return response.data
            } catch (error) {
                const err = error as AxiosError
                toast.error(parseResponseMessage(String(err.response?.data)))
            }
        }
    })
}