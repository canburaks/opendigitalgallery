import { useState, useEffect, useCallback, useMemo, useRef } from "react"
import { UseInstaprintStore, useCartStore } from "@/data/stores";
import { motion, AnimatePresence } from "framer-motion"
import useDimensions from "react-cool-dimensions";
import type { IGMedia, CartProduct, FrameOptionsSelectUnionType } from "@/types";
import { IG_USER_USER_MEDIA_LOCAL_STORAGE_KEY, TRX, INSTAPRINT_PRODUCT_PLACEHOLDER, InstaprintFrameOptionsEnum } from "@/constants";
import { useTranslation } from 'next-i18next';
import { MatSelection, FrameSelection, QuantitySelection, MediaWrapper } from "./index";


export const InstaSelection = () => {

  const { observe, unobserve, width, height, entry } = useDimensions({
    onResize: ({ observe, unobserve, width, height, entry }) => {
      // Triggered whenever the size of the target is changed...

      unobserve(); // To stop observing the current target element
      observe(); // To re-start observing the current target element
    },
  });
  // const dynamicProductData = useDynamicProductData();
  // const inputData = useMemo(() => {
  //   return dynamicProductData?.product?.variants?.map(pv => ({
  //     label: pv.title,
  //     value: pv.id.toString(),
  //   }))
  // }, [dynamicProductData])
  const page = UseInstaprintStore(state => state.page);

  const media = UseInstaprintStore(state => state.media);
  const selections = UseInstaprintStore(state => state.selections);
  const toggleMedia = UseInstaprintStore(state => state.toggleSelection);

  const initialData = useMemo(() => selections.map(s => ({ id: s, })), [selections])

  const cartItems = useCartStore(state => state.store);
  const setCartItems = useCartStore(state => state.addToCart);
  // console.log("\n\ninsta selection---\npage", page)
  // console.log("selection", selections)
  // console.log("media", media)
  // console.log("cartItems", cartItems)

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
          key={selectedId + index}
          selectedId={selectedId}
          order={index}
        // dynamicProductData={[]}
        />

      ))}
    </motion.div>
  )
}

const InstaSelectionItem = ({ selectedId, order }: { selectedId: string, order: number }) => {
  const { t } = useTranslation("common");
  const imageRef = useRef<HTMLImageElement>(null);

  const medias: IGMedia[] = UseInstaprintStore(state => state?.media);
  const currentMedia: IGMedia = medias.find(m => m.id === selectedId)!;
  const [currentProduct, setCurrentProduct] = useState<CartProduct>({
    ...INSTAPRINT_PRODUCT_PLACEHOLDER,
    instaprint: {
      mediaId: selectedId,
      ...INSTAPRINT_PRODUCT_PLACEHOLDER.instaprint,
    }
  });
  // console.log("media-single", currentMedia)

  // const cartItems = useCartStore(store => store.store);
  // const setCartItems = useCartStore(state => state.addToCart);
  // const addToCart = useCartStore(state => state.addToCart);


  // const updateCartItems = (selectedId: string, cartItem: CartProduct) => {
  //   console.log("updateCartItems", selectedId)
  //   const existingItem = cartItems.find((item: any) => item.instaprint.__insta_id === selectedId);
  //   const otherItems = cartItems.filter((item: any) => item.instaprint.__insta_id !== selectedId);
  //   setCartItems([...otherItems, { ...existingItem, ...cartItem }])
  // }



  // Handlers
  const quantityHandler = (value: number | string) => setCurrentProduct({ ...currentProduct, quantity: typeof value === "string" ? parseInt(value) : value });
  const matHandler = (value: boolean|string) => setCurrentProduct({ ...currentProduct, instaprint: { ...currentProduct.instaprint, mat: value } });
  const frameHandler = (value: InstaprintFrameOptionsEnum) => setCurrentProduct({ ...currentProduct, instaprint: { ...currentProduct.instaprint, frame: value } });





  // STEPPER
  const [active, setActive] = useState(0);
  const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

  // console.log("current product", currentProduct)

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
          value={(currentProduct.quantity).toString()}
        />
        <MatSelection
          value={currentProduct?.instaprint?.mat!}
          handler={matHandler}
          title={t(TRX.INSTAPRINT.APP_MODAL_SELECTION_VARIATION1_TITLE)}
          description={t(TRX.INSTAPRINT.APP_MODAL_SELECTION_VARIATION1_DESCRIPTION)}
        />
        <FrameSelection
          // @ts-ignore
          value={currentProduct?.instaprint?.frame!}
          handler={frameHandler}
          title={t(TRX.INSTAPRINT.APP_MODAL_SELECTION_VARIATION2_TITLE)}
          description={t(TRX.INSTAPRINT.APP_MODAL_SELECTION_VARIATION2_DESCRIPTION)}
        />
        <div className="rounded-lg w-[80%] p-2">

        </div>
      </div>

      <div className="flex flex-col items-center justify-center flex-grow w-1/2 md:w-3/5 relative z-10">
        <MediaWrapper
          imageSrc={currentMedia.media_url}
          mat={currentProduct?.instaprint?.mat!}
          frame={currentProduct?.instaprint?.frame!}

        />

      </div>

    </div>
  )
}

