import { IconApi, IconBuildingEstate, IconComponents, IconDashboard, IconHome, IconSettings, IconTimeline, IconUsersGroup, IconWreckingBall } from "@tabler/icons-react";
import { LinksGroup } from "../ui";
import classes from './css/Layout.module.css'
import { Code, Group, ScrollArea, Text } from "@mantine/core";

const SidebarLinks = [
    { label: 'Home', icon: IconHome, link: '/' },
    { label: 'Dashboard', icon: IconDashboard, link: '/dashboard' },
    { label: 'Timeline', icon: IconTimeline, link: '/timeline' },
    {
      label: 'Projects',
      icon: IconBuildingEstate,
      initiallyOpened: false,
      links: [
        { label: 'City Funded', link: '/project/city-funded' },
        { label: 'Brgy Funded', link: '/project/brgy-funded' },
      ],
    },
    { label: 'Contractors', icon: IconWreckingBall, link: '/contractor' },
    {
        label: 'Components',
        icon: IconComponents,
        initiallyOpened: false,
        links: [
          { label: 'Project Interface', link: '/components/project-interface'},
          { label: 'Document', link: '/components/document' },
          { label: 'E-Mail', link: '/components/e-mail' },
          { label: 'Backlog', link: '/components/project-backlog' },
          { label: 'Reports', link: '/components/reports' }
        ],
      },
      { label: 'Users Management', icon: IconUsersGroup, link: '/users-management' },
      { label: 'Settings', icon: IconSettings, link: '/settings' },
      { label: 'API', icon: IconApi, link: '/api' },
  ];
  

export const Sidebar = () => {
    const links = SidebarLinks.map((item) => <LinksGroup {...item} key={item.label} />)

    return <>
        <nav className={classes.navbar}>
            <div className={classes.header}>
                <Group justify="flex-start">
                    <Text size="xl" fw="bold">InfraTrack</Text>
                    <Code>v1.0.0</Code>
                </Group>
            </div>

            <ScrollArea className={classes.links}>
                <div className={classes.linksInner}>{links}</div>
            </ScrollArea>
        </nav>
    </>
}