import * as yup from "yup";

export const contractorSchema = yup.object({
    contractor_name: yup.string().required("Contract name is required"),
    contractor_email: yup.string().email("Must be a valid @email").required("Contractor email is required"),
    contractor_address_street: yup.string().required("Contractor street address is required"),
    contractor_address_barangay: yup.string().required("Contractor barangay address is required"),
    contractor_address_municipality: yup.string().required("Contractor address municipality is required"),
    contractor_address_province: yup.string().required("Contractor province address is required"),
    contractor_description: yup.string().default(""),
    contractor_contact_name: yup.string().required("Contractor contact name is required"),
    contractor_contact_position: yup.string().required("Contractor contact position is required"),
    contractor_contract_number: yup.string().required("Contractor contract number is required")
})