/**
 * AIM Instagram Suite — Tool: aim_content_team
 * Оркестрирует команду контент-специалистов для подготовки Reels/каруселей/постов.
 */
import { z } from 'zod';
export declare const ContentTeamInputSchema: z.ZodObject<{
    mode: z.ZodDefault<z.ZodEnum<["carousel", "reels", "post", "stories", "content_plan"]>>;
    topic: z.ZodString;
    sergeyContext: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    platform: z.ZodDefault<z.ZodEnum<["instagram", "vk", "both"]>>;
    goal: z.ZodDefault<z.ZodEnum<["shares", "saves", "sales", "subscribers", "reach", "trust"]>>;
    format: z.ZodDefault<z.ZodEnum<["carousel", "reels", "post", "stories", "content_plan"]>>;
}, "strip", z.ZodTypeAny, {
    platform: "instagram" | "vk" | "both";
    topic: string;
    format: "carousel" | "reels" | "post" | "stories" | "content_plan";
    goal: "sales" | "subscribers" | "reach" | "trust" | "shares" | "saves";
    mode: "carousel" | "reels" | "post" | "stories" | "content_plan";
    sergeyContext: string;
}, {
    topic: string;
    platform?: "instagram" | "vk" | "both" | undefined;
    format?: "carousel" | "reels" | "post" | "stories" | "content_plan" | undefined;
    goal?: "sales" | "subscribers" | "reach" | "trust" | "shares" | "saves" | undefined;
    mode?: "carousel" | "reels" | "post" | "stories" | "content_plan" | undefined;
    sergeyContext?: string | undefined;
}>;
export type ContentTeamInput = z.infer<typeof ContentTeamInputSchema>;
export declare function contentTeam(input: ContentTeamInput): string;
//# sourceMappingURL=contentTeam.d.ts.map