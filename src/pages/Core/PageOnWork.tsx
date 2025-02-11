import { Container, Image, px, rem, Stack, Text } from "@mantine/core"
import underConstructionSvg from '../../assets/illustrations/underConstruction.svg'

export const PageOnWork = () => {

    return <>
        <Container my="lg">
            <Stack align="center">
                <Image
                    src={underConstructionSvg}
                    style={{ width: rem(500) }}
                />
                <Text fz={px(50)} fw="lighter">This page is under construction</Text>
                <Text>We're working on it!</Text>
            </Stack>
        </Container>
    </>
}