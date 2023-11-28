import { Entity, PrimaryGeneratedColumn, Column, OneToOne, CreateDateColumn, UpdateDateColumn } from "typeorm"

@Entity()
export class RefreshToken {

    @PrimaryGeneratedColumn()
    id: number

    @Column('int', {unique: true})
    user_id: number

    @Column('text')
    token: string

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

}
