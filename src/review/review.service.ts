import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { ReviewDto } from 'src/review/dto/review.dto'
import { ReviewSelect } from 'src/review/select/review.select'

@Injectable()
export class ReviewService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    return this.prisma.review.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      select: ReviewSelect,
    })
  }

  async getById(id: number) {
    return this.prisma.review.findUnique({
      where: {
        id,
      },
    })
  }
  async create(userId: number, dto: ReviewDto, carId: string) {
    const result = await this.prisma.review.create({
      data: {
        ...dto,
        car: {
          connect: {
            id: carId,
          },
        },
        user: {
          connect: {
            id: userId,
          },
        },
      },
    })

    const user = await this.prisma.user.findUnique({
      where: {
        id: result.userId,
      },
      select: {
        name: true,
        email: true,
        avatarPath: true,
      },
    })

    return {
      ...result,
      user,
    }
  }
}
