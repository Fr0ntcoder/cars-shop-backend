import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { UserModule } from './user/user.module';
import { CarModule } from './car/car.module';
import { BrandModule } from './brand/brand.module';
import { BodyModule } from './body/body.module';
import { ReviewModule } from './review/review.module';

@Module({
  imports: [AuthModule, UserModule, CarModule, BrandModule, BodyModule, ReviewModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
