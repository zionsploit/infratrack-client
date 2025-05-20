import { useMutation } from "@tanstack/react-query"
import { Contractors } from "../../../ServerTypes/Contractors"
import { toast } from "react-toastify"
import { axiosClient } from "../../../provider/axiosClient"
import { toastResponse } from "../toast/toast.response"

export default () => {
    return useMutation({
        mutationFn: async (data: Contractors) => {
            toast.promise(axiosClient.post("/contractors/add", data), toastResponse)
        }
    })
}