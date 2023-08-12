import { useEffect, useState } from "react"
import { UseInstaprintStore } from "@/data/stores";
import { motion } from "framer-motion"
import useDimensions from "react-cool-dimensions";
import type { IGMedia, InstaprintProduct } from "@/types";
import { TRX, INSTAPRINT_PRODUCT_PLACEHOLDER, InstaprintFrameOptionsEnum } from "@/constants";
import { useTranslation } from 'next-i18next';
import { MatSelection, FrameSelection, QuantitySelection, MediaWrapper } from "./index";
import { useInstaprintProducts } from "@/data/hooks";
import {generateCartProductsFromInstaCart} from "../utils"


export const InstaCartPreview = () => {


  const cartProducts = generateCartProductsFromInstaCart()

  const page = UseInstaprintStore(state => state.page);
  const instaprintCart = UseInstaprintStore(state => state.instaprintCart);

  console.log("instaprintCart", instaprintCart)
  console.log("instaprintProduct", cartProducts)
  
  useEffect(() => {},)

  if (page !== 3) return <div></div>

  return (
    <motion.div className="flex flex-col pr-2"
      exit={{ opacity: 0, left: "-100%" }}
      initial={{ opacity: 1, left: "100%" }}
      animate={{ opacity: 1, left: 0 }}
      transition={{ duration: 0.3, ease: "linear" }}
    >

    </motion.div>
  )
}
