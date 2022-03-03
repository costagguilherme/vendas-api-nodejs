import Redis, {	Redis as RedisClient} from 'ioredis'
import cacheConfig from '../../config/cache'

export default class RedisCache {
	private client: RedisClient;

	constructor() {
		this.client = new Redis(cacheConfig.config.redis)
	}

	async save(key: string, value: any) {
		await this.client.set(key, JSON.stringify(value))
	}

	//async recover (key: string) {}

	//async invalidate (key: string) {}

}
