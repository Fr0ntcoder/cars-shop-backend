import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CurrentUser } from 'src/auth/decorators/user.decorator'
import { ReviewDto } from 'src/review/dto/review.dto'
import { ReviewService } from './review.service'

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @UsePipes(new ValidationPipe())
  @Get()
  async getAll() {
    return this.reviewService.getAll()
  }

  @Get(':id')
  async getById(@Param('id') id: number) {
    return this.reviewService.getById(id)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Post('create/:carId')
  async create(
    @CurrentUser('id') id: number,
    @Body() dto: ReviewDto,
    @Param('carId') carId: string,
  ) {
    return this.reviewService.create(id, dto, carId)
  }
}
