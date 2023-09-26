import envSchema from 'env-schema'
import { Type, Static } from '@sinclair/typebox'

const schema = Type.Object({
    DB_HOST: Type.String({
        default: 'localhost'
    }),
    DB_USER: Type.String({
        default: 'root'
    }),
    DB_NAME: Type.String()
})

type Env = Static<typeof schema>

export const config = envSchema<Env>({
    schema,
    dotenv: true
})