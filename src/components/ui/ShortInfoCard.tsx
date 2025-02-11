import { Paper, rem, Text } from "@mantine/core"

type ShortInfoCardProps = {
    label: string
    value: string | number
}

export const ShortInfoCard = (props: ShortInfoCardProps) => {
    const { label, value = 0 } = props

    return <>
        <Paper miw={rem(200)} withBorder radius="md" p="xs">
            <Text c="dimmed" size="xs" tt="uppercase" fw={700}>
                {label}
            </Text>
            <Text fw={700} size="xl">
                {value}
            </Text>
        </Paper>
    </>
}