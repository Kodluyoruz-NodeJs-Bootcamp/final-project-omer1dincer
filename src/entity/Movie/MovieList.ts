import { BaseEntity, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, Column, JoinColumn } from 'typeorm';
import { Movie } from './Movie';
import { MovieListComment } from './MovieListComment';
import { User } from '../User';

@Entity()
export class MovieList extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ default: 0 })
	likes: number;

	@OneToOne(() => User, (user) => user.movieList, { onDelete: 'CASCADE' })
	@JoinColumn()
	owner: User;

	@OneToMany(() => Movie, (movie) => movie.movieList, { nullable: true, cascade: true })
	@JoinColumn()
	movies: Movie[];

	@OneToMany(() => MovieListComment, (comment) => comment.movieList, { nullable: true, cascade: true })
	@JoinColumn()
	comments: MovieListComment[];
}
