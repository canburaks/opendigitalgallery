import { motion } from "framer-motion";
import { SegmentedControl } from "@/components";
import { TRX } from "@/constants";
import { useTranslation } from 'next-i18next';

type Props = {
    value: string | number | boolean,
    title: string,
    description: string,
    handler: (val: string | number | boolean) => void
}

export const FrameSelection = ({ value, handler, title, description }: Props) => {
    const { t } = useTranslation("common");

    return (
        <motion.div className="w-full flex flex-col  mt-8">
            <h3 className="flex flex-row text-lg font-bold">{title}</h3>
            <p className="opacity-70 py-0">{description}</p>
            <SegmentedControl
                data={Object.keys(TRX.FRAMES).map((key:string, i) => ({ label: t(TRX.FRAMES[key]), value: key }))}
                value={value}
                onChange={handler}
            />
        </motion.div>
    )
}