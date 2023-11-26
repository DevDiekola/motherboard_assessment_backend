import { Entity, PrimaryGeneratedColumn, Column, OneToOne, CreateDateColumn, UpdateDateColumn } from "typeorm"
// import { RefreshToken } from "./RefreshToken"

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', {unique: true})
    email: string;

    @Column('varchar')
    password: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    // @OneToOne((type) => RefreshToken, (refreshToken) => refreshToken.user)
    // refreshToken: RefreshToken

}
