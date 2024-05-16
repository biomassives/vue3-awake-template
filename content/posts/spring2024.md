---
title: Summer 2024 update
subtitle: Eco Ops - Green hospital deep dive
category:
  - About Eco Ops Checkins
  - Local verifier processs
  - Trainer Materials 
  - Decentralized approach
author: G Willson
date: 2024-05-02T04:27:56.800Z
featureImage: /uploads/ecocity_wgpIzRUDczoN1bK--6--ykc5b.png
---
## Green hopital conference - March 16 2024

-   
flowchart TD
    A[Volunteers] --> |Register| B[System]
    B --> |Select Eco Project Tasks| C[Tasks]
    C --> |Eco Mapping & Environmental Monitoring| D
    D --> |Submit Data| E[Verification Process]
    E --> |Approve| F[Rewards System]
    F --> |Claim Rewards| A
    E --> |Reject| D
    F --> |Generate Reports| G[Admins]
    D --> |Track Progress| H[Community Dashboard]
    H --> |View Eco Projects| I[Public Users]
    J[Reviewers] -->|Review & Approve Projects| K[EcoCity Projects Portal]
    D -->|Submit for Review| J
    L[Trainings] -->|Mandatory for Volunteers| D
    L -->|Training for Reviewers| J
    M[Check-ins] -->|Earn through Check-ins| N[Worldbridger One NFT Aftermarket Portal]
    A -->|Perform Check-ins| M
    F --> |Access to NFT Rewards| M
    M -->|Sell or Trade NFTs| N
    K -->|Showcase Approved Projects| I
    L -->|Training for Specific Tasks| O[Specialized Training]
    K -->|Buy Biodiversity Credits| P[Biodiversity Credits Market]
    D --> D1[Trash Burn Area Mapping]
    D --> D2[Cyanobacteria Monitoring]
    D --> D3[Anaerobic Condition Analysis]
    D1 --> |Data Collection| E
    D2 --> |Data Collection| E
    D3 --> |Data Collection| E
    O --> |Mapping Techniques| D1
    O --> |Water Quality Testing| D2
    O --> |Soil Quality Testing| D3

    class M bigBox;
    style M fill:#f9f,stroke:#333,stroke-width:4px






# Techniques
The `Metadata from checkins annd verification reports powers Eco Ops so that independent review is simple and transparent.   

| Method     | Description                                          | Type   | Default           |
| -------- | ---------------------------------------------------- | ------ | ----------------- |
| Carbon Farming   | Implimenting  zero tillage systems, cover crop seed saving, seed distribution, educating farmerrs, veifying improvements            | Number | 3                 |
| Tree and Garden Care   | Planning sites, managing others, watering and plant care, soil mix preparation  planning                 | Number | all (lazy loaded) |
| Waste Cleanup | mapping sites, collecting organic compost, educating, creating signage, participating activities | Array  | \[]               |
| Circular Economy Development | the resources available in your community are assessed and reviewed for use in making new products           | String | Required          |

