import {Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, UpdateDateColumn} from "typeorm"
import {OrdersProducts} from '../../../orders/typeorm/entities/OrdersProducts'


@Entity('products') // tabela de refência
class Product {

	@PrimaryColumn('uuid')
	id: string

	@Column()
	name: string

	@Column('decimal')
	price: number

	@OneToMany(() => OrdersProducts, order_products => order_products.product)
	order_products: OrdersProducts[]

	@Column('int')
	quantity: number

	@CreateDateColumn()
	created_at: Date

	@UpdateDateColumn()
	updated_at: Date

}

export default Product
