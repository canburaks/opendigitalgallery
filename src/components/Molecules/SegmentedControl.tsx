import { useState, useEffect, useMemo, useCallback } from "react"
import { motion } from 'framer-motion';
import useDimensions from "react-cool-dimensions";

type DataItem = { label: string, value: string | number }

type Props = {
    data: DataItem[],
    value: string | number | boolean,
    onChange: (val: string | number) => any
}

export const SegmentedControl = (props: Props) => {
    const [value, setValue] = useState(props.value);
    const selectedData = useMemo(() => props.data.find((item: DataItem) => item.value === value), [value])
    const { observe, width } = useDimensions({
        useBorderBoxSize: true, // Tell the hook to measure based on the border-box size, default is false
    })
    const unitWidth = useMemo(() => Math.ceil(width / props.data.length), [width])


    const order = useMemo(() => {
        return props.data.findIndex((item: DataItem) => item.value === value)
    }, [value])

    const numberOfItems = props.data.length;
    const cls = `grid grid-cols-${numberOfItems} h-12 p-1`
    console.log("value", value, order, unitWidth);

    return (
        <motion.div className={cls} ref={observe} style={{backgroundColor: "#F3F3F4", borderRadius: 12}}
        >
            {props.data.map((item: DataItem, i: number) => (
                <motion.div
                    className="relative z-0 h-10 flex flex-col items-center justify-center"
                    style={{width: `${unitWidth}px`}}
                    key={`${item.label}-${i}`}
                    
                >
                    <motion.label className="absolute left-0 right-0 bottom-0 top-0 text-center flex flex-col justify-center opacity-6">{item.label}</motion.label>

                    <motion.input
                        type="radio"
                        style={{borderRadius: 12}}
                        className="relative z-20 opacity-0 w-full h-full cursor-pointer"
                        value={item.value}
                        onChange={e => setValue(e.target.value)}
                        checked={value === item.value}
                    />
                </motion.div>
            ))}
            {<motion.div 
            style={{
                position: "absolute",
                minHeight: 40,
                minWidth: `${unitWidth - 8}px`,
                boxShadow: "0 2px 4px -2px rgba(17, 12, 34, 0.12)",
                backgroundColor: "rgba(255,255,255, 1)",
                mixBlendMode: "luminosity",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
            animate={{
                    x: (order * unitWidth),
                }}
            transition={{ duration: 0.5, ease: "easeOut"}}
            >
            {selectedData?.label!}
            </motion.div>}
        </motion.div>
    )

}