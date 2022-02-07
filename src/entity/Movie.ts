import {Entity, PrimaryGeneratedColumn, Column , ManyToOne, BaseEntity} from "typeorm";
import { User } from "./User";

@Entity()

export class Movie extends BaseEntity{


    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    movieName: string;

    @ManyToOne(() => User, user => user.movies)
    user_id: User;
}

