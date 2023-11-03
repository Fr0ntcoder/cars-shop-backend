import { Controller, Get, Param } from '@nestjs/common'
import { CarService } from './car.service'

@Controller('car')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Get()
  getAll() {
    return this.carService.getAll()
  }

  @Get('by-slug/:slug')
  getBySlug(@Param('slug') slug: string) {
    return this.carService.getBySlug(slug)
  }

  @Get('/:id')
  getById(@Param('id') id: string) {
    return this.carService.getById(id)
  }

  @Get('/:brandSlug/:categorySlug')
  getByBody(
    @Param('brandSlug') brandSlug: string,
    @Param('categorySlug') categorySlug: string,
  ) {
    return this.carService.getByBody(brandSlug, categorySlug)
  }
}
