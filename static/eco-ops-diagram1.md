flowchart TD
        A[Volunteers] --> |Register| B[System]
        B --> |Select Mapping & Waste Management Tasks| C[Tasks]
        C --> |Submit Mapping Data & Waste Reports| D[Verification Process]
        D --> |Approve| E[Rewards System]
        E --> |Claim Rewards| A
        D --> |Reject| C
        E --> |Generate Reports| F[Admins]
        C --> |Track Progress| G[Community Dashboard]
        G --> |View Mapping & Waste Management Tasks| H[Public Users]
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
        C --> |Mapping for Waste Collection Points| R[Mapping Platform]
        R --> |Analyze Waste Data| S[Waste Management System]
        S --> |Optimize Collection Routes| T[Logistics]
        S --> |Waste Segregation Strategies| U[Recycling Centers]
        T --> |Implement Improved Routes| V[Collection Teams]
        U --> |Recycling & Upcycling Initiatives| W[Environmental Impact]
        W --> |Report Impact| F
        R --> |Community Engagement in Mapping| X[Local Communities]
        X --> |Submit Local Waste Data| R
        S --> |Public Education & Awareness| Y[Public Users]
    
        class L bigBox;
        style L fill:#f9f,stroke:#333,stroke-width:4px
