---
name: aim-carousel-image-agent
description: Agree a full carousel structure first, call AIM's per-slide image-agent with slides, then generate each slide as a separate image without collages while preserving one visual style.
description: Create complete carousel slide text, call AIM's per-slide image-agent, and generate each slide as a separate image without collages while preserving one visual style.
---

# AIM Carousel Image Agent

Use this skill when the user wants a GPT-like visual Instagram carousel, but each carousel slide must be generated as its own image file instead of one combined collage.

## Non-negotiable rules

1. First create and agree the carousel structure with the user: slide count, role of each slide, exact text, and visual idea.
2. Only after the structure is agreed, call `aim_create_carousel_image_agent` with `slides`.
3. Each `slides[]` item must contain only one slide:
   - `slideNumber`;
   - `text`: exact text for that slide;
   - `visual`: visual description for that slide.
4. Then call the image generator one time per slide, in numeric order.
5. Each image-generation request must contain only the current slide prompt.
6. Create every slide as a separate image file.
7. Never create collages, grids, contact sheets, storyboard sheets, or multi-slide previews.
8. Preserve one consistent visual style across all slides: palette, typography mood, composition, lighting, characters/objects, and detail level.
9. Do not stop after the first slide. Continue until every planned slide has been generated and saved.
10. If an image generator is unavailable, honestly return the separate per-slide prompts and do not claim that images were created.

## Workflow

1. Draft the carousel structure:
   - choose slide count;
   - define slide roles: hook, development slides, final CTA;
   - write exact on-image text for every slide;
   - write a separate visual description for every slide;
   - decide format: `portrait` 1080×1350 or `square` 1080×1080;
   - define one shared visual style.
2. Show the structure to the user and get confirmation or apply requested edits.
3. Call `aim_create_carousel_image_agent` with:
   - `slides`: the agreed array of `{ slideNumber, text, visual }`;
   - `format`: selected format;
   - `style`: the single shared visual style;
   - `language`: `ru` or `en`;
   - `outputNaming`: usually `slide_{NN}.png`;
   - `includeTextOnImage`: usually `true`.
4. Read `perSlidePrompts` from the tool response.
5. For each item in `perSlidePrompts`, in numeric order:
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
6. After the final slide, summarize all generated files and note any slide that needs regeneration.
5. After the final slide, summarize all generated files and note any slide that needs regeneration.

## MCP Tool

Call:

```json
{
  "tool": "aim_create_carousel_image_agent",
  "arguments": {
    "slides": [
      {
        "slideNumber": 1,
        "text": "точный текст слайда",
        "visual": "описание изображения"
      }
    ],
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
- Every image-generation prompt must describe only one slide.
- If a generated result contains multiple slides, reject it and regenerate only the current slide with stronger wording: "single standalone slide only, no grid, no collage".
- Track progress as `slide 01/N`, `slide 02/N`, etc., and continue until `slide N/N` is complete.
- If image generation is not available in the current environment, provide the separate prompts and clearly state that no images were generated.
- If a generated result contains multiple slides, reject it and regenerate only the current slide with stronger wording: "single standalone slide only, no grid, no collage".
- Track progress as `slide 01/N`, `slide 02/N`, etc., and continue until `slide N/N` is complete.
