import { IsString } from 'class-validator'

export class BodyDto {
  @IsString()
  id: string

  @IsString()
  name: string

  @IsString()
  slug: string

  @IsString()
  icon: string
}
