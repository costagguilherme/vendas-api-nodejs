import { PrimaryGeneratedColumn, Entity, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Exclude, Expose } from 'class-transformer'

@Entity('users')
class User {
	@PrimaryGeneratedColumn('uuid')
	id: string

	@Column()
	name: string

	@Column()
	email: string

	@Column()
	@Exclude()
	password: string

	@Column()
	avatar: string

	@CreateDateColumn()
	created_at: Date

	@UpdateDateColumn()
	updated_at: Date

	@Expose({name: 'avatar_url'})
	getAvatarUrl(): string | null {
		if (!this.avatar) return null
		return `localhost:8080/files/${this.avatar}`
	}
}

export {User}
