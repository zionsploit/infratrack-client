import { Controller, useForm } from "react-hook-form";
import { Categories, ReturnCategories } from "../../../../ServerTypes/ProjectInterface";
import { yupResolver } from "@hookform/resolvers/yup";
import { categoriesSchema } from ".";
import { Button, Flex, Loader, Popover, rem, Stack, Table, Text, TextInput } from "@mantine/core";
import useUpdateCategories from "../../../../fetchHooks/mutation/projectInterface/useUpdateCategories";

export const TableData = (props: { categories: ReturnCategories }) => {
    const { categories } = props
    const { handleSubmit, control, formState: { errors } } = useForm<Categories>({
        defaultValues: {
            categories: categories.categories
        },
        resolver: yupResolver(categoriesSchema)
    })

    const mutationUpdateCategoriesById = useUpdateCategories()

    const OnSubmitData = async (data: Categories) => {
        await mutationUpdateCategoriesById.mutateAsync({
            id: categories.id,
            categories: data.categories
        })
    }

    return <>
        <Table.Tr>
            <Table.Td>
                <Flex justify="space-between" align="center">
                    <Text>
                        {categories.categories}
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
                                        name="categories"
                                        render={({field}) => <TextInput
                                            label="Name"
                                            placeholder="Input New SOF"
                                            size="xs"
                                            error={errors.categories?.message}
                                            {...field}
                                        />}
                                    />
                                    <Button leftSection={mutationUpdateCategoriesById.isPending ? <Loader size="xs" /> : null} disabled={mutationUpdateCategoriesById.isPending} type="submit" fullWidth size="xs">Update</Button>
                                </Stack>
                            </form>
                        </Popover.Dropdown>
                    </Popover>
                </Flex>
            </Table.Td>
        </Table.Tr>
    </>
}