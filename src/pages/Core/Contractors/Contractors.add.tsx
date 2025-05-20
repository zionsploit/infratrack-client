import { Button, Divider, Group, Paper, rem, Stack, Text, Textarea, TextInput } from "@mantine/core"
import { Controller, useForm } from "react-hook-form"
import { Contractors } from "../../../ServerTypes/Contractors"
import { yupResolver } from "@hookform/resolvers/yup"
import { contractorSchema } from "./_contractors.schema"
import useAddContractor from "../../../fetchHooks/mutation/contractor/useAddContractor"

const AddContractors = () => {
    const { handleSubmit, control, formState: { errors } } = useForm<Contractors>({
        defaultValues: {
            contractor_name: "",
            contractor_email: "",
            contractor_address_street: "",
            contractor_address_barangay: "",
            contractor_address_municipality: "",
            contractor_address_province: "",
            contractor_description: "",
            contractor_contact_name: "",
            contractor_contact_position: "",
            contractor_contract_number: ""
        },
        resolver: yupResolver(contractorSchema)
    })

    const addContractors = useAddContractor()

    const OnSubmitHandler = async (data: Contractors) => {
        await addContractors.mutateAsync(data)
    }

    return <>
        <Stack gap="xl">
            <Text mt="xl" fz="h1" fw="bolder">Add Contractor</Text>
            <form onSubmit={handleSubmit(OnSubmitHandler)}>
                <Paper withBorder p="md" shadow="lg" w={rem("100%")}>
                    <Stack my="sm">
                        <Text fz="h3" fw={500} lh={0.1}>Personal Information</Text>
                        <Text size="sm">Use a permanent address where you can receive mail.</Text>
                    </Stack>
                    <Stack>
                        <Group grow justify="space-between">
                            <Controller
                                control={control}
                                name="contractor_name"
                                render={({ field }) => <TextInput 
                                    label="Contractor Name:"
                                    error={errors.contractor_name?.message}
                                    {...field}
                                />}
                            />
                            <Controller
                                control={control}
                                name="contractor_email"
                                render={({ field }) => <TextInput 
                                    rightSection="@"
                                    label="Contractor Email:"
                                    error={errors.contractor_email?.message}
                                    {...field}
                                />}
                            />
                        </Group>
                        <Group grow justify="space-between">
                            <Controller
                                control={control}
                                name="contractor_address_street"
                                render={({ field }) => <TextInput 
                                    label="Contractor Street:"
                                    error={errors.contractor_address_street?.message}
                                    {...field}
                                />}
                            />
                            <Controller
                                control={control}
                                name="contractor_address_barangay"
                                render={({ field }) => <TextInput 
                                    label="Contractor Barangay:"
                                    error={errors.contractor_address_barangay?.message}
                                    {...field}
                                />}
                            />
                        </Group>
                        <Group grow justify="space-between">
                            <Controller
                                control={control}
                                name="contractor_address_municipality"
                                render={({ field }) => <TextInput 
                                    label="Contractor Municipality:"
                                    error={errors.contractor_address_municipality?.message}
                                    {...field}
                                />}
                            />
                            <Controller
                                control={control}
                                name="contractor_address_province"
                                render={({ field }) => <TextInput 
                                    label="Contractor Province:"
                                    error={errors.contractor_address_province?.message}
                                    {...field}
                                />}
                            />
                        </Group>
                        <Controller
                            control={control}
                            name="contractor_description"
                            render={({ field }) => <Textarea 
                                label="Contractor About:"
                                description="(Optional)"
                                error={errors.contractor_description?.message}
                                {...field}
                            />}
                        />
                    </Stack>
                    <Divider my="xl" />
                    <Stack my="lg">
                        <Text fz="h3" fw={500} lh={0.1}>Contact Information</Text>
                        <Text size="sm">This person will be contact during emergency.</Text>
                    </Stack>
                    <Stack>
                        <Group grow justify="space-between">
                            <Controller
                                control={control}
                                name="contractor_contact_name"
                                render={({ field }) => <TextInput 
                                    label="Full Name:"
                                    error={errors.contractor_contact_name?.message}
                                    {...field}
                                />}
                            />
                            <Controller
                                control={control}
                                name="contractor_contact_position"
                                render={({ field }) => <TextInput 
                                    label="Position:"
                                    error={errors.contractor_contact_position?.message}
                                    {...field}
                                />}
                            />
                            <Controller
                                control={control}
                                name="contractor_contract_number"
                                render={({ field }) => <TextInput 
                                    label="Contact Number:"
                                    error={errors.contractor_contract_number?.message}
                                    {...field}
                                />}
                            />
                        </Group>
                    </Stack>
                    <Divider my="lg" />
                    <Button type="submit" color="green">Add Contractor</Button>
                </Paper>
            </form>
        </Stack>
    </>
}

export default AddContractors