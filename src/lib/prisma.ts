import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => new PrismaClient()

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
