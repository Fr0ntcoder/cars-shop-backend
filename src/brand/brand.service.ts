import { Injectable, NotFoundException } from '@nestjs/common'
import { BrandSelect } from 'src/brand/select/brand.select'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class BrandService {
  constructor(private prisma: PrismaService) {}

  async getAllBrand() {
    return this.prisma.carBrand.findMany({
      select: BrandSelect,
    })
  }

  async getBrandBySlug(slug: string) {
    const cars = this.prisma.carBrand.findUnique({
      where: {
        slug,
      },
      select: BrandSelect,
    })

    if (!cars) {
      throw new NotFoundException('Авто не найдены')
    }

    return cars
  }
}
