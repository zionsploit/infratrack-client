import { Container, Flex, Loader, rem } from "@mantine/core"

export const Loading = () => {

    return <>
        <Container w={rem("100vw")} h={rem("100vh")}>
            <Flex h={"100%"} justify="center" align="center">
                <Loader size={80} />
            </Flex>
        </Container>
    </>
}