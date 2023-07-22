import { ProductBulkPurchaseLimits } from "@/constants";
import { motion } from "framer-motion"
import { SegmentedControl, BodyXS } from "@/components"

type Props = {
    value: string,
    title: string,
    description: string,
    handler: (val: number | string) => void
}

export const QuantitySelection = ({ value, handler, title, description }: Props) => {
    return (
        <motion.div className="w-full flex flex-col mb-6">
            <h4 className="flex flex-row text-base font-bold">{title}</h4>
            <BodyXS className="mb-1 text-gray-700">{description}</BodyXS>
            <SegmentedControl
                data={ProductBulkPurchaseLimits.map(limit => ({ label: limit.toString(), value: limit.toString() }))}
                value={value.toString()}
                // @ts-ignore
                onChange={handler}
            />
        </motion.div>)
}