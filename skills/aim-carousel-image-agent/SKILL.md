---
name: aim-carousel-image-agent
description: Create approved carousel slides and use AIM per-slide prompts so each slide is generated separately with one consistent visual style and no collages.
---

# AIM Carousel Image Agent

Use this skill when the user wants carousel images generated one slide at a time.

## Real MCP schema

Use only these parameters:

- `slides`
- `format`
- `style`
- `language`
- `outputNaming`
- `includeTextOnImage`

Use no extra arguments beyond the six fields listed above.

## Required `slides` shape

```json
[
  {
    "slideNumber": 1,
    "text": "точный текст слайда",
    "visual": "описание изображения"
  }
]
```

## Workflow

1. First create and agree the full carousel structure with the user:
   - slide order;
   - exact text for every slide;
   - visual description for every slide;
   - one shared `style` for the whole carousel.
2. Call `aim_create_carousel_image_agent` only after the structure is agreed.
3. Pass the agreed slides as `slides`; each item must describe exactly one slide.
4. Read `perSlidePrompts` from the tool response.
5. Send prompts to the image generator one by one in numeric order.
6. Each image-generation request must contain only one slide prompt.
7. Save every generated slide as a separate image file using the returned `fileName`.
8. Preserve one visual style across all slides.
9. Never create collages, grids, contact sheets, storyboard sheets, or multi-slide previews.
10. Do not stop after the first slide; continue until all slides are generated.
11. If image generation is unavailable, honestly return the separate prompts and do not claim that images were created.

## MCP call

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
    "format": "portrait",
    "style": "единый визуальный стиль всей карусели",
    "language": "ru",
    "outputNaming": "slide_{NN}.png",
    "includeTextOnImage": true
  }
}
```
