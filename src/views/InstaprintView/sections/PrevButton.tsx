import { useTranslation } from 'next-i18next';
import { memo } from "react"
import { UseInstaprintStore } from "@/data/stores";
import { TRX } from '@/constants';
// import type { CartProduct, IGMedia } from "@/types";
import { motion } from "framer-motion"

// @ts-ignore
export const PrevButton = memo(function PrevButton(){
    const { t } = useTranslation("common");
    const page = UseInstaprintStore(state => state.page);
    const prevPage = UseInstaprintStore(state => state.prevPage);
    return (
        <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ ease: "linear", duration: 0.2 }}
        disabled={page === 1}
        id="app-modal-button-prev"
        className="relative cursor-pointer flex justify-center items-center shadow-lg bg-black !w-40 !md:w-50 !h-12 md:h-12 rounded-lg"
        style={{ opacity: page === 1 ? 0.3 : 1 }}
        onClick={prevPage}
    >
        <ArrowLeftIcon  />
        <span style={{ width: 120, color: "white", fontWeight: "bold", marginRight: -8 }} className="break-normal uppercase">{t(TRX.COMMON.PREV)}</span>
    </motion.button>
    )
})

export const ArrowLeftIcon = ({ size = 24 }: { size?: number }) => (
    <svg
      className="transition-all duration-300 ease-linear"
      viewBox="0 0 24 24" fill={"#000"}
      style={{
        position: "absolute",
        width: size,
        height: size,
        left: 8
      }}
      xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M20.2928 12.8229C20.6922 12.7679 21 12.4205 21 12.0001C21 11.5415 20.6337 11.1698 20.1818 11.1698L5.80007 11.1698L10.9953 5.91866L11.0747 5.8257C11.313 5.50114 11.2876 5.0398 10.9977 4.74441C10.6788 4.41948 10.1608 4.41839 9.84062 4.74198L3.25226 11.4004C3.21304 11.4386 3.17756 11.4806 3.14642 11.526C2.92336 11.8502 2.95478 12.3001 3.24067 12.5889L9.84067 19.2581L9.9326 19.3383C10.2534 19.5787 10.7079 19.551 10.9977 19.2555C11.3166 18.9306 11.3155 18.4049 10.9953 18.0813L5.79877 12.8304L20.1818 12.8304L20.2928 12.8229Z"
        fill="#fff"
      />
  
    </svg>
  )