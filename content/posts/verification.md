---
title: How qualifying projects are verified
subtitle: By becoming a verifier of local projects in your community. 
category:
  - About Eco Ops Checkins
  - Local verifier processs
  - Trainer Materials 
  - Decentralized approach
  - Peer networking
author: G Willson
date: 2023-10-30T04:27:56.800Z
featureImage: /uploads/offering_witness_to_a_drought.webp
---

verification is a simple process of providing a review of where a project is at relative to pre-defined 
milestones.   

Report Format 1

| Activity     | Description                                          | Type   | Default           |
| -------- | ---------------------------------------------------- | ------ | ----------------- |
| Soil Conservation   | how many resources to displayed per row              | Number | 3                 |
| Compost Maintenance   | total number of resources to display                 | Number | all (lazy loaded) |
| category | for posts filters posts only in supplied category(s) | Array  | \[]               |
| resource | the resource to be retrieved and displayed           | String | Required          |

There are 2 simple wrappers built around the `ResourceGrid` for easily displaying a categories grid or a posts grid, easily enough they are `CategoriesGrid` and `PostsGrid`.

## Goal Setting with project participants
```
<--! All posts in grid with 3 per row lazy loaded until no more-->
<posts-grid />

<--! 3 posts in grid in single row -->
<posts-grid :number="3" />

<--! 3 posts in grid in single row in category-1 (exactly how related posts at end of single post is accomplished) -->
<posts-grid :number="3" :category="['category-1']" />

<--! All categories in grid with 3 per row lazy loaded until no more-->
<categories-grid />

<--! etc -->
```
