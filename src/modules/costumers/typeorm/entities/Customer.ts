import { PrimaryGeneratedColumn, Entity, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";


@Entity('customers')
class Customer {
	@PrimaryGeneratedColumn('uuid')
	id: string

	@Column()
	name: string

	@Column()
	email: string
	
	@CreateDateColumn()
	created_at: Date

	@UpdateDateColumn()
	updated_at: Date
}

export {Customer}
