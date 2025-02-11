import { ActionIcon, Button, Flex, Loader, Paper, Popover, rem, Stack, Table, Text, TextInput, ThemeIcon, Tooltip } from "@mantine/core"
import { IconPlus } from "@tabler/icons-react"
import { Controller, useForm } from "react-hook-form"
import type { Categories as CType, ReturnCategories } from "../../../../ServerTypes/ProjectInterface"
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup"
import useAddCategories from "../../../../fetchHooks/mutation/projectInterface/useAddCategories"
import useGetAllCategories from "../../../../fetchHooks/query/projectInterface/useGetAllCategories"
import { useEffect, useState } from "react"
import { TableData } from "./index.TableData"

export const categoriesSchema = yup.object({
    categories: yup.string().required("Categories name is required")
})

export default () => {
    const [categoriesData, setCategoriesData] = useState<Array<ReturnCategories>>([])
    const { handleSubmit, control, formState: { errors } } = useForm<CType>({
        defaultValues: {
            categories: ''
        },
        resolver: yupResolver(categoriesSchema)
    })
    
    // QUERY
    const getAllCategories = useGetAllCategories()
    // MUTATION
    const mutationAddCategory = useAddCategories()

    useEffect(() => {
        if (getAllCategories.data) {
            setCategoriesData(getAllCategories.data)
        }
    }, [getAllCategories.data])

    const OnSubmitData = async (data: CType) => {
        await mutationAddCategory.mutateAsync(data)
    }

    return <>
        <Paper miw={rem(420)}>
            <Flex my="xs" align="center" justify="space-between">
                <Text size="md" fw="bold" c="#14213d">Categories</Text>
                <Popover width={rem("400px")} trapFocus position="bottom" shadow="md">
                    <Popover.Target>
                        <Tooltip label="Create Category">
                            <ActionIcon
                                radius="xl"
                                variant="light"
                                color="gray"
                                size="xs"
                            >
                                <ThemeIcon
                                    variant="transparent"
                                    color="gray"
                                    size="xs"
                                >
                                    <IconPlus />
                                </ThemeIcon>
                            </ActionIcon>
                        </Tooltip>
                    </Popover.Target>
                    <Popover.Dropdown>
                        <form onSubmit={handleSubmit(OnSubmitData)}>
                            <Stack gap="xs">
                                <Controller 
                                    control={control}
                                    name="categories"
                                    render={({field}) => <TextInput 
                                        label="Name"
                                        placeholder="Input new category"
                                        size="xs"
                                        error={errors.categories?.message}
                                        {...field}
                                    />}
                                />
                                <Button leftSection={mutationAddCategory.isPending ? <Loader size="xs" /> : null} disabled={mutationAddCategory.isPending} type="submit" fullWidth size="xs">Add</Button>
                            </Stack>
                        </form>
                    </Popover.Dropdown>
                </Popover>
            </Flex>
            <Table.ScrollContainer minWidth={rem("auto")} h={rem('500px')}>
                <Table stickyHeader horizontalSpacing="md" withTableBorder striped verticalSpacing="md">
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>Name</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {categoriesData.length > 0 ? categoriesData.map((categories) =>
                            <TableData key={categories.id} categories={categories} />
                        ) : <>
                        <Table.Tr>
                            <Table.Td>
                                No Data Found
                            </Table.Td>
                        </Table.Tr>
                        </>}
                    </Table.Tbody>
                </Table>
            </Table.ScrollContainer>
        </Paper>
    </>
}