import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity } from 'typeorm';
import { MovieList } from './MovieList';

@Entity()
export class MovieListComment extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	comment: string;

	@ManyToOne(() => MovieList, (movieList) => movieList.comments ,{onDelete: 'CASCADE'})
	movieList: MovieList;
}
