import { ActionIcon, Anchor, AppShell, Avatar, Badge, Breadcrumbs, Burger, Flex, Group, Text, ThemeIcon } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { Sidebar } from "./Sidebar"
import { Outlet } from "react-router"
import { IconBell, IconDiamond, IconHome } from "@tabler/icons-react"
import useVerifiyToken from "../../fetchHooks/utils/useVerifiyToken"
import { useDispatch } from "react-redux"

export const Layout = () => {
    const [opened, { toggle }] = useDisclosure()
    const verifyToken = useVerifiyToken()
    const dispatch = useDispatch()

    // useEffect(() => {
    //     const verify = async () => {
    //         await verifyToken.mutateAsync().then((res) => {
    //             if (res == "TokenIsValid") {
    //                 const getToken = localStorage.getItem("_auth_token") as string
    //                 const token = decodeToken(getToken) as Record<"sub", ReturnAccountRegistration>
    //                 dispatch(setAccountInformation(token.sub))
    //             }
    //         })
    //     }
    //     verify()
    // }, [])

    // if (verifyToken.isPending) return <Loading />

    // if (verifyToken.isError) return <ServerDown />

    return <>
        <AppShell
            layout="alt"
            header={{ height: 60 }}
            navbar={{ width: 301, breakpoint: 'sm', collapsed: { mobile: !opened } }}
            padding="md"
        >
            <AppShell.Header>
                <Flex justify="space-between" h="100%">
                    <Group px="md">
                        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
                        <Breadcrumbs separator=">" separatorMargin="sm">
                            <ThemeIcon variant="transparent" size="sm">
                                <IconHome />
                            </ThemeIcon>
                            <Anchor underline="never">
                                Home
                            </Anchor>
                        </Breadcrumbs>
                    </Group>
                    <Group px="md">
                        <Badge p="md" color="lime" variant="light">
                            <Flex align="center" gap="xs">
                                <ThemeIcon color="lime" variant="transparent">
                                    <IconDiamond stroke={2.5} />
                                </ThemeIcon>
                                <Text size="sm" fw="bold">Upgrade to premium!</Text>
                            </Flex>
                        </Badge>
                        <ActionIcon variant="transparent" aria-label="Notifications">
                            <IconBell stroke={1.5} />
                        </ActionIcon>
                        <Avatar radius="xl" color="cyan" children={"IT"} />
                    </Group>
                </Flex>
            </AppShell.Header>
            <AppShell.Navbar>
                <Sidebar />
            </AppShell.Navbar>
            <AppShell.Main>
                <Outlet />
            </AppShell.Main>
        </AppShell>
    </>
}