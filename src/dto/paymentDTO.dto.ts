import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator";
import { RecordIsInDb } from "../utils/decorator/record_in_db.decorator";

class PaymentDTO{
    @IsNotEmpty()
    @IsString()
    @RecordIsInDb("user.id")
    user_id!: string;

    @IsNotEmpty()
    @IsEmail()
    email!: string;
  
    @IsNotEmpty()
    @IsNumber()
    @Min(50)
    amount!: number;

    @IsOptional()
    @IsString()
    description?: string;
}

export default PaymentDTO;
