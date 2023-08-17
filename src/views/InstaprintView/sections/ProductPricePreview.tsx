import { useState, useEffect, useMemo } from 'react';
import { useInstaprintProducts } from '@/data/hooks';
import { UseInstaprintStore } from '@/data/stores';
import { InstaprintProduct } from '@/types';
import { getProductPrice, getFramePrice, getFrameProductFromInstaCartFrameLabel, getPriceTextFromPrices } from '../utils';

type Props = {
	selectedMediaId: string
}

export const ProductPricePreview = ({ selectedMediaId }: Props) => {
	const instaprintCart = UseInstaprintStore(state => state?.instaprintCart);
	const instaCartItem = useMemo(() => instaprintCart.find((m: InstaprintProduct) => m?.instaprint?.mediaId === selectedMediaId), [selectedMediaId, instaprintCart]);

	const { instaprintProduct, frames } = useInstaprintProducts();
	const [priceText, setPriceText] = useState<string>('');



	useEffect(() => {
		if (instaCartItem && instaprintProduct && frames) {
			const instaprintPrice = getProductPrice(instaCartItem!, instaprintProduct);
			const currentFrame = getFrameProductFromInstaCartFrameLabel(instaCartItem.instaprint!.frame!,  frames);
			const framePrice = getFramePrice(instaCartItem!, currentFrame);
			// const currency = instaprintPrice?.currency || framePrice?.currency || "USD"
			// const totalPrice = (instaprintPrice?.price || 0) + (framePrice?.price || 0) 
			const quantity = instaCartItem?.quantity || 1;
			console.log('quantity', quantity);
			const priceTextRaw = getPriceTextFromPrices(instaprintPrice, framePrice, quantity);
			setPriceText(priceTextRaw);
		}
	}, [instaprintCart, selectedMediaId, frames, instaprintProduct]);

	return (
		<div>
			{priceText}
		</div>
	);
};


