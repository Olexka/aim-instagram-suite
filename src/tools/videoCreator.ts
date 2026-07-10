/**
 * AIM Instagram Suite — Tool: aim_video_creator
 * Plans, submits, checks, downloads, and deletes video-generation jobs.
 */

import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';
import FormData from 'form-data';
import sharp from 'sharp';
import { z } from 'zod';

const ACTIONS = ['prepare', 'create', 'status', 'download', 'delete'] as const;
const MODELS = ['sora-2', 'sora-2-pro'] as const;
const SECONDS = ['4', '8', '12'] as const;
const SIZES = ['720x1280', '1280x720', '1024x1792', '1792x1024'] as const;

export const VideoCreatorInputSchema = z.object({
  action: z.enum(ACTIONS).default('prepare'),
  prompt: z.string().max(32000).optional().describe('Final production prompt describing subject, action, camera, setting, light, timing, dialogue, and audio'),
  referenceImagePath: z.string().optional().describe('Absolute local path to a JPEG, PNG, or WebP reference image'),
  referenceImageUrl: z.string().url().optional().describe('HTTPS URL to a JPEG, PNG, or WebP reference image'),
  model: z.enum(MODELS).default('sora-2'),
  seconds: z.enum(SECONDS).default('8'),
  size: z.enum(SIZES).default('720x1280'),
  videoId: z.string().optional().describe('Video job ID for status, download, or delete'),
  outputPath: z.string().optional().describe('Absolute .mp4 output path for download'),
  autoCropReference: z.boolean().default(true).describe('Resize and center-crop the reference image to the requested video size'),
}).superRefine((value, ctx) => {
  if ((value.action === 'prepare' || value.action === 'create') && !value.prompt?.trim()) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['prompt'], message: 'prompt is required for prepare/create' });
  }
  if (value.referenceImagePath && value.referenceImageUrl) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['referenceImagePath'], message: 'Use either referenceImagePath or referenceImageUrl, not both' });
  }
  if (['status', 'download', 'delete'].includes(value.action) && !value.videoId) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['videoId'], message: 'videoId is required for this action' });
  }
  if (value.action === 'download' && !value.outputPath) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['outputPath'], message: 'outputPath is required for download' });
  }
});

export type VideoCreatorInput = z.infer<typeof VideoCreatorInputSchema>;

const DEPRECATION = 'OpenAI Videos API and Sora 2 models are scheduled to shut down on 2026-09-24. Keep the workflow provider-neutral.';

function apiBase(): string {
  return (process.env.OPENAI_API_BASE_URL || 'https://api.openai.com/v1').replace(/\/$/, '');
}

function authHeaders(): Record<string, string> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error('OPENAI_API_KEY is not configured for the AIM MCP server');
  }
  return { Authorization: `Bearer ${apiKey}` };
}

async function parseApiResponse(response: any): Promise<any> {
  const text = await response.text();
  let body: any;
  try { body = text ? JSON.parse(text) : {}; } catch { body = { raw: text }; }
  if (!response.ok) {
    const message = body?.error?.message || body?.message || `HTTP ${response.status}`;
    throw new Error(`Video API error: ${message}`);
  }
  return body;
}

async function loadReference(input: VideoCreatorInput): Promise<{ buffer: Buffer; source: string } | null> {
  let sourceBuffer: Buffer | null = null;
  let source = '';

  if (input.referenceImagePath) {
    const absolute = path.resolve(input.referenceImagePath);
    if (!fs.existsSync(absolute)) throw new Error(`Reference image not found: ${absolute}`);
    sourceBuffer = fs.readFileSync(absolute);
    source = absolute;
  } else if (input.referenceImageUrl) {
    const response = await fetch(input.referenceImageUrl);
    if (!response.ok) throw new Error(`Could not download reference image: HTTP ${response.status}`);
    const contentLength = Number(response.headers.get('content-length') || '0');
    if (contentLength > 20 * 1024 * 1024) throw new Error('Reference image exceeds the 20 MB API limit');
    sourceBuffer = await response.buffer();
    source = input.referenceImageUrl;
  }

  if (!sourceBuffer) return null;
  if (sourceBuffer.length > 20 * 1024 * 1024) throw new Error('Reference image exceeds the 20 MB API limit');

  const [width, height] = input.size.split('x').map(Number);
  const pipeline = sharp(sourceBuffer).rotate();
  const buffer = input.autoCropReference
    ? await pipeline.resize(width, height, { fit: 'cover', position: 'centre' }).png().toBuffer()
    : await pipeline.png().toBuffer();

  const metadata = await sharp(buffer).metadata();
  if (metadata.width !== width || metadata.height !== height) {
    throw new Error(`Reference image must match ${input.size}; enable autoCropReference to resize it`);
  }
  if (buffer.length > 20 * 1024 * 1024) throw new Error('Prepared reference image exceeds the 20 MB API limit');

  return { buffer, source };
}

export async function videoCreator(rawInput: VideoCreatorInput): Promise<string> {
  const input = VideoCreatorInputSchema.parse(rawInput);

  if (input.action === 'prepare') {
    return JSON.stringify({
      tool: 'aim_video_creator',
      action: 'prepare',
      ready: true,
      prompt: input.prompt,
      reference: input.referenceImagePath || input.referenceImageUrl || null,
      model: input.model,
      seconds: input.seconds,
      size: input.size,
      productionChecklist: [
        'One clear subject and one primary action',
        'Explicit camera movement and framing',
        'Lighting, setting, pace, and visual style',
        'Short natural dialogue/audio instructions when needed',
        'For image-to-video: describe only what changes after the reference first frame',
      ],
      nextStep: 'After approval, call aim_video_creator again with action=create and the same parameters.',
      deprecationNotice: DEPRECATION,
    }, null, 2);
  }

  if (input.action === 'create') {
    const form = new FormData();
    form.append('model', input.model);
    form.append('prompt', input.prompt!.trim());
    form.append('seconds', input.seconds);
    form.append('size', input.size);

    const reference = await loadReference(input);
    if (reference) {
      form.append('input_reference', reference.buffer, { filename: 'reference.png', contentType: 'image/png' });
    }

    const response = await fetch(`${apiBase()}/videos`, {
      method: 'POST',
      headers: { ...authHeaders(), ...form.getHeaders() },
      body: form as any,
    });
    const job = await parseApiResponse(response);

    return JSON.stringify({
      tool: 'aim_video_creator',
      action: 'create',
      job,
      referencePreparedFrom: reference?.source || null,
      nextStep: `Poll with action=status and videoId=${job.id}. When status is completed, call action=download.`,
      deprecationNotice: DEPRECATION,
    }, null, 2);
  }

  if (input.action === 'status') {
    const response = await fetch(`${apiBase()}/videos/${encodeURIComponent(input.videoId!)}`, {
      headers: authHeaders(),
    });
    const job = await parseApiResponse(response);
    return JSON.stringify({
      tool: 'aim_video_creator',
      action: 'status',
      job,
      nextStep: job.status === 'completed'
        ? 'Call action=download with videoId and an absolute outputPath ending in .mp4.'
        : job.status === 'failed'
          ? 'Review job.error, revise the prompt/reference, and submit a new create action.'
          : 'Poll status again later.',
      deprecationNotice: DEPRECATION,
    }, null, 2);
  }

  if (input.action === 'download') {
    const outputPath = path.resolve(input.outputPath!);
    if (path.extname(outputPath).toLowerCase() !== '.mp4') throw new Error('outputPath must end in .mp4');

    const response = await fetch(`${apiBase()}/videos/${encodeURIComponent(input.videoId!)}/content`, {
      headers: authHeaders(),
    });
    if (!response.ok) await parseApiResponse(response);
    const buffer = await response.buffer();
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, buffer);

    return JSON.stringify({
      tool: 'aim_video_creator',
      action: 'download',
      videoId: input.videoId,
      outputPath,
      bytes: buffer.length,
      deprecationNotice: DEPRECATION,
    }, null, 2);
  }

  const response = await fetch(`${apiBase()}/videos/${encodeURIComponent(input.videoId!)}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
  const result = await parseApiResponse(response);
  return JSON.stringify({
    tool: 'aim_video_creator',
    action: 'delete',
    result,
    deprecationNotice: DEPRECATION,
  }, null, 2);
}
