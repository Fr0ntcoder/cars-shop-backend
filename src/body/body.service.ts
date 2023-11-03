import { Injectable } from '@nestjs/common'
import { BodySelect } from 'src/body/select/body.select'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class BodyService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    return this.prisma.carCategory.findMany({
      select: BodySelect,
    })
  }

  async getBySlug(slug: string) {
    return this.prisma.carCategory.findUnique({
      where: {
        slug,
      },
      select: BodySelect,
    })
  }
}
