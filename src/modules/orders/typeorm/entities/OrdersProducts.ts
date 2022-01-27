import Product from "@modules/products/typeorm/entities/Product";
import { PrimaryGeneratedColumn, Entity, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { Order } from "./Order";


@Entity('orders_products')
class OrdersProducts {
	@PrimaryGeneratedColumn('uuid')
	id: string

	@Column('decimal')
	price: number

	@ManyToOne(() => Order, order => order.order_products)
	@JoinColumn({name: 'order_id'})
	order: Order

	@ManyToOne(() => Product, product => product.order_products)
	@JoinColumn({name: 'product_id'})
	product: Product

	@Column()
	order_id: string

	@Column()
	product_id: string

	@Column('int')
	quantity: number

	@CreateDateColumn()
	created_at: Date

	@UpdateDateColumn()
	updated_at: Date
}

export {OrdersProducts}
