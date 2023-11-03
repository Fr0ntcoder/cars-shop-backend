import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { UserService } from 'src/user/user.service'
import { ReviewController } from './review.controller'
import { ReviewService } from './review.service'

@Module({
  controllers: [ReviewController],
  providers: [ReviewService, PrismaService, UserService],
})
export class ReviewModule {}
