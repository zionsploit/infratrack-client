import { Project, ProjectDetails } from "../../../ServerTypes/Project";
import { getURL } from "../../../utils/UrlUtils"
import * as yup from "yup";

export const getProjectFundedUrl = getURL().split('/')[2]

export const projectSchema = yup.object({
    project_name: yup.string().required("Project name is required."),
    project_year: yup.string().required("Project year is required."),
    project_funded: yup.string().required("Project Code is required."),
    project_code: yup.string().required("Project Code is required."),
    project_status_id: yup.string().required("Project Status is required."),
    project_barangay_id: yup.string().required("Project Barangay is required."),
    appropriation: yup.number().default(0).required("Project appropriation should have default 0 value"),
    approved_budget_contract: yup.number().required("Project ABC required."),
    contract_detail_id: yup.number().required("Project contract details required."),
    project_type_id: yup.string().required("Project type required"),
    project_category_id: yup.string().required("Project category required"),
    project_source_of_fund_id: yup.string().required("Project source of funds required"),
    project_mode_of_implementation_id: yup.string().required("Project mode of implementation required"),
    project_sustainable_developement_id: yup.string().required("Project sustainable development goals required"),
    project_sector_id: yup.string().required("Project sector is required"),
    project_taker_id: yup.string().required("Project taker is required"),
    accomplished: yup.number().default(0).required("Project accomplished is required"),
    remarks: yup.string().default(""),
    prepared_by: yup.string().default(""),
    contractor: yup.string().required("Project contractor is required"),
    contract_cost: yup.number().required("Project contract cost is required"),
    start_date: yup.date().required("Project start date is required"),
    end_date: yup.date().required("Project end date is required"),
    day_extension: yup.number().default(0)
})

export type ParseProject = Omit<Project, 
    'project_year' | 
    'project_status_id' |
    'project_barangay_id' | 
    'project_type_id' | 
    'project_category_id' | 
    'project_source_of_fund_id' | 
    'project_mode_of_implementation_id' | 
    'project_sustainable_developement_id' | 
    'project_sector_id' | 
    'project_taker_id' |
    'project_details_id'
    > & { 
        project_year: string,
        project_status_id: string,
        project_barangay_id: string,
        project_type_id: string,
        project_category_id: string,
        project_source_of_fund_id: string,
        project_mode_of_implementation_id: string,
        project_sustainable_developement_id: string,
        project_sector_id: string,
        project_taker_id: string
    } & Omit<ProjectDetails, 'contractor' | 'start_date' | 'end_date'> & { 
        contractor: string,
        start_date: Date,
        end_date: Date
    }