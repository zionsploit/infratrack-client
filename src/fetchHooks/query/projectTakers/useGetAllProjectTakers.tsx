import { useQuery } from "@tanstack/react-query"
import { AxiosError, AxiosResponse } from "axios"
import { toast } from "react-toastify"
import { parseResponseMessage } from "../../../utils/StringUtils"
import { axiosClient } from "../../../provider/axiosClient"
import { ReturnProjectTakers } from "../../../ServerTypes/ProjectTakers"

export default () => {

    return useQuery({
        queryKey: ['get-all-project-takers'],
        queryFn: async () => {
            try {
                const response: AxiosResponse<Array<ReturnProjectTakers>> = await axiosClient.get("/project-takers/get-all")

                return response.data
            } catch (error) {
                const err = error as AxiosError
                toast.error(parseResponseMessage(String(err.response?.data)))
            }
        }
    })
}