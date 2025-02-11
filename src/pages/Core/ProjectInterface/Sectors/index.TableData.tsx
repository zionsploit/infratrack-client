import { Controller, useForm } from "react-hook-form";
import { ReturnSectors, Sectors } from "../../../../ServerTypes/ProjectInterface";
import { yupResolver } from "@hookform/resolvers/yup";
import { sectorsSchema } from ".";
import { Button, Flex, Loader, Popover, rem, Stack, Table, Text, TextInput } from "@mantine/core";
import useUpdateSector from "../../../../fetchHooks/mutation/projectInterface/useUpdateSector";

export const TableData = (props: { sectors: ReturnSectors }) => {
    const { sectors } = props
    const { handleSubmit, control, formState: { errors } } = useForm<Sectors>({
        defaultValues: {
            sectors: sectors.sectors
        },
        resolver: yupResolver(sectorsSchema)
    })

    const mutationUpdateSectorById = useUpdateSector()

    const OnSubmitData = async (data: Sectors) => {
        await mutationUpdateSectorById.mutateAsync({
            id: sectors.id,
            sectors: data.sectors
        })
    }

    return <>
        <Table.Tr>
            <Table.Td>
                <Flex justify="space-between" align="center">
                    <Text>
                        {sectors.sectors}
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
                                        name="sectors"
                                        render={({field}) => <TextInput
                                            label="Name"
                                            placeholder="Input New SOF"
                                            size="xs"
                                            error={errors.sectors?.message}
                                            {...field}
                                        />}
                                    />
                                    <Button leftSection={mutationUpdateSectorById.isPending ? <Loader size="xs" /> : null} disabled={mutationUpdateSectorById.isPending} type="submit" fullWidth size="xs">Update</Button>
                                </Stack>
                            </form>
                        </Popover.Dropdown>
                    </Popover>
                </Flex>
            </Table.Td>
        </Table.Tr>
    </>
}