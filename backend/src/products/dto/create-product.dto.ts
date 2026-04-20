export class CreateProductDto {
  name!: string;
  description?: string;
  priceCents!: number;
  imageUrl?: string;
  category!: string;
  durationDays?: number;
  isActive?: boolean;
}
