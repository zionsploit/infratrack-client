import { Anchor, Container, Image, px, rem, Stack, Text } from "@mantine/core"
import serverDownSvg from '../../assets/illustrations/serverDown.svg'
import { Link } from "react-router"

export const ServerDown = () => {

    return <>
        <Container my="xl">
            <Stack align="center">
                <Image
                    src={serverDownSvg}
                    style={{ width: rem(500) }}
                />
                <Text fz={px(50)} fw="bolder">Whoops!</Text>
                <Text fz={px(50)} lh={0.1} fw="bolder">{"Something went wrong :("}</Text>
                <Text lh={0.1} mt="xl">Have you tried <Anchor lh={0.1} component={Link} to={"/login"}>logging</Anchor> in?</Text>
            </Stack>
        </Container>
    </>
}