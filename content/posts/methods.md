---
title: Milestones & goal setting
subtitle: Easily Display Grid of your Eco Ops Checkin data on this site
category:
  - About Eco Ops Checkins
  - Local verifier processs
  - Trainer Materials 
  - Decentralized approach
author: G Willson
date: 2023-11-02T04:27:56.800Z
featureImage: /uploads/ecocity_wgpIzRUDczoN1bK--6--ykc5b.png
---
## Eco Ops System Structure - March 16 2024

- project workflow from volunteer registration, task selection, project completion and rewards. 

  The second chart focuses specifically on , and how these tasks fit into the broader eco project check-ins.


#  Chart 1: General volunteer activities, project selection, and the rewards system

general process for all volunteers and projects, including training, review, and reporting mechanisms

flowchart TD
    A[Volunteers] -->|Register/Log In| B[System]
    B --> |Select Tasks/Projects| C[Tasks and Projects]
    C --> |Submit Work| D[Verification Process]
    D --> |Approve| E[Rewards System]
    E --> |Claim Rewards| A
    D --> |Reject| C
    E --> |Monitor & Report| F[Admins]
    C --> |Report Progress| G[Community Dashboard]
    G --> |View Tasks and Progress| H[Public Users]
    I[Reviewers] -->|Review & Approve Projects| J[EcoCity Projects Portal]
    C -->|Submit for Review| I
    K[Trainings] -->|Mandatory for Volunteers| C
    K -->|Training for Reviewers| I
    L[Check-ins] -->|Earn through Check-ins| M[Worldbridger One NFT Aftermarket Portal]
    A -->|Perform Check-ins| L
    E --> |Access to NFT Rewards| L
    L -->|Sell or Trade NFTs| M
    J -->|Showcase Approved Projects| H
    K -->|Training for Farmers| N[Farmers]
    K -->|Training for School Groups| O[School Groups]
    K -->|Training for Recycling Centers| P[Recycling and Upcycling Centers]
    J -->|Buy Biodiversity Credits| Q[Biodiversity Credits Market]
    R[Local Community Engagement] -->|Gather Data| S[Digital Mapping Platform]
    S -->|Analyze & Report| T[Environmental Impact Assessment]
    T -->|Inform Policy & Action| U[Local Authorities]
    S -->|Community Feedback| V[Public Users]
    V -->|Suggest Improvements| S
    R -->|Participate in Projects| C
    S -->|Visualize Project Impact| G

    class L bigBox;
    style L fill:#f9f,stroke:#333,stroke-width:4px


# Chart 2: Eco Mapping and Environmental Monitoring

Eco mapping and environmental monitoring tasks, detailing the process for submitting data on trash burn areas, cyanobacteria, and anaerobic conditions

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

