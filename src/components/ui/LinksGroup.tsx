import { Box, Collapse, Group, Text, ThemeIcon, UnstyledButton } from "@mantine/core";
import { useState } from "react";
import classes from './css/LinksGroup.module.css'
import { IconChevronRight } from "@tabler/icons-react";
import { useNavigate } from "react-router";

interface LinksGroupProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    icon: React.FC<any>;
    label: string;
    initiallyOpened?: boolean;
    links?: { label: string; link: string }[];
    link?: string
  }

export const LinksGroup = ({ icon: Icon, label, initiallyOpened, links, link }: LinksGroupProps) => {
    const hasLinks = Array.isArray(links)
    const navigate = useNavigate()
    const [opened, setOpened] = useState(initiallyOpened || false)
    const items = (hasLinks ? links: []).map((link) => (
        <Text
            className={classes.link}
            key={link.label}
            onClick={(event) => {
                event.preventDefault()
                if (link) {
                    navigate(link.link) 
                } else {
                    setOpened((o) => !o)
                }
            }}
        >
            {link.label}
        </Text>
    ))

    return <>
        <UnstyledButton onClick={() => {
            if (link) {
                navigate(link) 
            } else {
                setOpened((o) => !o)
            }
        }} className={classes.control}>
            <Group justify="space-between" gap={0}>
                <Box style={{ display: 'flex', alignItems: 'center' }}>
                    <ThemeIcon variant="light" size={30}>
                        <Icon size={18} />
                    </ThemeIcon>
                    <Box ml="md">{label}</Box>
                </Box>
                {hasLinks && (
                    <IconChevronRight
                        className={classes.chevron}
                        stroke={1.5}
                        size={16}
                        style={{ transform: opened ? 'rotate(-90deg)' : 'none' }}
                    />
                )}
            </Group>
        </UnstyledButton>
        {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
    </>
}