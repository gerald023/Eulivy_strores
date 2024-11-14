import { createHmac } from "crypto";
import { CustomError } from "../../error/customError.error";
import { db } from "../../utils/db.utils";


class WebhookServiceImpl{
    async handle(data: any): Promise<void> {
        try{
            if (data.event === 'charge.success') {
                const ref = data.data.reference as string;
                const transaction_id = ref.split("-")[1]

                const transaction = await db.transaction.findFirst({
                    where: {
                      id: transaction_id,
                    },
                  });   
    
                  if (
                    transaction?.status === "successful" ||
                    transaction?.status === "failed"
                  ) {
                    return;
                  }

                  await db.transaction.update({
                    where: {
                      id: transaction_id,
                    }, 
                    data: {
                      status: "successful",
                    },
                  });
            }
        }catch (error) {
            console.log("error in updating the transaction " + error);
          }
    }
    async verify(signature: string, data: any): Promise<boolean> {
        const secret = process.env.PAYSTACK_SECRET_KEY;
        if (!secret) {
          throw new CustomError(500, "Paystack secret key not set");
        }
        const hash = createHmac("sha512", secret)
        .update(JSON.stringify(data))
        .digest("hex");
  
      if (signature !== hash) {
        throw new CustomError(409, "Invalid signature");
      }
      console.log(secret, hash)
      return true;
    }
}

export default WebhookServiceImpl;