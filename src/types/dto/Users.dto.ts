import { User } from '../../entity/User';

export interface UsersDto {
	[key: number]: User;
}
