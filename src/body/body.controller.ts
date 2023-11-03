import { Controller, Get, Param } from '@nestjs/common'
import { BodyService } from './body.service'

@Controller('body')
export class BodyController {
  constructor(private readonly bodyService: BodyService) {}

  @Get()
  async getAllBrand() {
    return this.bodyService.getAll()
  }

  @Get('/:slug')
  getBodyBySlug(@Param('slug') slug: string) {
    return this.bodyService.getBySlug(slug)
  }
}
