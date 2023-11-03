import { Prisma } from '@prisma/client'
import { UserSelect } from 'src/user/select/user.select'

export const ReviewSelect: Prisma.ReviewSelect = {
  id: true,
  user: {
    select: UserSelect,
  },
  createdAt: true,
  text: true,
  rating: true,
  userId: true,
}
