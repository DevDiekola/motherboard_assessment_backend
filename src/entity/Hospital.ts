import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm"

@Entity()
export class Hospital {

    @PrimaryGeneratedColumn()
    id: number

    @Column('int')
    user_id: number

    @Column('varchar')
    name: string

    @Column('text')
    address: string

    @Column('int')
    phone: number

    @Column('int')
    rating: number

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

}
