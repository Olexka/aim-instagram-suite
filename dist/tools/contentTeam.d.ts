/**
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