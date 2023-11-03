import { Prisma } from '@prisma/client'
import { ArrayMinSize, IsNumber, IsString } from 'class-validator'

export class CarDto implements Prisma.CarUpdateInput {
  @IsString()
  id: string

  @IsString()
  name: string

  @IsString()
  slug: string

  @IsString()
  description: string

  @IsNumber()
  price: number

  @IsString()
  city: string

  @IsNumber()
  volume: number

  @IsNumber()
  power: number

  @IsString()
  box: string

  @IsString()
  engine: string

  @IsString()
  drive: string

  @IsString()
  class: string

  @IsNumber()
  year: number

  @IsString({ each: true })
  @ArrayMinSize(1)
  images: string[]

  @IsString()
  carBrandId: string

  @IsString()
  carCategoryId: string
}
