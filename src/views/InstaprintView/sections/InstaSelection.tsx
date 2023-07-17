import { useState, useEffect, useCallback, useMemo } from "react"
import { UseInstaprintStore, useCartStore } from "@/data/stores";
import { motion, AnimatePresence } from "framer-motion"
import useDimensions from "react-cool-dimensions";
import type { IGMedia, CartProduct } from "@/types";
import { IG_USER_USER_MEDIA_LOCAL_STORAGE_KEY, TRX, INSTAPRINT_PRODUCT_PLACEHOLDER } from "@/constants";
import { useTranslation } from 'next-i18next';
import { set } from "lodash";

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
    console.log("\n\ninsta selection---\npage", page)
    console.log("selection", selections)
    console.log("media", media)
    console.log("cartItems", cartItems)

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
            dynamicProductData={[]}
          />
  
        ))}
      </motion.div>
    )
  }

  const InstaSelectionItem = ({ selectedId, order, dynamicProductData }: { selectedId: string, order: number, dynamicProductData: RootInterface }) => {

    const medias: IGMedia[] = UseInstaprintStore(state => state?.media);
    const currentMedia: IGMedia = medias.find(m => m.id === selectedId)!;
    const [currentProduct, setCurrentProduct] = useState<CartProduct>({
      ...INSTAPRINT_PRODUCT_PLACEHOLDER,
      instaprint: {
        mediaId: selectedId,
        ...INSTAPRINT_PRODUCT_PLACEHOLDER.instaprint,
      }
    });
    console.log("media-single", currentMedia)

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
    const quantityHandler = (value: number) => setCurrentProduct({ ...currentProduct, quantity: value });
    const matHandler = (value: string) => setCurrentProduct({ ...currentProduct, instaprint: { ...currentProduct.instaprint, mat: value } });
    const frameHandler = (value: string | boolean) => setCurrentProduct({ ...currentProduct, instaprint: { ...currentProduct.instaprint, frame: value } });
  
  
  
  
  
    // STEPPER
    const [active, setActive] = useState(0);
    const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
    const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));
  

  
    return (
      <div
        className="relative min-h-[400px] h-auto flex justify-start  items-stretch my-4 p-4 border border-gray-200 border-solid rounded-lg shadow-lg"
        key={selectedId}
      >
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-[rgba(255,255,255,0.85)] backdrop-blur-lg z-0 min-h-full w-full rounded-lg"></div>
        <div className="relative flex flex-col flex-grow justify-start items-start p-4 z-10 min-h-full pr-8 !w-full" >
          <MatSelection
            value={currentProduct?.instaprint?.mat}
            handler={matHandler}
            title={TRX.app.selection.variations[0].title}
            description={TRX.app.selection.variations[0].description}
          />
          <FrameSelection
            value={currentProduct?.instaprint?.frame}
            handler={frameHandler}
            title={TRX.app.selection.variations[1].title}
            description={TRX.app.selection.variations[1].description}
          />
          <div className="rounded-lg w-[80%] p-2">
  
          </div>
        </div>
  
        <div className="flex flex-col w-auto relative z-10">
          <motion.div
            style={{
  
              padding: currentItem?.properties?.mat === "true" ? "15px" : "0px",
              border: currentItem?.properties?.mat === "true" ? "1px solid rgba(0,0,0,0.5)" : "1px solid rgba(0,0,0,0)",
              margin: currentItem?.properties?.mat === "true" ? "0px" : "15px",
              marginBottom: 32
            }}
  
            transition={{ duration: 0.3, ease: "linear", borderColor: { duration: 0.5 } }}
  
          >
            <motion.img
              style={{
                width: 200,
                height: 200,
                border: currentItem?.properties.mat === "false" ? "1px solid rgba(0,0,0,0.5)" : "1px solid rgba(0,0,0,0)",
              }}
              transition={{ duration: 0.3, ease: "linear" }}
              src={media.media_url}
              alt="selected media"
            />
          </motion.div>
          <input
            label={TRX.common.quantity}
            placeholder={TRX.common.placeholder}
            onChange={quantityHandler}
            value={currentItem?.quantity}
            max={5}
            min={1}
          />
  
        </div>
  
      </div>
    )
  }
  
  const MatSelection = ({ value, handler, title, description }: { value: string, title: string, description: string, handler: (val: string) => void }) => {
  
    return (
      <motion.div className="w-full flex flex-col mt-2">
        <h3 className="flex flex-row text-lg font-bold">{title}</h3>
        <p className="opacity-70 py-0">{description}</p>
        <SegmentedControl
          data={[
            { label: 'Yes', value: 'true' },
            { label: 'No', value: 'false' },
          ]}
          value={value}
          onChange={handler}
        />
      </motion.div>)
  }
  const FrameSelection = ({ value, handler, title, description }: { value: string, title: string, description: string, handler: (val: string) => void }) => {
    return (
      <motion.div className="w-full flex flex-col  mt-8">
        <h3 className="flex flex-row text-lg font-bold">{title}</h3>
        <p className="opacity-70 py-0">{description}</p>
        <SegmentedControl
          data={Object.keys(TRX.frames).map((key, i) => ({ label: TRX.frames[key], value: key }))}
          value={value}
          onChange={handler}
        />
      </motion.div>
    )
  }
  