---
name: aim-video-creator
description: Plan and create short videos from a written description or reference photo, animate still images, monitor rendering, and download the finished MP4 through the AIM video MCP tool.
---

# AIM Video Creator

Use this skill when the user wants a short generated video, an animated photograph, a product clip, a visual Reels scene, or an image-to-video transformation.

## Capabilities

- Text to video.
- Reference photo to video.
- Product image animation.
- Reels shot generation.
- Render status checks and MP4 download.

## Workflow

1. Clarify only missing essentials:
   - subject and desired action;
   - text-to-video or image-to-video;
   - vertical or horizontal format;
   - 4, 8, or 12 seconds;
   - realistic, editorial, cinematic, mystical, product, or another visual style;
   - whether dialogue or ambient audio is needed.
2. Build one production prompt containing:
   - subject and setting;
   - action over time;
   - camera framing and movement;
   - lighting, palette, pace, and realism;
   - concise dialogue/audio instructions when requested;
   - constraints such as preserving wardrobe, product shape, face, or background.
3. For a reference photo, use the available local path as `referenceImagePath`. Explain that the image anchors the first frame, but exact identity and facial consistency cannot be guaranteed.
4. Call `aim_video_creator` with `action=prepare`. Show the production prompt and generation settings before a paid render unless the user explicitly says to generate immediately.
5. After approval, call `action=create`.
6. Poll `action=status` using the returned `videoId`. Do not invent completion.
7. When completed, call `action=download` with an absolute `.mp4` path.
8. Return the real saved file. If generation is unavailable or fails, return the prompt and exact error without claiming a video exists.

## Tool schema

Actions:

- `prepare`: validate and preview a production prompt without API cost.
- `create`: submit a paid video-generation job.
- `status`: retrieve progress.
- `download`: save completed MP4 content.
- `delete`: remove a video job.

Common arguments:

```json
{
  "action": "prepare",
  "prompt": "A detailed production prompt",
  "referenceImagePath": "C:/absolute/path/reference.jpg",
  "model": "sora-2",
  "seconds": "8",
  "size": "720x1280",
  "outputPath": "C:/absolute/path/aim-video.mp4",
  "autoCropReference": true
}
```

Use `720x1280` or `1024x1792` for vertical video and `1280x720` or `1792x1024` for horizontal video.

## Image-to-video prompting

Treat the reference image as the first frame. Describe what changes next rather than redescribing the entire image. Prefer subtle, physically plausible motion:

- breathing, blinking, hair or fabric moving;
- slow dolly-in, pan, orbit, or handheld drift;
- candlelight, smoke, water, leaves, dust, or reflections;
- one clear action instead of several simultaneous transformations.

## Guardrails

- Use only photos the user owns or is authorized to animate.
- Do not present generated footage as authentic evidence of a real event.
- Preserve the user's requested identity and product details where possible, but never promise perfect fidelity.
- Keep `OPENAI_API_KEY` in the MCP environment. Never place it in prompts, source files, or GitHub.
- OpenAI's Videos API/Sora 2 is scheduled to shut down on 2026-09-24. Keep prompts and workflow provider-neutral so the backend can be replaced.
