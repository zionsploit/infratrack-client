import { useMutation } from "@tanstack/react-query"
import { Project, ProjectDetails } from "../../../ServerTypes/Project"
import { toast } from "react-toastify"
import { axiosClient } from "../../../provider/axiosClient"
import { Text } from "@mantine/core"
import { parseResponseMessage } from "../../../utils/StringUtils"
import { AxiosError, AxiosResponse, HttpStatusCode } from "axios"
import { ParseProject } from "../../../pages/Core/Project/_projects.api"
import { ResponseWithId } from "../../../ServerTypes/BasicStruct"

export default () => {
    return useMutation({
        mutationFn: async (data: ParseProject) => {
            const projectDetail: ProjectDetails = {
                contractor: Number.parseInt(data.contractor),
                contract_cost: data.contract_cost,
                start_date: data.start_date.toISOString(),
                end_date: data.end_date.toISOString(),
                day_extension: data.day_extension
            }

            const project: Project = {
                project_details_id: 0,
                project_name: data.project_name,
                project_year: Number.parseInt(data.project_year),
                project_funded: data.project_funded,
                project_code: data.project_code,
                project_status_id: Number.parseInt(data.project_status_id),
                project_barangay_id: Number.parseInt(data.project_barangay_id),
                appropriation: data.appropriation,
                approved_budget_contract: data.approved_budget_contract,
                project_type_id: Number.parseInt(data.project_type_id),
                project_category_id: Number.parseInt(data.project_category_id),
                project_source_of_fund_id: Number.parseInt(data.project_source_of_fund_id),
                project_mode_of_implementation_id: Number.parseInt(data.project_mode_of_implementation_id),
                project_sustainable_developement_id: Number.parseInt(data.project_sustainable_developement_id),
                project_sector_id: Number.parseInt(data.project_sector_id),
                project_taker_id: Number.parseInt(data.project_taker_id),
                accomplished: data.accomplished,
                remarks: data.remarks,
                prepared_by: data.prepared_by,
                contract_detail_id: data.contract_detail_id
            }

            const create_project_details: AxiosResponse<ResponseWithId> = await axiosClient.post('/project/project-details-add', projectDetail)

            if (create_project_details.status == HttpStatusCode.Ok) {
                project.project_details_id = Number(create_project_details.data.id)
            }

            await toast.promise(axiosClient.post("/project/add", project), {
                pending: {
                    render () { return <Text c="black">Initializing New Project</Text> }
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
        }
    })
}