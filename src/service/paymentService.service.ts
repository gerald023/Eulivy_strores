import {PaymentDTO} from '../dto/export'
interface PaymentService{
    pay(data: PaymentDTO): Promise<{ url: string | null }>;
}

export default PaymentService