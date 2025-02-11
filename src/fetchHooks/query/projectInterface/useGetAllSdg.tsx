import { useQuery } from "@tanstack/react-query"
import { AxiosError, AxiosResponse } from "axios"
import { toast } from "react-toastify"
import { parseResponseMessage } from "../../../utils/StringUtils"
import { axiosClient } from "../../../provider/axiosClient"
import { ReturnSustainableDevelopmentGoals } from "../../../ServerTypes/ProjectInterface"

export default () => {

    return useQuery({
        queryKey: ['project-interface', 'get-all-sdg'],
        queryFn: async () => {
            try {
                const response: AxiosResponse<Array<ReturnSustainableDevelopmentGoals>> = await axiosClient.get("/project-interface/sustainable-development-goals/get-all")

                return response.data

            } catch (error) {
                const err = error as AxiosError
                toast.error(parseResponseMessage(String(err.response?.data)))
            }
        }
    })
}