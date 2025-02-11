import { px, Text } from "@mantine/core"

type TextType = {
    label: string
}
export const TextTitle = (props: TextType) => {
    const {
        label
    } = props

    return <>
        <Text lh={0.1} fz={px(30)} fw="bolder">{label}</Text>
    </>
}

export const TextSubTitle = (props: TextType) => {
    const { label } = props

    return <>
        <Text lh={1} fz={px(15)} fw={500} c="dimmed" lts={1}>{label}</Text>
    </>
}

export const TextSemiTitle = (props: TextType) => {
    const { label }  = props

    return <>
        <Text fz={px(15)} fw={500}>{label}</Text>
    </>
}

export const TextExtraSmall = (props: TextType) => {
    const { label }  = props

    return <>
        <Text size="xs" fw="inherit">{label}</Text>
    </>
}