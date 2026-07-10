---
name: aim-content-team
description: Use AIM Content Team to turn a brief into content strategy, hooks, scripts, carousel structures, captions, CTAs, and visual direction through the local AIM MCP server.
---

# AIM Content Team

Use this skill when the user asks for content strategy, hooks, Reels scripts, carousel structure, captions, CTA ideas, or a content plan for Instagram/social content.

## Workflow

1. Collect or infer the required brief:
   - topic, product, offer, or source material;
   - target audience;
   - desired format: `carousel`, `reels`, `post`, `stories`, or `content_plan`;
   - goal: `reach`, `engagement`, `sales`, `subscribers`, or `trust`;
   - tone of voice and language.
2. Call the MCP tool `aim_content_team` with the brief and any known parameters.
3. Use the returned team output as the source of truth:
   - strategy from Strategist;
   - hooks from Hook Writer;
   - script or carousel structure from Scriptwriter;
   - visual direction from Visual Director;
   - CTA/save/share/comment mechanics from Conversion Editor.
4. If the result is for a carousel and the user wants images, continue with the `aim-carousel-image-agent` skill.

## MCP Tool

Call:

```json
{
  "tool": "aim_content_team",
  "arguments": {
    "brief": "User brief or source material",
    "format": "carousel",
    "goal": "engagement",
    "audience": "optional audience",
    "toneOfVoice": "educational",
    "language": "ru"
  }
}
```

## Output guidance

- Return ready-to-use copy, not generic advice.
- Keep hooks specific and scroll-stopping.
- Keep CTA aligned with the selected goal.
- For carousel outputs, make the slide structure concrete enough to pass directly into `aim_create_carousel_image_agent`.
