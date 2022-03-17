import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('user')
export class User {
    @PrimaryColumn()
    id : number;

    @Column()
    username : string;

    @Column()
    password : string;
}   