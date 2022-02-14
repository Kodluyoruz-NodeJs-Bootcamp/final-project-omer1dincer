import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn, BaseEntity, OneToOne } from 'typeorm';
import { MovieList } from './Movie/MovieList';
import { StarList } from './Star/StarList';
import * as bcrypt from 'bcryptjs';
import { IUserNavbar } from '../types/interface/IUserNavbar.interface';

@Entity()
export class User extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id: number;

	@Column({ unique: true, nullable: true })
	google_id?: string;

	@Column({ unique: true, nullable: true })
	facebook_id?: string;

	@Column()
	provider: string;

	@Column()
	name: string;

	@Column({ unique: true, nullable: true })
	email: string;

	@Column({ unique: true, nullable: true })
	username!: string;

	@Column({ nullable: true })
	password!: string;

	@OneToOne(() => MovieList, (movieList) => movieList.owner, { onDelete: 'CASCADE' })
	movieList: MovieList;

	@OneToOne(() => StarList, (starList) => starList.owner, { onDelete: 'CASCADE' })
	starList: StarList;

	async hashPassword() {
		this.password = bcrypt.hashSync(this.password, 4);
	}
	async isPasswordValid(enteredPassword: string) {
		return bcrypt.compareSync(enteredPassword, this.password);
	}

	async currentUserDTO(): Promise<IUserNavbar> {
		return {
			id: this.id,
			name: this.name,
			username: this.username
		};
	}
}
