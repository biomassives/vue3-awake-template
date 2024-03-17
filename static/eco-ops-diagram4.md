
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
