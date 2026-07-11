/**
 * AIM Instagram Suite — Tool: aim_video_creator
 * Plans, submits, checks, downloads, and deletes video-generation jobs.
 */
import { z } from 'zod';
export declare const VideoCreatorInputSchema: z.ZodEffects<z.ZodObject<{
    action: z.ZodDefault<z.ZodEnum<["prepare", "create", "status", "download", "delete"]>>;
    prompt: z.ZodOptional<z.ZodString>;
    referenceImagePath: z.ZodOptional<z.ZodString>;
    referenceImageUrl: z.ZodOptional<z.ZodString>;
    model: z.ZodDefault<z.ZodEnum<["sora-2", "sora-2-pro"]>>;
    seconds: z.ZodDefault<z.ZodEnum<["4", "8", "12"]>>;
    size: z.ZodDefault<z.ZodEnum<["720x1280", "1280x720", "1024x1792", "1792x1024"]>>;
    videoId: z.ZodOptional<z.ZodString>;
    outputPath: z.ZodOptional<z.ZodString>;
    autoCropReference: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    action: "status" | "prepare" | "create" | "download" | "delete";
    model: "sora-2" | "sora-2-pro";
    seconds: "4" | "8" | "12";
    size: "720x1280" | "1280x720" | "1024x1792" | "1792x1024";
    autoCropReference: boolean;
    prompt?: string | undefined;
    referenceImagePath?: string | undefined;
    referenceImageUrl?: string | undefined;
    videoId?: string | undefined;
    outputPath?: string | undefined;
}, {
    action?: "status" | "prepare" | "create" | "download" | "delete" | undefined;
    prompt?: string | undefined;
    referenceImagePath?: string | undefined;
    referenceImageUrl?: string | undefined;
    model?: "sora-2" | "sora-2-pro" | undefined;
    seconds?: "4" | "8" | "12" | undefined;
    size?: "720x1280" | "1280x720" | "1024x1792" | "1792x1024" | undefined;
    videoId?: string | undefined;
    outputPath?: string | undefined;
    autoCropReference?: boolean | undefined;
}>, {
    action: "status" | "prepare" | "create" | "download" | "delete";
    model: "sora-2" | "sora-2-pro";
    seconds: "4" | "8" | "12";
    size: "720x1280" | "1280x720" | "1024x1792" | "1792x1024";
    autoCropReference: boolean;
    prompt?: string | undefined;
    referenceImagePath?: string | undefined;
    referenceImageUrl?: string | undefined;
    videoId?: string | undefined;
    outputPath?: string | undefined;
}, {
    action?: "status" | "prepare" | "create" | "download" | "delete" | undefined;
    prompt?: string | undefined;
    referenceImagePath?: string | undefined;
    referenceImageUrl?: string | undefined;
    model?: "sora-2" | "sora-2-pro" | undefined;
    seconds?: "4" | "8" | "12" | undefined;
    size?: "720x1280" | "1280x720" | "1024x1792" | "1792x1024" | undefined;
    videoId?: string | undefined;
    outputPath?: string | undefined;
    autoCropReference?: boolean | undefined;
}>;
export type VideoCreatorInput = z.infer<typeof VideoCreatorInputSchema>;
export declare function videoCreator(rawInput: VideoCreatorInput): Promise<string>;
//# sourceMappingURL=videoCreator.d.ts.map