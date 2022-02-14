import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { MovieList } from './MovieList';

@Entity()
export class Movie extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@ManyToOne(() => MovieList, (movieList) => movieList.movies , {onDelete: 'CASCADE'})
	movieList: MovieList;
}
