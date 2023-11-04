import envSchema from 'env-schema'
import { Type, Static } from '@sinclair/typebox'

const schema = Type.Object({
    PORT: Type.Number({
        default: 3000
    }),
    HOST: Type.String({
        default: '192.168.18.100'
    })
})

type Env = Static<typeof schema>

export const config = envSchema<Env>({
    schema,
    dotenv: true
})