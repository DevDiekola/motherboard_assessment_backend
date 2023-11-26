import { Entity, PrimaryGeneratedColumn, Column, OneToOne, CreateDateColumn, UpdateDateColumn } from "typeorm"
// import { User } from "./User"

@Entity()
export class RefreshToken {

    @PrimaryGeneratedColumn()
    id: number

    @Column('int')
    user_id: number

    @Column('text')
    token: string

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    // @OneToOne((type) => User, (user) => user.refreshToken)
    // user: User

}
