import { Controller, useForm } from "react-hook-form";
import { ProjectTypes, ReturnProjectTypes } from "../../../../ServerTypes/ProjectInterface";
import { yupResolver } from "@hookform/resolvers/yup";
import { ptSchema } from ".";
import { Button, Flex, Loader, Popover, rem, Stack, Table, Text, TextInput } from "@mantine/core";
import useUpdateProjectTypes from "../../../../fetchHooks/mutation/projectInterface/useUpdateProjectTypes";

export const TableData = (props: { pt: ReturnProjectTypes }) => {
    const { pt } = props
    const { handleSubmit, control, formState: { errors } } = useForm<ProjectTypes>({
        defaultValues: {
            pt_title: pt.pt_title,
        },
        resolver: yupResolver(ptSchema)
    })

    const mutationUpdatePtById = useUpdateProjectTypes()

    const OnSubmitData = async (data: ProjectTypes) => {
        mutationUpdatePtById.mutateAsync({
            id: pt.id,
            pt_title: data.pt_title
        })
    }

    return <>
        <Table.Tr>
            <Table.Td>
                <Flex justify="space-between" align="center">
                    <Text>
                        {pt.pt_title}
                    </Text>
                    <Popover width={rem("400px")} trapFocus position="bottom" withArrow shadow="md">
                        <Popover.Target>
                            <Button variant="transparent" size="xs" tt="uppercase">Update</Button>
                        </Popover.Target>
                        <Popover.Dropdown>
                            <form onSubmit={handleSubmit(OnSubmitData)}>
                                <Stack gap="xs">
                                    <Controller 
                                        control={control}
                                        name="pt_title"
                                        render={({field}) => <TextInput
                                            label="Name"
                                            placeholder="Input New SOF"
                                            size="xs"
                                            error={errors.pt_title?.message}
                                            {...field}
                                        />}
                                    />
                                    <Button leftSection={mutationUpdatePtById.isPending ? <Loader size="xs" /> : null} disabled={mutationUpdatePtById.isPending} type="submit" fullWidth size="xs">Update</Button>
                                </Stack>
                            </form>
                        </Popover.Dropdown>
                    </Popover>
                </Flex>
            </Table.Td>
        </Table.Tr>
    </>
}