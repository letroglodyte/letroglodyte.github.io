---
layout: post
title: robot or not robot?
---

it's been a while. i've taken a good amount of time since last post but it was worth it. i've been back to school for a few weeks in december to take a crash course on ml and ai in general.
the goal was to make my procrastinator ass sit and dedicate myself fully on the topic for hours.
the outcome is good i still feel pretty left out on the math side of things...

anyway, here's the project i made during the course: **detecting ai-generated images using reverse diffusion**. spoiler: ai images are speedrunners.

---

### the hypothesis

there's this cool paper from neurips 2025 (liang et al.) that says: *ai-generated images converge faster during reverse diffusion than real images*.

think about it. diffusion models create images by starting from noise and gradually denoising. if you reverse that process on an ai image, it kinda "remembers" the path. real images? they struggle more because they weren't born that way.

---

### the recipe

1. take an image
2. add noise at different timesteps (50, 150, 300, 500, 800)
3. denoise it with stable diffusion's unet
4. compare the reconstructed image to the original using clip similarity
5. profit (or at least, classify)

here's the core feature extraction loop:

```python
for t in [50, 150, 300, 500, 800]:
    noisy_latent = add_noise(latent, t)
    denoised_latent = denoise_step(noisy_latent, t)
    reconstructed = decode_vae(denoised_latent)

    similarity = cosine_similarity(
        original_clip_embedding,
        get_clip_embedding(reconstructed)
    )
    similarities.append(similarity)
```

we end up with 6 features: the mean similarity + one per timestep.

---

### the data

- **real images**: 2500 from coco 2017 (classic dataset, real photos)
- **ai images**: 2500 generated with stable diffusion xl, flux, gpt-image, etc.

balanced dataset. 50/50. fair fight.

---

### the results

tested a bunch of classifiers. here's the winner:

```
logistic regression:
  accuracy: 79.2%
  auc-roc:  87.5%
  f1-score: 79.4%
```

the mlp (64, 32) was close too with 79.6% accuracy.

not bad for just 6 features!

---

### the juicy part

what i found most interesting is **which timesteps matter**:

| feature   | coefficient |
|-----------|-------------|
| sim_t800  | -2.85       |
| sim_t500  | +1.09       |
| sim_t300  | +1.03       |

that negative coefficient on sim_t800 is wild. it means: low similarity at timestep 800 = probably real. high similarity = probably ai.

in other words, ai images are still vibing at timestep 800 while real images have completely lost the plot.

---

### the convergence curve

this graph says it all:

```
distance from original (1 - similarity)

     |
0.55 |         x---- real images plateau here
     |        /
0.45 |   x---x
     |  /         o---- ai images keep going
0.35 | x         o
     |          o
0.25 |     o--o
     |____________________________
        50  150  300  500  800  timestep
```

between timestep 300 and 500, real images stop reconstructing. ai images? they keep chugging along.

---

### takeaways

- denoising trajectories contain discriminative information
- ai images converge faster because they were literally made by diffusion
- simple features + logistic regression = surprisingly effective
- ~20% error rate means there's room for improvement (maybe add asymmetry detection, texture analysis, etc.)

the full notebook is available if you want to play with it. warning: you'll need a gpu and some patience for the feature extraction (5000 images took a while).

---

*back to learning. see you in the next one.*
