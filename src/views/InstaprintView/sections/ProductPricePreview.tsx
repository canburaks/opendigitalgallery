import { useState, useEffect, useMemo } from "react";
import { useInstaprintProducts } from "@/data/hooks";
import { UseInstaprintStore } from "@/data/stores";
import { InstaprintProduct, ProductDetails } from "@/types";
import { getProductPrice, getFramePrice, getFrameProductFromInstaCartFrameLabel } from "../utils";

type Props = {
	selectedMediaId: string
}

export const ProductPricePreview = ({ selectedMediaId }: Props) => {
	const instaprintCart = UseInstaprintStore(state => state?.instaprintCart);
	const instaCartItem = useMemo(() => instaprintCart.find((m: InstaprintProduct) => m?.instaprint?.mediaId === selectedMediaId), [selectedMediaId, instaprintCart])

	const { instaprintProduct, frames } = useInstaprintProducts();
	const [priceText, setPriceText] = useState<string>("");



	useEffect(() => {
		if (instaCartItem && instaprintProduct && frames) {
			const instaprintPrice = getProductPrice(instaCartItem!, instaprintProduct)
			const currentFrame = getFrameProductFromInstaCartFrameLabel(instaCartItem.instaprint!.frame!,  frames)
			const framePrice = getFramePrice(instaCartItem!, currentFrame)
			const currency = instaprintPrice?.currency || framePrice?.currency || "USD"
			console.log("PRICES: ", instaprintPrice)
			console.log("FRAME PRICES: ", framePrice)
			const totalPrice = (instaprintPrice?.price || 0) + (framePrice?.price || 0) 
			const quantity = instaCartItem?.quantity || 1;
			setPriceText(`${totalPrice * quantity} ${currency}`)
		}
	}, [instaprintCart, selectedMediaId, frames, instaprintProduct])

	return (
		<div>
			{priceText}
		</div>
	)
}


