import { UseInstaprintStore } from "@/data/stores";
import { motion } from "framer-motion"
import type { InstaprintProduct } from "@/types";


export const InstaCartPreview = () => {


  // const cartProducts = generateCartProductsFromInstaCart()

  const page = UseInstaprintStore(state => state.page);
  const instaprintCart = UseInstaprintStore(state => state.instaprintCart);
  // get the sum of total priceNumber values of all instaprintCart
  const totalPrice = instaprintCart.reduce((acc, curr) => acc + (curr ? (curr.priceNumber || 0) : 0), 0)
  const currency = instaprintCart[0]?.priceCurrency 
  

  // console.log("instaprintCart", instaprintCart, totalPrice)
  // console.log("instaprintProduct", cartProducts)


  if (page !== 3) return <div></div>

  return (
    <motion.div className="flex flex-col pr-2"
      exit={{ opacity: 0, left: "-100%" }}
      initial={{ opacity: 1, left: "100%" }}
      animate={{ opacity: 1, left: 0 }}
      transition={{ duration: 0.3, ease: "linear" }}
    >
      <section className="py-12 bg-white sm:py-16 lg:py-20">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-5 lg:items-start xl:grid-cols-6 gap-y-10 lg:gap-x-12 xl:gap-x-16">
              <div className="lg:col-span-3 xl:col-span-4">
                <h1 className="text-2xl font-bold text-gray-900">Preview</h1>

                <div className="hidden mt-8 lg:grid lg:grid-cols-2 lg:gap-x-16 xl:gap-x-64">
                  <div className="flex-1">
                    <p className="text-xs font-bold tracking-widest text-gray-400 uppercase">Product</p>
                  </div>

                  <div className="sm:grid sm:grid-cols-2 lg:gap-x-0 xl:gap-x-1">

                    <div>
                      <p className="text-xs font-bold tracking-widest text-gray-400 uppercase">Price</p>
                    </div>
                  </div>
                </div>

                <hr className="mt-8 border-gray-200 lg:mt-4" />

                <div className="flow-root mt-7">
                  <ul className="divide-y divide-gray-200 -my-7">
                    {instaprintCart.map((instaprintProduct: InstaprintProduct) => (
                      <InstaCartPreviewItem 
                        product={instaprintProduct} 
                        key={`instaprint-${instaprintProduct.instaprint?.mediaId}`} />
                    ))}



                  </ul>
                </div>

                <hr className="border-gray-200 mt-7" />
              </div>

              <div className="lg:col-span-2 lg:sticky lg:top-6">
                <div className="overflow-hidden bg-gray-900 rounded-md">
                  <div className="px-4 py-6 sm:p-6 lg:p-8">
                    <h2 className="text-2xl font-bold text-white">Cart total</h2>

                    <div className="flow-root mt-5">
                      <div className="-my-6 divide-y divide-gray-700">
                        <div className="flex items-center justify-between py-6">
                          <p className="text-base font-medium text-white">Subtotal</p>
                          <p className="text-base font-medium text-white">{`${totalPrice} ${currency}`}</p>
                        </div>

                        <div className="py-6 space-y-4">
                          <div className="flex items-center justify-between">
                            <p className="text-base font-bold text-gray-300">Tax</p>
                            <p className="text-base font-bold text-white">$0</p>
                          </div>

                          <div>
                            <div className="flex items-center justify-between">
                              <p className="text-base font-bold text-gray-300">Shipping</p>
                              <p className="text-base font-bold text-white"></p>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between py-6">
                          <p className="text-base font-bold text-white">Total</p>
                          <p className="text-base font-bold text-white">{`${totalPrice} ${currency}`}</p>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </motion.div>
  )
}


const InstaCartPreviewItem = ({ product }: { product: InstaprintProduct }) => (
  <li className="flex py-7">
    <div className="flex-shrink-0">
      <img className="object-cover w-16 h-16 rounded-lg" src={product?.instaprint?.mediaUrl!} alt="" />
    </div>

    <div className="flex-1 ml-5">
      <div className="relative sm:grid sm:grid-cols-2 sm:gap-x-5 sm:pr-0">
        <div className="pr-9 sm:pr-5">
          <p className="text-base font-bold text-gray-900">Instaprint Product</p>
          <p className="mt-1.5 text-sm font-medium text-gray-500">{product?.instaprint?.ratio === 1 ? "Square" : "Rectangle"}</p>
        </div>

        <div className="flex items-end justify-between mt-3 sm:justify-end sm:pr-14 sm:items-start sm:mt-0">
          <p className="flex-shrink-0 w-20 text-base font-bold text-left text-gray-900 sm:text-right sm:order-2 sm:ml-8">{product.priceText}</p>
        </div>
      </div>
    </div>
  </li>
)
