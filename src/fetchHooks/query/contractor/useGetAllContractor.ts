import { useQuery } from "@tanstack/react-query"
import { AxiosError, AxiosResponse } from "axios"
import { toast } from "react-toastify"
import { parseResponseMessage } from "../../../utils/StringUtils"
import { ReturnContractors } from "../../../ServerTypes/Contractors"
import { axiosClient } from "../../../provider/axiosClient"

export default () => {
    return useQuery({
        queryKey: ['get-all-contractor'],
        queryFn: async () => {
            try {
                const response: AxiosResponse<Array<ReturnContractors>> = await axiosClient.get("/contractors/get-all")

                return response.data
            } catch (error) {
                const err = error as AxiosError
                toast.error(parseResponseMessage(String(err.response?.data)))
            }
        }
    })
}