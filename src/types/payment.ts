import { Product } from './generatedDBTypes';
/*
########################################################################################
#                       IYZICO PAYMENT INTERFACE AND TYPES                             #
#                 https://dev.iyzipay.com/tr/api/odeme#samplecodes                     #
########################################################################################
*/

export interface FormInitializeRequest {
  locale?: string;
  paymentPageUrl?: string;
  conversationId?: string;
  price: string;
  paidPrice: string; // İndirim vade farkı vs. hesaplanmış POS’tan geçecek nihai tutar. Price değerinden küçük, büyük veya eşit olabilir.
  currency: PaymentCurrency;
  basketId?: string;
  paymentGroup?: PaymentGroup;
  callbackUrl: string;
  enabledInstallments: EnabledInstallments[];
  buyer: Partial<Buyer>;
  shippingAddress: ShippingAddress;
  billingAddress: BillingAddress;
  basketItems: BasketItem[];
}

export type EnabledInstallments = 1 | 2 | 3 | 6 | 9 | 12;
export type CurrencyIyzico = 'TRY' | 'EUR' | 'USD';
export type PaymentCurrency = CurrencyIyzico;
// enum PaymentChannel {
//   WEB = 'WEB',
//   MOBILE = 'MOBILE',
//   MOBILE_WEB = 'MOBILE_WEB',
//   MOBILE_IOS = 'MOBILE_IOS',
//   MOBILE_ANDROID = 'MOBILE_ANDROID',
//   MOBILE_WINDOWS = 'MOBILE_WINDOWS',
//   MOBILE_TABLET = 'MOBILE_TABLET',
//   MOBILE_PHONE = 'MOBILE_PHONE',
// }

export enum PaymentGroup {
  PRODUCT = 'PRODUCT',
  LISTING = 'LISTING',
  SUBSCRIPTION = 'SUBSCRIPTION',
  OTHER = 'OTHER',
}

export interface Buyer {
  id: string;
  name: string;
  surname: string;
  gsmNumber?: string;
  email: string;
  identityNumber: string;
  lastLoginDate?: string;
  registrationDate?: string;
  registrationAddress: string;
  ip: string;
  city: string;
  country: string;
  zipCode?: string;
}
export type PaymentAddress = {
  contactName: string;
  city: string;
  country: string;
  address: string;
  zipCode?: string;
};
type ShippingAddress = PaymentAddress;
type BillingAddress = PaymentAddress;

export enum ItemType {
  PHYSICAL = 'PHYSICAL',
  VIRTUAL = 'VIRTUAL',
}

export type BasketItem = {
  id: string;
  name: string;
  category1: string;
  category2?: string;
  itemType: ItemType;
  price: string;
};

/* -----------  RESPONSE ----------------- */
export interface FormInitializeResponse {
  checkoutFormContent: string;
  paymentPageUrl: string;
  token: string;
  tokenExpireTime: number;
  status: string;
  errorCode: string;
  errorMessage: string;
  errorGroup: string;
  locale: string;
  systemTime: number;
  conversationId: string;
  message?: string;
}

export interface PaymentDetailRequest {
  status: string;
  locale: string;
  systemTime: number;
  conversationId: string;
  price: number;
  paidPrice: number;
  installment: number;
  paymentId: string;
  fraudStatus: number;
  merchantCommissionRate: number;
  merchantCommissionRateAmount: number;
  iyziCommissionRateAmount: number;
  iyziCommissionFee: number;
  cardType: string;
  cardAssociation: string;
  cardFamily: string;
  binNumber: string;
  lastFourDigits: string;
  basketId: string;
  currency: PaymentCurrency;
  authCode: string;
  phase: string;
  hostReference: string;
  itemTransactions: TransactionItem[];
}

export interface TransactionItem {
  itemId: string;
  paymentTransactionId: string;
  transactionStatus: number;
  price: number;
  paidPrice: number;
  merchantCommissionRate: number;
  merchantCommissionRateAmount: number;
  iyziCommissionRateAmount: number;
  iyziCommissionFee: number;
  blockageRate: number;
  blockageRateAmountMerchant: number;
  blockageRateAmountSubMerchant: number;
  blockageResolvedDate: string;
  subMerchantPrice: number;
  subMerchantPayoutRate: number;
  subMerchantPayoutAmount: number;
  merchantPayoutAmount: number;
  convertedPayout: ConvertedPayout;
}

export interface CheckoutPaymentRequest {
  locale: string;
  currency: PaymentCurrency;
  price: string;
  paidPrice: string;
  shippingAddress: PaymentAddress;
  billingAddress?: PaymentAddress;
  buyer: Buyer;
  basketItems: BasketItem[];
}

/**
 *  ORDER  QUERY
 */
export enum OrderStatusEnum {
  PaymentAwaiting = 0,
  Ordered = 1,
  Shipped = 2,
  Delivered = 3,
  Canceled = 4,
  UnsuccessfulPayment = 5,
}
export enum OrderResponseStatusEnum {
  SUCCESS = 'success',
  FAILURE = 'failure',
}
export type THREED_PAYMENT_FAILURE = 0 | 2 | 3 | 4 | 5 | 7;
export type OrderResponseStatus = 'success' | 'failure';
export type OrderResponsePaymentStatus =
  | 'SUCCESS'
  | 'FAILURE'
  | 'INIT_THREEDS'
  | 'CALLBACK_THREEDS'
  | 'BKM_POS_SELECTED'
  | 'CALLBACK_PECCO';
export type OrderQueryResponse = {
  token: string;
  callbackUrl: string;
  status: OrderResponseStatusEnum;
  paymentStatus: OrderResponsePaymentStatus;
  errorCode: string;
  errorMessage: string;
  errorGroup: string;
  locale: string;
  systemTime: string;
  conversationId: string;
  paymentId: string;
  price: number;
  paidPrice: number;
  currency: PaymentCurrency;
  installment: number;
  basketId: string;
  binNumber: string;
  lastFourDigits: string;
  cardAssociation: string;
  cardFamily: string;
  cardType: string;
  fraudStatus: number;
  iyziCommissionFee: number;
  iyziCommissionRateAmount: number;
  merchantCommissionRate: number;
  merchantCommissionRateAmount: number;
  itemTransactions: ItemTransaction[];
  mdStatus: THREED_PAYMENT_FAILURE;
};

// Response from our api: /api/iyzico/query-payment-response
export type OrderQueryApiResponse =
  | (OrderQueryResponse & { [message: string]: string })
  | { [message: string]: string };

export type ItemTransaction = {
  paymentTransactionId: string;
  itemId: string;
  price: number;
  paidPrice: number;
  transactionStatus: number;
  blockageRate: number;
  blockageRateAmountMerchant: number;
  blockageResolvedDate: string;
  iyziCommissionFee: number;
  iyziCommissionRateAmount: number;
  merchantCommissionRate: number;
  merchantCommissionRateAmount: number;
  merchantPayoutAmount: number;
  convertedPayout: ConvertedPayout;
};
export type TransactionItemProduct = Partial<Product> & Partial<TransactionItem>;

export type ConvertedPayout = {
  paidPrice: number;
  iyziCommissionFee: number;
  iyziCommissionRateAmount: number;
  blockageRateAmountMerchant: number;
  merchantPayoutAmount: number;
  iyziConversationRate: number;
  iyziConversationRateAmount: number;
  currency: PaymentCurrency;
};
