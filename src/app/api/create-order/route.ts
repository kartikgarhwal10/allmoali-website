import { POST as createOrderHandler } from "@/app/api/razorpay/create-order/route";

export async function POST(request: Request) {
  return createOrderHandler(request);
}
