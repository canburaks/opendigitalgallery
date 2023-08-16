import { useMemo } from "react";
import { InstaprintProduct, ProductDetails, Price, CartProduct } from "@/types";
import { INSTAPRINT_FRAME_OPTIONS_MAP, INSTAPRINT_PRODUCT_OPTIONS_MAP, NO_FRAME_PRODUCT, INSTAPRINT_PRODUCT_ID, FRAME_PRODUCT_MAP } from "@/constants";
import { useInstaprintProducts } from "@/data/hooks";
import { UseInstaprintStore } from "@/data/stores";


export function generateCartProductsFromInstaCart(): CartProduct[] {
	const instaprintProduct = UseInstaprintStore(state => state.instaprint);
	const frames = UseInstaprintStore(state => state.frames);
	const instaprintCart = UseInstaprintStore(state => state.instaprintCart);

	const cartProducts = useMemo(() => {
		const cartProductList: CartProduct[] = [];
		instaprintCart.forEach((instaCartItem: InstaprintProduct) => {
			const instaprintPrice = getProductPrice(instaCartItem!, instaprintProduct)
			const currentFrame = getFrameProductFromInstaCartFrameLabel(instaCartItem.instaprint!.frame!, frames)
			const framePrice = getFramePrice(instaCartItem!, currentFrame)
			const cartItemInstaPrint = {
				quantity: instaCartItem.quantity,
				productId: INSTAPRINT_PRODUCT_ID,
				priceId: instaprintPrice?.price_id!
			}
			cartProductList.push(cartItemInstaPrint);

			// check if frame is selected
			if (framePrice && currentFrame) {
				const cartItemFrame = {
					quantity: instaCartItem.quantity,
					productId: currentFrame?.product_id!,
					priceId: framePrice?.price_id!
				}
				cartProductList.push(cartItemFrame);
			}
		})
		return cartProductList;

	}, [instaprintCart, instaprintProduct, frames])

	return cartProducts;
}

export function getPriceTextFromPrices(instaprintPrice: Price | undefined, framePrice: Price | undefined, quantity:number): string {
	const currency = instaprintPrice?.currency || framePrice?.currency || "USD"
	const totalPrice = (instaprintPrice?.price || 0) + (framePrice?.price || 0)
	const currentQuantity = quantity || 1;
	return `${totalPrice * currentQuantity} ${currency}`
}

export function getProductPrice(instaCartItem: InstaprintProduct, instaprintProduct: Partial<ProductDetails>): Price | undefined {
	const productOptionId = getInstaprintProductOptionId(instaCartItem);
	return instaprintProduct?.prices?.find((p: Price) => p.product_option_id === productOptionId);
}


export function getFramePrice(instaCartItem: InstaprintProduct, frameProduct: Partial<ProductDetails> | undefined): Price | undefined {
	if (!frameProduct) return undefined;
	const productOptionId = getFrameProductOptionId(instaCartItem);
	console.log("frameProduct", frameProduct, productOptionId)
	return frameProduct?.prices?.find((p: Price) => p.product_option_id === productOptionId) || undefined;
}


export function getInstaprintProductOptionId(instaCartItem: InstaprintProduct): number {
	let productOptionId = 0;
	if (instaCartItem?.instaprint?.ratio === 1) {
		productOptionId = INSTAPRINT_PRODUCT_OPTIONS_MAP.SQUARE
	} else {
		productOptionId = INSTAPRINT_PRODUCT_OPTIONS_MAP.RECTANGLE
	}
	console.log("product Option id", productOptionId)
	return productOptionId;
}

export function getFrameProductOptionId(instaCartItem: InstaprintProduct): number {
	let productOptionId = 0;
	let hasMat = instaCartItem?.instaprint?.mat == "true" || instaCartItem?.instaprint?.mat == true;

	// SQUARE
	if (instaCartItem?.instaprint?.ratio === 1) {
		if (hasMat) {
			// SQUARE WITH MAT
			productOptionId = INSTAPRINT_FRAME_OPTIONS_MAP.MAT_SQUARE
		} else {
			// SQUARE WITHOUT MAT
			productOptionId = INSTAPRINT_FRAME_OPTIONS_MAP.SQUARE
		}
	} else {
		// RECTANGLE 
		if (hasMat) {
			// RECTANGE WITH MAT
			productOptionId = INSTAPRINT_FRAME_OPTIONS_MAP.MAT_RECTANGLE
		} else {
			// RECTANGE WITHOUT MAT
			productOptionId = INSTAPRINT_FRAME_OPTIONS_MAP.RECTANGLE
		}
	}
	return productOptionId;
}

export function getFrameProductFromInstaCartFrameLabel(currentProductFrameLabel: string, frameProducts: Partial<ProductDetails>[]): Partial<ProductDetails> | undefined {
	const mappedFrameProduct = FRAME_PRODUCT_MAP[currentProductFrameLabel as keyof typeof FRAME_PRODUCT_MAP]
	const frameProductId = mappedFrameProduct?.product_id || -1;

	return frameProducts.find((p: Partial<ProductDetails>) => p.product_id === frameProductId)
}