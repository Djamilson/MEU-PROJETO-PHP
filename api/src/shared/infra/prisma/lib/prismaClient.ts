// import { PrismaClient } from '@prisma/client';
import { PrismaClient as PrismaClientMysql } from '../../../../../prisma/generated/mysql'
// import { PrismaClient as PrismaClientMysql } from '../../../../../prisma/generated/mysql';
// import { PrismaClient as PrismaClientPostgres } from '../../../../../prisma/generated/postgres'

const postgres = new PrismaClientMysql({
  log: ['query', 'info', 'warn', 'error'],
})



/* const mysql = new PrismaClientMysql({
  log: ['query', 'info', 'warn', 'error'],
}); */

export { postgres }
