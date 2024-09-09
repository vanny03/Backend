import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"


@Entity()
export class Login {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "text", nullable: true })
    username: string

    @Column({ type: "text", nullable: true })
    password: string

}