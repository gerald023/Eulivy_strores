import { db } from '../../utils/db.utils';
import {PaymentDTO} from '../../dto/export';
import {PaymentService} from '../exports';
import axios from 'axios';
import { CustomError } from '../../error/customError.error';

class PaymentServiceImpl implements PaymentService{
    async pay(data: PaymentDTO): Promise<{ url: string | null; }> {
        const transaction = await db.transaction.create({
            data: {
                amount: data.amount,
                user_id: data.user_id,
                description: data.description
            }
        });
        const user = await db.user.findUnique({
            where: {
                id: data.user_id
            }
        })
        
        const ref = `REF-${transaction.id}`;
        const actualAmount = data.amount * 100;
        const secret = process.env.PAYSTACK_SECRET_KEY;
        const endpoint = `https://api.paystack.co/transaction/initialize`;
        const headers = {
          Authorization: `Bearer ${secret}`,
        }; 
        const body = {
            email: data.email,
            amount: actualAmount.toString(),
            reference: ref,
            callback_url: "http://localhost:5173/",
            channels: ["card", "ussd"],
            metadata: {
              for: "reports",
            },
          };

          const res = await axios.post(endpoint, body, {
            headers,
            validateStatus: () => true,
          });
          console.log(res);
      
          if (res.status != 200 && !res.data.status) {
            throw new CustomError(409, res.data);
          }
          return { url: res.data.data.authorization_url };
    }

}

export default PaymentServiceImpl;