import { POST as verifyHandler } from "@/app/api/razorpay/verify/route";

export async function POST(request: Request) {
  return verifyHandler(request);
}
