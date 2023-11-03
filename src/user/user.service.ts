import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { hash } from 'argon2'
import { PrismaService } from 'src/prisma.service'
import { UserDto } from 'src/user/dto/user.dto'
import { UserSelect } from 'src/user/select/user.select'

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getById(id: number, selectObj: Prisma.UserSelect = {}) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        ...UserSelect,
        favorites: {
          select: {
            id: true,
            name: true,
            price: true,
            images: true,
            slug: true,
            brand: {
              select: {
                slug: true,
              },
            },
            category: {
              select: {
                slug: true,
              },
            },
          },
        },
        reviews: {
          select: {
            id: true,
            text: true,
            rating: true,
            createdAt: true,
            carId: true,
          },
        },
        ...selectObj,
      },
    })

    if (!user) {
      throw new Error('Пользователь не найден')
    }

    return user
  }

  async updateProfle(id: number, dto: UserDto) {
    const isSameUser = await this.prisma.user.findUnique({
      where: { id },
    })

    if (isSameUser && id !== isSameUser.id) {
      throw new BadRequestException('Email занят')
    }

    const user = await this.getById(id)

    return this.prisma.user.update({
      where: { id },
      data: {
        email: dto.email,
        name: dto.name,
        avatarPath: dto.avatarPath,
        phone: dto.phone,
        password: dto.password ? await hash(dto.password) : user.password,
      },
    })
  }

  async toggleFavorites(userId: number, carId: string) {
    const user = await this.getById(userId)

    if (!user) {
      throw new NotFoundException('Пользователь не найден')
    }

    const isExist = user.favorites.some((item) => item.id === carId)

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        favorites: { [isExist ? 'disconnect' : 'connect']: { id: carId } },
      },
    })

    return 'Success'
  }
}
