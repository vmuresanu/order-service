import { IsString, IsNumber, Validate, IsISO8601 } from 'class-validator';
import { IsBeforeConstraint } from '../../../shared/constraints/date-is-before.constraint';

export class OrderRequest {
    @IsString()
    stationName: string

    @Validate(IsBeforeConstraint, ['endDate'])
    @IsISO8601()
    startDate: Date;

    @IsISO8601()
    endDate: Date;

    @IsString()
    orderVersion: string;
    
    @IsNumber()
    orderTotal: number;
}