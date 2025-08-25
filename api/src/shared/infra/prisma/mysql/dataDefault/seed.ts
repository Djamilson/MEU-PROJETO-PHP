import { postgres } from '@shared/infra/prisma/lib/prismaClient'

import {
  groups,
  person,
  user,
usersGroups
} from '@shared/infra/prisma/mysql/dataDefault'

const seed = async () => {
  try {


    const meGroups = postgres.group.createMany({
      data: groups,
    })

    const mePersons = postgres.person.create({
      data: person,
    })


    const result = await Promise.all([
      meGroups,
      mePersons,
    ])

    await postgres.$transaction([
      postgres.user.create({
        data: user,
      }),

    ])

    await Promise.all([

      postgres.userGroup.createMany({
        data: usersGroups,
      }),

    ])

    console.log(result)
    console.log('Sucesso initial data!!')
  } catch (e) {
    console.error(e)
    process.exit(1)
  } finally {
    await postgres.$disconnect()
  }
}

seed()
