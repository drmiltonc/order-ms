import { Type } from "class-transformer";
import { IsOptional, IsPositive } from "class-validator";

// DTO para la paginación
export class PaginationDto {
    // Límite de resultados por página
    @IsPositive({ message: 'limit debe ser un número positivo' })
    @IsOptional()
    @Type(() => Number)
    page?: number = 1; //page

    // Página actual
    @IsPositive({ message: 'page debe ser un número positivo' })
    @IsOptional()
    @Type(() => Number )
    limit?: number = 10; //limit
}
