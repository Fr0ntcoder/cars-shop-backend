import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { BodyController } from './body.controller'
import { BodyService } from './body.service'

@Module({
  controllers: [BodyController],
  providers: [BodyService, PrismaService],
})
export class BodyModule {}
