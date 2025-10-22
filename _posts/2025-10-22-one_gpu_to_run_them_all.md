---
layout: post
---

finally, after months of experimentation, we successfully migrated our entire multi-model diffusion serving infrastructure from baseten to runpod — reducing gpu inference costs by over 90% while increasing flexibility and throughput.

instead of running a single model per gpu pod, we now keep multiple models loaded in ram (on cpu memory) and dynamically swap them to gpu only when needed. that near-instant switching between models help us serve all our models to our clients without relying on a costly multi-gpu infrastructure. 

using accelerate’s `infer_auto_device_map` and `dispatch_model`, we finely control how model parts (unet, vae, text encoders) are placed across memory.

```code
    pipe.unet = dispatch_model(
        pipe.unet,
        device_map=infer_auto_device_map(pipe.unet, max_memory={0: "24GiB"})
    ) 
```

this ensures that each component fits perfectly into available gpu vram — no more out-of-memory errors, even when juggling multiple models simultaneously.

yeah it's a small step but for serial a procrastinator like me it's ok. we serve run 9 models into a single gpu and the ting is fast and cost effective.
