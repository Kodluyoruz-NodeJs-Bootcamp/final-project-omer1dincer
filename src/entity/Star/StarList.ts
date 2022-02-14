import { BaseEntity, Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Star } from './Star';
import { StarListComment } from './StarListComment';
import { User } from '../User';

@Entity()
export class StarList extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ default: 0 })
	likes: number;

	@OneToOne(() => User, (user) => user.starList , {onDelete: 'CASCADE'})
	@JoinColumn()
	owner: User;

	@OneToMany(() => Star, (star) => star.starList, { nullable: true, cascade: ['remove'] })
	stars: Star[];

	@OneToMany(() => StarListComment, (starListComment) => starListComment.starList, { nullable: true, cascade: true })
	comments: StarListComment[];
}
