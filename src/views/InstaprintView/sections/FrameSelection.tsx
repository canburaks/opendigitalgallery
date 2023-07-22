import { motion } from "framer-motion";
import { SegmentedControl, BodyXS } from "@/components";
import { TRX, InstaprintFrameOptionsEnum } from "@/constants";
import { useTranslation } from 'next-i18next';

type Props = {
    value: InstaprintFrameOptionsEnum,
    title: string,
    description: string,
    handler: (val: InstaprintFrameOptionsEnum) => void
}

export const FrameSelection = ({ value, handler, title, description }: Props) => {
    const { t } = useTranslation("common");
    // @ts-ignore
    const data = Object.keys(TRX.FRAMES).map((key:string, i) => ({ label: t(TRX.FRAMES[key]), value: InstaprintFrameOptionsEnum[key] }));
    return (
        <motion.div className="w-full flex flex-col mb-6">
            <h4 className="flex flex-row text-base font-bold">{title}</h4>
            <BodyXS className="mb-1 text-gray-700">{description}</BodyXS>
            <SegmentedControl
                data={data}
                value={value}
                // @ts-ignore
                onChange={handler}
            />
        </motion.div>
    )
}