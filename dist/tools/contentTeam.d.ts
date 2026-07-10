/**
 * AIM Instagram Suite — Tool: aim_content_team
 * Оркестрирует команду контент-специалистов для подготовки Reels/каруселей/постов.
 */
import { z } from 'zod';
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
}>;
export type ContentTeamInput = z.infer<typeof ContentTeamSchema>;
export declare function contentTeam(input: ContentTeamInput): string;
//# sourceMappingURL=contentTeam.d.ts.map