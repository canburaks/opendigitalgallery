import { motion } from "framer-motion"
import { SegmentedControl } from "@/components"

type Props = {
    value: string | number | boolean,
    title: string,
    description: string,
    handler: (val: string | number | boolean) => void
}

export const MatSelection = ({ value, handler, title, description }: Props) => {

    return (
        <motion.div className="w-full flex flex-col mt-2">
            <h3 className="flex flex-row text-lg font-bold">{title}</h3>
            <p className="opacity-70 py-0">{description}</p>
            <SegmentedControl
                data={[
                    { label: 'Yes', value: 'true' },
                    { label: 'No', value: 'false' },
                ]}
                value={value}
                onChange={handler}
            />
        </motion.div>)
}