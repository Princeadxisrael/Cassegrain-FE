This repo is the user-facing interface for  Cassegrain Supply Chain Management Solution, built on Solana with Ephemeral Rollups (Magic Block ER). This MVP provides a secure, transparent, and efficient way for Manufacturers, Retailers, and Consumers to interact with supply chain data, verify product authenticity, track goods in real-time, and facilitate direct P2P transactions.

This repository contains the Next.js application responsible for all user interactions, dashboards, and data visualization.

## Features (MVP)

**User Authentication:** Secure signup/login for Manufacturers, Retailers, and Consumers.
**Manufacturer/Supplier Dashboard:**
- Profile creation and management.
- Product registration forms (including IPFS uploads for media/certs).
- Dashboard for viewing registered products and logging supply chain events (e.g., manufacture, package, ship).
- Basic directory/listing for connecting with buyers.

**Retailer/Buyer Interface:**
- Directory/search for discovering products and connecting with suppliers.
- Order inquiry and messaging functionality.
- Tracking dashboard for incoming shipments.

**Consumer Product Verification:**
- Intuitive interface for scanning QR/NFC/RFID codes or entering product IDs.
- Detailed, chronological product history display (including on-chain events and off-chain metadata).
- Clear authenticity verification status.

**Solana Wallet Integration:** Seamless connection with Solana wallets (e.g., Phantom, Solflare) for on-chain interactions.

## Tech Stack

- Framework: Next.js (React)
- Styling: Tailwind CSS 
State Management: React Context API, Redux
Blockchain Interaction: Solana Web3.js, Solana Wallet Adapter
API Communication: Axios or native Fetch API
Form Management: React Hook Form or Formik 
QR/Barcode Scanning: React-qr-reader or similar library.

## 🚀 Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

Prerequisites
Node.js (LTS version recommended)
npm or Yarn
A modern web browser (Chrome, Firefox, Edge)
A Solana wallet extension (e.g., Phantom) for testing blockchain interactions.
Installation
Clone the repository:
Bash

1. git clone https://github.com/Cassegrain/cassegrain-frontend.git
cd cassegrain-frontend
2. **Install dependencies:**bash
npm install
# or
yarn install
3. **Configure Environment Variables:** Create a `.env.local` file in the root of the project and add the following:
NEXT_PUBLIC_BACKEND_API_URL=http://localhost:5000/api # Replace with backend URL soon
# Add any other frontend-specific public keys or configurations
4. **Run the development server:**bash
npm run dev
# or
yarn dev
```
The application will be accessible at http://localhost:3000.

💡 Usage
Navigate to http://localhost:3000.
Sign up as a Manufacturer to register products.
Sign up as a Retailer to browse products and interact with suppliers.
Use the consumer interface to simulate scanning a product ID and viewing its history.
📂 Project Structure (High-Level)
cassegrain-frontend/
├── public/                 # Static assets
├── src/
│   ├── app/                # Next.js App Router root
│   │   ├── (auth)/         # Authentication routes (login, signup)
│   │   ├── (dashboard)/    # Manufacturer/Retailer dashboards
│   │   ├── (public)/       # Consumer verification, landing page
│   │   ├── api/            # Next.js API routes (if we would implement specific serverless functions)
│   │   └── layout.tsx
│   ├── components/         # Reusable UI components
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions, API clients
│   ├── styles/             # Global styles
│   └── types/              # TypeScript type definitions
├── .env.local              # Local environment variables
├── next.config.js          # Next.js configuration
├── package.json
└── README.md
🤝 Contributing
Contributions are welcome! Please follow these steps:

Fork the repository.
Create a new branch (git checkout -b feature/your-feature-name).
Make your changes.
Commit your changes (git commit -m 'feat: Add new feature').
Push to the branch (git push origin feature/your-feature-name).
Open a Pull Request.
Please ensure your code adheres to the project's coding standards and includes appropriate tests.

