// This file was generated by [ts-rs](https://github.com/Aleph-Alpha/ts-rs). Do not edit this file manually.
import type { ReturnContractors } from "./Contractors";

export type Project = { project_details_id: number, project_name: string, project_year: number, project_funded: string, project_code: string, project_status_id: number, project_barangay_id: number, appropriation: number, approved_budget_contract: number, contract_detail_id: number, project_type_id: number, project_category_id: number, project_source_of_fund_id: number, project_mode_of_implementation_id: number, project_sustainable_developement_id: number, project_sector_id: number, project_taker_id: number, accomplished: number, remarks: string, prepared_by: string, };

export type ProjectDetails = { contractor: number, contract_cost: number, start_date: string, end_date: string, day_extension: number, };

export type ProjectFullDetails = { project_details: ReturnProjectDetails, contractors: ReturnContractors, project_status: ResponseProjectStatus, };

export type ProjectsFunded = { projects: ReturnProject, project_full_details: ProjectFullDetails, };

export type ResponseProjectStatus = { id: number, status: string, created_at: string, updated_at: string, };

export type ReturnProject = { id: number, project_name: string, project_funded: string, project_year: number, project_code: string, project_status_id: number, project_barangay_id: number, appropriation: number, approved_budget_contract: number, contract_detail_id: number, project_type_id: number, project_category_id: number, project_source_of_fund_id: number, project_mode_of_implementation_id: number, project_sustainable_developement_id: number, project_sector_id: number, project_taker_id: number, accomplished: number, remarks: string, prepared_by: string, created_at: string, updated_at: string, };

export type ReturnProjectDetails = { id: number, contractor: number, contract_cost: number, start_date: string, target_date: string, day_extension: number, };

export type UpdateProjectById = { id: number, project_name: string, project_funded: string, project_code: string, project_status_id: number, project_barangay_id: number, appropriation: number, approved_budget_contract: number, contract_detail_id: number, project_type_id: number, project_category_id: number, project_source_of_fund_id: number, project_mode_of_implementation_id: number, project_sustainable_developement_id: number, project_sector_id: number, project_taker_id: number, accomplished: number, remarks: string, prepared_by: string, };
