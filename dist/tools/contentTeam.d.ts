/**
 * AIM Instagram Suite — Tool: aim_content_team
 * Оркестрирует команду контент-специалистов для подготовки Reels/каруселей/постов.
 */
import { z } from 'zod';
export declare const ContentTeamInputSchema: z.ZodObject<{
    mode: z.ZodDefault<z.ZodEnum<["carousel", "reels", "post", "stories", "content_plan"]>>;
    topic: z.ZodString;
    sergeyContext: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    platform: z.ZodDefault<z.ZodEnum<["instagram", "telegram", "both"]>>;
    goal: z.ZodDefault<z.ZodEnum<["shares", "saves", "sales", "subscribers", "reach", "trust"]>>;
    format: z.ZodDefault<z.ZodEnum<["carousel", "reels", "post", "stories", "content_plan"]>>;
}, "strip", z.ZodTypeAny, {
    platform: "instagram" | "telegram" | "both";
    topic: string;
    format: "carousel" | "reels" | "post" | "stories" | "content_plan";
    goal: "sales" | "subscribers" | "reach" | "trust" | "shares" | "saves";
    mode: "carousel" | "reels" | "post" | "stories" | "content_plan";
    sergeyContext: string;
}, {
    topic: string;
    platform?: "instagram" | "telegram" | "both" | undefined;
    format?: "carousel" | "reels" | "post" | "stories" | "content_plan" | undefined;
    goal?: "sales" | "subscribers" | "reach" | "trust" | "shares" | "saves" | undefined;
    mode?: "carousel" | "reels" | "post" | "stories" | "content_plan" | undefined;
    sergeyContext?: string | undefined;
}>;
export type ContentTeamInput = z.infer<typeof ContentTeamInputSchema>;
export declare const ContentTeamSchema: z.ZodObject<{
    brief: z.ZodString;
    format: z.ZodDefault<z.ZodEnum<["carousel", "reels", "post", "stories", "content_plan"]>>;
    goal: z.ZodDefault<z.ZodEnum<["reach", "engagement", "sales", "subscribers", "trust"]>>;
    audience: z.ZodOptional<z.ZodString>;
    toneOfVoice: z.ZodDefault<z.ZodEnum<["educational", "motivational", "professional", "casual", "provocative"]>>;
    language: z.ZodDefault<z.ZodEnum<["ru", "en"]>>;
    deliverables: z.ZodOptional<z.ZodArray<z.ZodEnum<["strategy", "hooks", "script", "carousel_structure", "caption", "cta", "visual_direction"]>, "many">>;
}, "strip", z.ZodTypeAny, {
    language: "ru" | "en";
    toneOfVoice: "educational" | "motivational" | "professional" | "casual" | "provocative";
    format: "carousel" | "reels" | "post" | "stories" | "content_plan";
    goal: "sales" | "subscribers" | "reach" | "engagement" | "trust";
    brief: string;
    audience?: string | undefined;
    deliverables?: ("cta" | "strategy" | "hooks" | "script" | "carousel_structure" | "caption" | "visual_direction")[] | undefined;
}, {
    brief: string;
    language?: "ru" | "en" | undefined;
    toneOfVoice?: "educational" | "motivational" | "professional" | "casual" | "provocative" | undefined;
    format?: "carousel" | "reels" | "post" | "stories" | "content_plan" | undefined;
    goal?: "sales" | "subscribers" | "reach" | "engagement" | "trust" | undefined;
    audience?: string | undefined;
    deliverables?: ("cta" | "strategy" | "hooks" | "script" | "carousel_structure" | "caption" | "visual_direction")[] | undefined;
 * AIM Content Team — Tool: aim_content_team
 * Multi-agent prompt pack for Sergey's Instagram/VK content production.
 */
import { z } from 'zod';
export declare const ContentTeamSchema: z.ZodObject<{
    mode: z.ZodDefault<z.ZodEnum<["setup", "post", "carousel", "reels", "vk", "audit", "content"]>>;
    topic: z.ZodOptional<z.ZodString>;
    sergeyContext: z.ZodOptional<z.ZodString>;
    platform: z.ZodDefault<z.ZodEnum<["instagram", "vk", "both"]>>;
    goal: z.ZodDefault<z.ZodEnum<["subscribers", "reach", "saves", "shares", "trust", "sales"]>>;
    format: z.ZodDefault<z.ZodEnum<["post", "carousel", "reels", "vk_post", "all"]>>;
}, "strip", z.ZodTypeAny, {
    platform: "vk" | "instagram" | "both";
    format: "post" | "carousel" | "reels" | "vk_post" | "all";
    goal: "sales" | "subscribers" | "reach" | "trust" | "saves" | "shares";
    mode: "content" | "setup" | "post" | "carousel" | "reels" | "vk" | "audit";
    topic?: string | undefined;
    sergeyContext?: string | undefined;
}, {
    platform?: "vk" | "instagram" | "both" | undefined;
    topic?: string | undefined;
    format?: "post" | "carousel" | "reels" | "vk_post" | "all" | undefined;
    goal?: "sales" | "subscribers" | "reach" | "trust" | "saves" | "shares" | undefined;
    mode?: "content" | "setup" | "post" | "carousel" | "reels" | "vk" | "audit" | undefined;
    sergeyContext?: string | undefined;
}>;
export type ContentTeamInput = z.infer<typeof ContentTeamSchema>;
export declare function contentTeam(input: ContentTeamInput): string;
//# sourceMappingURL=contentTeam.d.ts.map