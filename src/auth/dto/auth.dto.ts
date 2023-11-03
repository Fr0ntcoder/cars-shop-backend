import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator'

export class AuthDto {
  @IsOptional()
  @IsString({ message: 'Имя должно быть строкой' })
  name?: string

  @IsEmail()
  email: string

  @MinLength(6, { message: 'Пароль должен быть не менее 6 символов' })
  password: string
}
