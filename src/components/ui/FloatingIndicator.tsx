import { useContext, useState } from "react"
import { FloatingIndicator as FI, px, Text, UnstyledButton } from '@mantine/core';
import classes from './css/FloatingIndicator.module.css';
import { AnalyticsContext } from "../module/Home/Analytics.context";


const data = ['Analytics', 'Top 10 Projects by Appropriation', 'Top 10 Contractors by Awarded Project']
export const FloatingIndicator = () => {
    const analyticsContext = useContext(AnalyticsContext)
    const [rootRef, setRootRef] = useState<HTMLDivElement | null>(null);
    const [controlsRefs, setControlsRefs] = useState<Record<string, HTMLButtonElement | null>>({});
    const [active, setActive] = useState(0);

    const setControlRef = (index: number) => (node: HTMLButtonElement) => {
        controlsRefs[index] = node;
        setControlsRefs(controlsRefs);
    };

    const controls = data.map((item, index) => (
        <UnstyledButton
            key={item}
            className={classes.control}
            px={px(12)}
            py={px(7)}
            lh={1}
            ref={setControlRef(index)}
            onClick={() => {
                setActive(index)
                analyticsContext?.setTab(index)
            }}
            mod={{ active: active === index }}
        >
            <Text fw={700} size="sm" pos="relative" style={{ zIndex: 1 }}>{item}</Text>
        </UnstyledButton>
    ));

    if (!analyticsContext) return null

    return (
        <div className={classes.root} ref={setRootRef}>
            {controls}
            <FI
                target={controlsRefs[active]}
                parent={rootRef}
                className={classes.indicator}
            />
        </div>
    );


}