import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { StarList } from './StarList';

@Entity()
export class Star extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@ManyToOne(() => StarList, (starList) => starList.stars , {onDelete:'CASCADE'})
	starList: StarList;
}
