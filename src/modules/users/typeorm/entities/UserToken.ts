import { PrimaryGeneratedColumn, Entity, Column, CreateDateColumn, UpdateDateColumn, Generated } from "typeorm";


@Entity('user_tokens')
class UserToken {
	@PrimaryGeneratedColumn('uuid')
	id: string

	@Column()
	user_id: string

	@Column()
	@Generated('uuid')
	token: string

	@CreateDateColumn()
	created_at: Date

	@UpdateDateColumn()
	updated_at: Date
}

export {UserToken}
