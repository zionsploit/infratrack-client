import { useQuery } from "@tanstack/react-query"
import { AxiosError, AxiosResponse } from "axios"
import { toast } from "react-toastify"
import { parseResponseMessage } from "../../../utils/StringUtils"
import { axiosClient } from "../../../provider/axiosClient"
import { ResponseProjectStatus } from "../../../ServerTypes/Project"

export default () => {
    return useQuery({
        queryKey: ['get-all-project-status'],
        queryFn: async () => {
            try {
                const response: AxiosResponse<Array<ResponseProjectStatus>> = await axiosClient.get("/project/get-all-project-status")

                return response.data
            } catch (error) {
                const err = error as AxiosError
                toast.error(parseResponseMessage(String(err.response?.data)))
            }
        }
    })
}