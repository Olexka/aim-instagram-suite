---
name: aim-carousel-image-agent
description: Create complete carousel slide text, call AIM's per-slide image-agent, and generate each slide as a separate image without collages while preserving one visual style.
---

# AIM Carousel Image Agent

Use this skill when the user wants a GPT-like visual Instagram carousel, but each carousel slide must be generated as its own image file instead of one combined collage.

## Non-negotiable rules

1. Create the carousel structure and exact text for every slide before image generation.
2. Call the MCP tool `aim_create_carousel_image_agent` with the complete material.
3. Send prompts to the image generator strictly one at a time.
4. Create every slide as a separate image.
5. Never create collages, grids, contact sheets, storyboard sheets, or multi-slide previews.
6. Preserve one consistent visual style across all slides: palette, typography mood, composition, lighting, characters/objects, and detail level.
7. Do not stop after the first slide. Continue until every planned slide has been generated and saved.

## Workflow

1. Build the carousel plan:
   - choose slide count;
   - define slide roles: hook, development slides, final CTA;
   - write exact on-image text for every slide;
   - decide format: `portrait` 1080×1350 or `square` 1080×1080;
   - define a single visual style.
2. Call `aim_create_carousel_image_agent` with:
   - `material`: the complete slide-by-slide text and visual brief;
   - `slideCount`: exact number of slides;
   - `format`: selected format;
   - `style`: the single visual style;
   - `language`: `ru` or `en`;
   - `outputNaming`: usually `slide_{NN}.png`;
   - `includeTextOnImage`: usually `true`.
3. Read `perSlidePrompts` from the tool response.
4. For each item in `perSlidePrompts`, in numeric order:
   - submit only that slide's `promptTemplate` to the image generator;
   - include the negative prompt if the generator supports it;
   - save the result using that slide's `fileName`;
   - verify the result is one standalone slide, not a collage;
   - then move to the next slide.
5. After the final slide, summarize all generated files and note any slide that needs regeneration.

## MCP Tool

Call:

```json
{
  "tool": "aim_create_carousel_image_agent",
  "arguments": {
    "material": "Complete slide-by-slide carousel text and visual brief",
    "slideCount": 7,
    "format": "portrait",
    "style": "premium GPT-like editorial visual system",
    "language": "ru",
    "outputNaming": "slide_{NN}.png",
    "includeTextOnImage": true
  }
}
```

## Image generation discipline

- Never paste all slide prompts into a single image-generation request.
- Never ask for "all slides in one image".
- If a generated result contains multiple slides, reject it and regenerate only the current slide with stronger wording: "single standalone slide only, no grid, no collage".
- Track progress as `slide 01/N`, `slide 02/N`, etc., and continue until `slide N/N` is complete.
