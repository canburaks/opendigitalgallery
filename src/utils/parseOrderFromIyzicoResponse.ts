import {
  OrderQueryApiResponse,
  OrderInsertType,
  OrderResponseStatusEnum,
  OrderStatusEnum,
} from '@/types';

export function parseOrderFromIyzicoResponse(
  response: OrderQueryApiResponse
): OrderInsertType | undefined {
  if (response.status && response.token) {
    return {
      ...(response.status === OrderResponseStatusEnum.SUCCESS
        ? { order_status_id: OrderStatusEnum.Ordered }
        : { order_status_id: OrderStatusEnum.UnsuccessfulPayment }),
      payment_provider_token: response.token,
      payment_provider_response: JSON.stringify(response),
      total_price: typeof response.price === 'string' ? parseFloat(response.price) : response.price,
    };
  }
}
