import { useEffect, useState } from "react"
import { UseInstaprintStore } from "@/data/stores";
import { motion } from "framer-motion"
import useDimensions from "react-cool-dimensions";
import type { IGMedia, InstaprintProduct } from "@/types";
import { TRX, INSTAPRINT_PRODUCT_PLACEHOLDER, InstaprintFrameOptionsEnum } from "@/constants";
import { useTranslation } from 'next-i18next';
import { MatSelection, FrameSelection, QuantitySelection, MediaWrapper } from "./index";
import { useRemoteMediaDimensions } from "@/data/hooks";
import { ProductPricePreview } from "./ProductPricePreview";
import { getProductPrice, getFramePrice, getFrameProductFromInstaCartFrameLabel, getPriceTextFromPrices } from "../utils";

export const InstaSelection = () => {
  const { observe } = useDimensions({});
  const page = UseInstaprintStore(state => state.page);
  const selections = UseInstaprintStore(state => state.selections);
  // const instaprint = UseInstaprintStore(state => state?.instaprint);
  // const frames = UseInstaprintStore(state => state?.frames);


  if (page !== 2) return <div></div>

  return (
    <motion.div className="flex flex-col pr-2" ref={observe}
      exit={{ opacity: 0, left: "-100%" }}
      initial={{ opacity: 1, left: "100%" }}
      animate={{ opacity: 1, left: 0 }}
      transition={{ duration: 0.3, ease: "linear" }}

    >
      {selections.map((selectedId, index) => (
        <InstaSelectionItem
          key={"instaselections-" + selectedId}
          selectedId={selectedId}
        //order={index}
        // dynamicProductData={[]}
        />

      ))}
    </motion.div>
  )
}

const InstaSelectionItem = ({ selectedId }: { selectedId: string }) => {
  const { t } = useTranslation("common");
  // const imageRef = useRef<HTMLImageElement>(null);

  const medias: IGMedia[] = UseInstaprintStore(state => state?.media);
  const instaprint = UseInstaprintStore(state => state?.instaprint);
  const frames = UseInstaprintStore(state => state?.frames);
  const getInstaprintCartProduct = UseInstaprintStore(state => state?.getInstaprintCartProduct);

  const addOrUpdateInstaprintCart = UseInstaprintStore(state => state?.addOrUpdateInstaprintCart);
  const currentMedia: IGMedia = medias.find(m => m.id === selectedId)!;
  const existingInstaCartProduct = getInstaprintCartProduct(selectedId);

  const { ratio } = useRemoteMediaDimensions(currentMedia.media_url);
  //const currentInstaprintCartProduct = useMemo(() => getInstaprintCartProduct(selectedId), [selectedId, ratio])
  //console.log("currentInstaprintCartProduct", currentInstaprintCartProduct)
  // console.log("ratio", ratio)

  const [currentProduct, setCurrentProduct] = useState<InstaprintProduct>(
    existingInstaCartProduct
      ? existingInstaCartProduct
      : {
        ...INSTAPRINT_PRODUCT_PLACEHOLDER,
        instaprint: {
          ...INSTAPRINT_PRODUCT_PLACEHOLDER?.instaprint,
          mediaId: selectedId,
          mediaUrl: currentMedia.media_url,
          ratio: ratio || 1
        }
      });
  const productPrice = getProductPrice(currentProduct, instaprint);
  const currentFrame = getFrameProductFromInstaCartFrameLabel(currentProduct?.instaprint?.frame!, frames)
  const framePrice = getFramePrice(currentProduct, currentFrame)
  // const currentProductPrice = useMemo(() => getProductPrice(currentProduct, instaprint), [ratio, selectedId, instaprint])
  // const currentProductFrameProduct = useMemo(() => getFrameProductFromInstaCartFrameLabel(currentProduct?.instaprint?.frame!, frames), [ratio, currentProduct, selectedId, frames])
  // const currentProductFramePrice = useMemo(() => getFramePrice(currentProduct, currentProductFrameProduct), [ratio, selectedId, currentProduct, currentProductFrameProduct])
  // console.log("current price", currentProductPrice)
  // console.log("current frame product", currentProductFrameProduct)

  // console.log("current frame price", currentProductFramePrice)

  // Handlers
  // console.log("currentProduct", currentProduct)
  const quantityHandler = (value: number | string) => setCurrentProduct({ ...currentProduct, quantity: typeof value === "string" ? parseInt(value) : value });
  const matHandler = (value: boolean | string) => setCurrentProduct({ ...currentProduct, instaprint: { ...currentProduct.instaprint, mat: value, ratio } });
  const frameHandler = (value: InstaprintFrameOptionsEnum) => setCurrentProduct({ ...currentProduct, instaprint: { ...currentProduct.instaprint, frame: value, mat: value === InstaprintFrameOptionsEnum.NO_FRAME ? "" : currentProduct.instaprint?.mat, ratio } });



  // console.log("current product", currentProduct)
  // useEffect(() => {
  //   addOrUpdateInstaprintCart({
  //     ...currentProduct,

  //   })
  // }, [currentProduct])

  useEffect(() => {
    const priceText = getPriceTextFromPrices(productPrice, framePrice, currentProduct?.quantity!)
    const [priceNumber, priceCurrency] = priceText.split(" ")
    // console.log("current price", productPrice)
    // console.log("current frame product", currentFrame)

    // console.log("current frame price", currentFramePrice)
    const newCurrentProduct = {
      ...currentProduct,
      priceId: productPrice ? productPrice.price_id : currentProduct.priceId,
      frameProductId: currentFrame ? currentFrame.product_id : currentProduct.frameProductId,
      framePriceId: framePrice ? framePrice.price_id : currentProduct.framePriceId,

      productPrice,
      framePrice,

      priceText,
      priceNumber: parseInt(priceNumber),
      priceCurrency,

      frameShippingPrice: framePrice?.shipping_cost || 0,
      productShippingPrice: productPrice?.shipping_cost || 0,

      instaprint: {
        ...currentProduct.instaprint,
        ratio
      }
    }
    // console.log("newCurrentProduct", newCurrentProduct)

    setCurrentProduct(newCurrentProduct)
    addOrUpdateInstaprintCart(newCurrentProduct)

  }, [ratio, instaprint, frames, currentProduct?.instaprint?.frame!, currentProduct.quantity, framePrice, productPrice])

  return (
    <div
      className="relative min-h-[400px] h-auto flex justify-start  items-start my-4 p-4 border border-gray-100 border-solid rounded-lg shadow-md"
      key={selectedId}
    >
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-[rgba(255,255,255,0.85)] backdrop-blur-lg z-0 min-h-full w-full rounded-lg"></div>
      <div className="relative flex flex-col justify-start items-start p-4 z-10 min-h-full pr-8 w-1/2 md:w-2/5" >
        <QuantitySelection
          title={(t(TRX.INSTAPRINT.APP_MODAL_QUANTITY) as string)}
          description={(t(TRX.INSTAPRINT.APP_MODAL_PLACEHOLDER) as string)}
          handler={quantityHandler}
          value={(currentProduct?.quantity || 1).toString()}
        />
        {currentProduct?.instaprint?.frame !== undefined
          && <FrameSelection
            // @ts-ignore
            value={currentProduct.instaprint.frame!}
            handler={frameHandler}
            title={t(TRX.INSTAPRINT.APP_MODAL_SELECTION_VARIATION2_TITLE)}
            description={t(TRX.INSTAPRINT.APP_MODAL_SELECTION_VARIATION2_DESCRIPTION)}
          />}
        {currentProduct?.instaprint?.mat !== undefined && currentProduct?.instaprint?.frame !== InstaprintFrameOptionsEnum.NO_FRAME
          && <MatSelection
            value={currentProduct.instaprint.mat!}
            handler={matHandler}
            title={t(TRX.INSTAPRINT.APP_MODAL_SELECTION_VARIATION1_TITLE)}
            description={t(TRX.INSTAPRINT.APP_MODAL_SELECTION_VARIATION1_DESCRIPTION)}
          />}
        <div className="rounded-lg w-[80%] p-2">
          <ProductPricePreview selectedMediaId={selectedId} />

        </div>
      </div>

      {currentProduct?.instaprint !== undefined && <div className="flex flex-col items-center justify-center flex-grow w-1/2 md:w-3/5 relative z-10">
        <MediaWrapper
          imageSrc={currentMedia.media_url}
          mat={currentProduct.instaprint.mat!}
          frame={currentProduct.instaprint.frame!}
        />

      </div>}

    </div>
  )
}






