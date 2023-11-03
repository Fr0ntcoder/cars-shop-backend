import { faker } from '@faker-js/faker'
import {
  BadGatewayException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { User } from '@prisma/client'
import { hash, verify } from 'argon2'
import { AuthDto } from 'src/auth/dto/auth.dto'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async register(dto: AuthDto) {
    const oldUser = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    })

    if (oldUser) {
      throw new BadGatewayException('Пользователь уже существует')
    }

    const newUser = await this.prisma.user.create({
      data: {
        email: dto.email,
        name: dto.name || faker.person.firstName(),
        avatarPath: faker.image.avatar(),
        phone: faker.phone.number(),
        password: await hash(dto.password),
      },
    })

    return this.returnData(newUser)
  }

  async login(dto: AuthDto) {
    const user = await this.validateUser(dto)

    return this.returnData(user)
  }

  async getNewTokens(refreshToken: string) {
    const result = await this.jwt.verifyAsync(refreshToken)

    if (!result) {
      throw new UnauthorizedException('Неверный токен')
    }

    const user = await this.prisma.user.findUnique({
      where: {
        id: result.id,
      },
    })

    return this.returnData(user)
  }
  private async issueTokens(userId: number) {
    const data = { id: userId }

    const accessToken = this.jwt.sign(data, {
      expiresIn: '1h',
    })

    const refreshToken = this.jwt.sign(data, {
      expiresIn: '15d',
    })

    return {
      accessToken,
      refreshToken,
    }
  }

  private returnUserFields(user: User) {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
    }
  }

  private async validateUser(dto: AuthDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    })

    if (!user) {
      throw new NotFoundException('Пользователь не найден')
    }

    const isValid = await verify(user.password, dto.password)

    if (!isValid) {
      throw new UnauthorizedException('Неверный пароль')
    }

    return user
  }

  private async returnData(user: User) {
    const tokens = await this.issueTokens(user.id)

    return {
      user: this.returnUserFields(user),
      ...tokens,
    }
  }
}
