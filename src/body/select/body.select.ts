import { Prisma } from '@prisma/client'

export const BodySelect: Prisma.CarCategorySelect = {
  id: true,
  name: true,
  slug: true,
  icon: true,
  items: true,
}
