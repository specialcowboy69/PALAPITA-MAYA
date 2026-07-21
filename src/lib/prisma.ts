import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

const prismaClientSingleton = () => {
  const connectionString = process.env.DATABASE_URL

  if (!connectionString) {
    throw new Error('DATABASE_URL is required to initialize Prisma')
  }

  const adapter = new PrismaPg({ connectionString })
  return new PrismaClient({ adapter })
}

declare const globalThis: {
  prismaGlobal?: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const getPrisma = () => {
  if (!globalThis.prismaGlobal) {
    globalThis.prismaGlobal = prismaClientSingleton()
  }

  return globalThis.prismaGlobal
}

const prisma = new Proxy({} as PrismaClient, {
  get(_target, prop) {
    const client = getPrisma()
    const value = client[prop as keyof PrismaClient]
    return typeof value === 'function' ? value.bind(client) : value
  },
})

export default prisma
