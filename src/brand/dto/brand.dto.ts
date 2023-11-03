import { IsString } from 'class-validator'

export class BrandDto {
  @IsString()
  id: string

  @IsString()
  name: string

  @IsString()
  slug: string

  @IsString()
  icon: string
}
