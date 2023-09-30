import envSchema from 'env-schema'
import { Type, Static } from '@sinclair/typebox'

const schema = Type.Object({

})

type Env = Static<typeof schema>

export const config = envSchema<Env>({
    schema,
    dotenv: true
})