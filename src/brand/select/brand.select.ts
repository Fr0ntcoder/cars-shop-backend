import { Prisma } from '@prisma/client'

export const BrandSelect: Prisma.CarBrandSelect = {
  id: true,
  name: true,
  slug: true,
  icon: true,
  items: true,
}
