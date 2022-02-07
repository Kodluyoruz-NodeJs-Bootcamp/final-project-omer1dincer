import {Entity, PrimaryGeneratedColumn, Column , OneToMany, BaseEntity} from "typeorm";
import { Movie } from "./Movie";

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn("uuid")
    id: number;

    @Column()
    firstName: string;

    @OneToMany(() => Movie, movie => movie.user_id)
    movies: Movie[];
}
