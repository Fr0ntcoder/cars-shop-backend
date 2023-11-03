import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Patch,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CurrentUser } from 'src/auth/decorators/user.decorator'
import { UserDto } from 'src/user/dto/user.dto'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  @Auth()
  async getProfile(@CurrentUser('id') id: number) {
    return this.userService.getById(+id)
  }

  @UsePipes(new ValidationPipe())
  @Put('profile/update')
  @HttpCode(200)
  @Auth()
  async getUpdateProfile(@CurrentUser('id') id: number, @Body() dto: UserDto) {
    return this.userService.updateProfle(id, dto)
  }

  @HttpCode(200)
  @Patch('profile/favorites/:carId')
  @Auth()
  async toggleFavorite(
    @Param('carId') carId: string,
    @CurrentUser('id') id: number,
  ) {
    return this.userService.toggleFavorites(id, carId)
  }
}
