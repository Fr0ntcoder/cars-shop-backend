import { Controller, Get, Param } from '@nestjs/common'
import { BrandService } from './brand.service'

@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Get()
  async getAllBrand() {
    return this.brandService.getAllBrand()
  }

  @Get('/:slug')
  getBrandBySlug(@Param('slug') slug: string) {
    return this.brandService.getBrandBySlug(slug)
  }
}
