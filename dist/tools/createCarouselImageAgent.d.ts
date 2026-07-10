/**
 * AIM Instagram Suite — Tool: aim_create_carousel_image_agent
 * Создаёт промпт-агента для генерации Instagram-каруселей как отдельных изображений.
 */
import { z } from 'zod';
export declare const CreateCarouselImageAgentSchema: z.ZodObject<{
    material: z.ZodString;
    slideCount: z.ZodDefault<z.ZodNumber>;
    format: z.ZodDefault<z.ZodEnum<["square", "portrait"]>>;
    style: z.ZodOptional<z.ZodString>;
    language: z.ZodDefault<z.ZodEnum<["ru", "en"]>>;
    outputNaming: z.ZodDefault<z.ZodString>;
    includeTextOnImage: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    language: "ru" | "en";
    slideCount: number;
    format: "square" | "portrait";
    material: string;
    outputNaming: string;
    includeTextOnImage: boolean;
    style?: string | undefined;
}, {
    material: string;
    language?: "ru" | "en" | undefined;
    slideCount?: number | undefined;
    format?: "square" | "portrait" | undefined;
    style?: string | undefined;
    outputNaming?: string | undefined;
    includeTextOnImage?: boolean | undefined;
}>;
export type CreateCarouselImageAgentInput = z.infer<typeof CreateCarouselImageAgentSchema>;
export declare function createCarouselImageAgent(input: CreateCarouselImageAgentInput): string;
//# sourceMappingURL=createCarouselImageAgent.d.ts.map