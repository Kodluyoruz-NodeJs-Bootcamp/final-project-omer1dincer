import {Entity, PrimaryGeneratedColumn, Column , ManyToOne, BaseEntity} from "typeorm";


@Entity()

export class Comment extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    comment: string;


}

