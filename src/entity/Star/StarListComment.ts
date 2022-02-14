import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne } from 'typeorm';
import { StarList } from './StarList';

@Entity()
export class StarListComment extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	comment: string;

	@ManyToOne(() => StarList, (StarList) => StarList.comments, { onDelete: 'CASCADE' })
	starList: StarList;
}
