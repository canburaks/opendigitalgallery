import React, { useMemo } from 'react';
import { MergedProductOption, ProductDetails } from '@/types';
import { TRX, NO_FRAME_PRODUCT, FRAME_IMAGE_PLACEHOLDER } from '@/constants';
import { useTranslation } from 'next-i18next';
import { useFrameDataFromQuery } from '../utils';
import { RadioGroup } from '@headlessui/react';
import { AddToCartButton } from './AddToCartButton';

type Props = {
  productTitle: string;
  productOptionIds: number[];
  activeProductOptionId?: number;
  productImageUrl: string;
  productId: number;
  productPrice: number;
  priceId: number | undefined;
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export function FrameWidget(props: Props) {
  // DEFAULT FRAME PRODUCT: (When No Frame is selected)
  const defaultProduct: Partial<ProductDetails> = NO_FRAME_PRODUCT!;
  const framesData = useFrameDataFromQuery(props);

  // CACHED DATA FROM REACT-QUERY
  const { t } = useTranslation('common');
  // const queryClient = useQueryClient();
  // const queryCache = queryClient.getQueryCache();
  const frames: ProductDetails[] = useMemo(() => [NO_FRAME_PRODUCT, ...framesData], [framesData]);

  // console.log('frames', frames);
  // PRODUCT ID OF THE FRAME: the frame which selected by user. E.g: id of Black Wooden Frame
  const [selectedFrameId, setSelectedFrameId] = React.useState<number>(-1);

  // FRAME PRODUCT: No Frame, Black Wooden Frame, Natuarl Wooden Frame etc.
  const selectedFrame: ProductDetails = useMemo(() => {
    // find the frame product that matches the selected frame id
    const selectedframe = frames.find((f) => f.product_id === selectedFrameId);
    if (
      !selectedframe ||
      selectedframe?.product_id === undefined ||
      selectedframe?.product_id === -1
    ) {
      return NO_FRAME_PRODUCT;
    } else {
      return selectedframe;
    }
  }, [frames, selectedFrameId]);

  // THE PRODUCT OPTION of  FRAME PRODUCT: [1,2,3,4] --> 70x50, 50x40, 40x30, 30x21
  const selectedFrameOption: MergedProductOption = useMemo(() => {
    if (selectedFrame && selectedFrame.options) {
      const frameOption = selectedFrame.options.filter(
        (o) => o.product_option_id === props.activeProductOptionId
      );
      if (frameOption.length > 0) {
        return frameOption[0];
      }
    }
    const defaultOption = defaultProduct.options!.find(
      (o) => o.product_option_id === props.activeProductOptionId
    );
    // console.log('defaultOption', defaultOption);
    if (defaultOption) return defaultOption;
    return defaultProduct.options![0];
  }, [defaultProduct.options, props.activeProductOptionId, selectedFrame]);

  // FRAMES HAS ONLY OPTION OF  SELECTED SIZE
  const framesByProductOptionId = useMemo(() => {
    return frames.map((frame) => {
      const _frame = { ...frame };
      const options: MergedProductOption[] | undefined = frame.options?.filter(
        (o) => o.product_option_id === selectedFrameOption.product_option_id
      );
      if (options && options.length > 0) {
        _frame.options = options;
      }
      return _frame;
    });
  }, [frames, selectedFrameOption.product_option_id]);
  // console.log('selectedFrameOption', props.activeProductOptionId, selectedFrameOption);

  return (
    <>
      <RadioGroup value={selectedFrameId} onChange={setSelectedFrameId}>
        <RadioGroup.Label className="block text-sm font-medium text-gray-700 z-10">
          {t(TRX.PRODUCT_DETAILS.CHOOSE_FRAME)}
        </RadioGroup.Label>
        <div className="mt-1 grid grid-cols-1 gap-4 sm:grid-cols-4">
          {framesByProductOptionId.length > 0 &&
            framesByProductOptionId.map((frame: ProductDetails) => (
              <RadioGroup.Option
                as="div"
                key={frame.product_id}
                value={frame.product_id}
                className={({ active }) =>
                  classNames(
                    active ? 'ring-2 ring-indigo-500' : '',
                    selectedFrame?.product_id === frame?.product_id ? 'bg-indigo-100' : 'bg-white',
                    'relative duration-300 ease-in-out transform-gpu block cursor-pointer rounded-lg border border-solid border-gray-300 p-4 focus:outline-none'
                  )
                }
              >
                {({ checked }) => (
                  <>
                    <div className="flex flex-col justify-between h-full">
                      <RadioGroup.Label as="p" className="text-xs font-medium text-gray-900">
                        {frame.title}
                      </RadioGroup.Label>
                      {frame.options && frame.options.length > 0 && (
                        <RadioGroup.Description as="p" className="mt-1 text-xs text-gray-500">
                          {`+${frame?.options[0]?.price} ${frame?.options[0]?.currency}`}
                        </RadioGroup.Description>
                      )}
                    </div>
                    <div
                      className={classNames(
                        'border-2',
                        checked ? 'border-indigo-500' : 'border-gray-500',
                        'pointer-events-none absolute inset-px rounded-lg'
                      )}
                      aria-hidden="true"
                    />
                  </>
                )}
              </RadioGroup.Option>
            ))}
        </div>
      </RadioGroup>
      {props.activeProductOptionId && selectedFrameId && props.productId && (
        <AddToCartButton
          productTitle={props.productTitle}
          priceId={props.priceId}
          productId={props.productId}
          productImageUrl={props.productImageUrl}
          productPrice={props.productPrice}
          productOptionId={props.activeProductOptionId!}
          frameId={selectedFrameOption.product_id!}
          frameTitle={selectedFrame.title!}
          framePrice={selectedFrameOption.price}
          frameImageUrl={selectedFrame.default_image_url || FRAME_IMAGE_PLACEHOLDER}
          text={t(TRX.PRODUCT_DETAILS.ADD_TO_CART)}
        />
      )}
    </>
  );
}
