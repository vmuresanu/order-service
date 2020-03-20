import { Expose, Exclude } from 'class-transformer'

export class OrderResponse {
    @Expose({ name: 'uuid' })
    id: string;

    stationName: string;

    startDate: Date;

    endDate: Date;

    @Exclude()
    created: string;

    
}