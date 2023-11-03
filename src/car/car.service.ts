import { Injectable, NotFoundException } from '@nestjs/common'
import { CarSelect } from 'src/car/select/car.select'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class CarService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    return this.prisma.car.findMany({
      select: CarSelect,
    })
  }

  async getBySlug(slug: string) {
    const car = await this.prisma.car.findUnique({
      where: {
        slug,
      },
      select: {
        ...CarSelect,
      },
    })

    if (!car) {
      throw new NotFoundException('Авто не найден')
    }

    return car
  }

  async getById(id: string) {
    const car = await this.prisma.car.findUnique({
      where: {
        id,
      },
      select: {
        ...CarSelect,
      },
    })

    if (!car) {
      throw new NotFoundException('Авто не найден')
    }

    return car
  }

  async getByBody(brandSlug: string, categorySlug: string) {
    const cars = await this.prisma.car.findMany({
      where: {
        brand: {
          slug: brandSlug,
        },
        category: {
          slug: categorySlug,
        },
      },
      select: {
        ...CarSelect,
      },
    })

    if (!cars) {
      throw new NotFoundException('Авто не найден')
    }

    return cars
  }

  /* async create(userId: number, dto: ReviewDto, carId: string) {
    return this.prisma.car.create({
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
  } */
}
