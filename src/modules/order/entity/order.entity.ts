import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Generated, CreateDateColumn } from 'typeorm'

@Entity('order')
export class Order extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    @Generated("uuid")
    uuid: string;

    @CreateDateColumn()
    created: Date;

    @Column('text')
    orderVersion: string;

    @Column({ type: 'date', nullable: true })
    startDate: Date;
  
    @Column({ type: 'date', nullable: true })
    endDate: Date;

    @Column('text')
    stationName: string;

    @Column('decimal', { precision: 5, scale: 2 })
    orderTotal: number;
}