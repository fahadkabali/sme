interface Products{
    id: string;
    name: string;
    description: string;
    category: string;
    targetMarket: string;
    owner: User; // Reference to the owning user
    // ... other product properties
}