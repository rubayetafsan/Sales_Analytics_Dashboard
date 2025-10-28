# Sales Analytics Dashboard

A modern full-stack data analytics application with real-time sales tracking, interactive visualizations, and AI-powered sentiment analysis for customer feedback.

## Features

- 📊 **Real-time Sales Analytics** - Track revenue, sales count, and average order value with live KPI cards
- 📈 **Interactive Data Visualizations** - Dynamic charts showing revenue trends and top-performing products
- 🎯 **Category-wise Sales Analysis** - Breakdown of sales performance by product categories
- 🤖 **AI Sentiment Analysis** - Analyze customer reviews and feedback using natural language processing
- ✨ **CRUD Operations** - Add, view, and delete sales records with instant updates
- 🔍 **GraphQL API** - Type-safe API with GraphQL Playground for easy testing
- 📚 **API Documentation** - Interactive Swagger UI for REST endpoints
- 🎨 **Modern UI/UX** - Beautiful, responsive design with Material UI and Tailwind CSS
- 🔐 **Secure & Scalable** - Built with security best practices, rate limiting, and helmet protection

## Tech Stack

### Backend
- **GraphQL**: Apollo Server 5.0
- **Database**: MySQL with Prisma ORM
- **Runtime**: Node.js + TypeScript
- **API Docs**: Swagger UI
- **Security**: Helmet, CORS, Rate Limiting
- **Validation**: Zod schema validation
- **AI/NLP**: Sentiment analysis with Natural library

### Frontend
- **Framework**: Next.js 14 (React 18)
- **GraphQL Client**: Apollo Client
- **UI Library**: Material UI (MUI)
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Language**: TypeScript

## Screenshots

![Homepage ](Backend/src/images/Sales_Analytics_Dashboard.jpg)
![graphql](Backend/src/images/graphql.jpg)
![api-docs](Backend/src/images/api-docs.jpg)

---

## Installation

### Prerequisites
- Node.js 18+ 
- MySQL 8+
- npm or yarn

### 1. Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/sales-analytics-dashboard.git
cd sales-analytics-dashboard
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:
```env
DATABASE_URL="mysql://root:your_password@localhost:3306/sales_analytics"
PORT=4000
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

Setup database and run migrations:
```bash
# Generate Prisma Client
npm run prisma:generate

# Create database tables
npm run prisma:migrate

# Seed sample data (optional)
npm run prisma:seed

# Start development server
npm run dev
```

Backend will run on:
- 🚀 **API**: http://localhost:4000
- 📊 **GraphQL Playground**: http://localhost:4000/graphql
- 📚 **Swagger Docs**: http://localhost:4000/api-docs

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Create `.env.local` file:
```env
NEXT_PUBLIC_GRAPHQL_URL=http://localhost:4000/graphql
```

Start development server:
```bash
npm run dev
```

Frontend will run on: http://localhost:3000

---

## Usage

### Dashboard
- View real-time sales metrics with KPI cards
- Analyze revenue trends over the last 30 days
- Identify top-performing products and categories
- Monitor sales table with all transaction details

### Add New Sale
1. Click the **"+ Add New Sale"** button
2. Fill in product details (name, category, quantity, price, date)
3. Click **"Add Sale"** to save
4. Dashboard updates automatically

### Sentiment Analysis
1. Scroll to the **"Sentiment Analysis"** section
2. Paste customer review, feedback, or any text
3. Click **"Analyze Sentiment"**
4. Get instant analysis: Positive/Negative/Neutral with detailed insights

**Example texts to try:**
- *Positive*: "This product is amazing! Best purchase ever!"
- *Negative*: "Terrible quality. Very disappointed."
- *Neutral*: "Product arrived on time. Works as described."

### GraphQL Playground
Visit http://localhost:4000/graphql to test queries:

```graphql
# Get all sales
query {
  sales {
    id
    productName
    totalAmount
    saleDate
  }
}

# Analyze sentiment
mutation {
  analyzeSentiment(input: {
    text: "Great product! Highly recommend!"
  }) {
    sentiment
    analysis
    confidence
  }
}
```

---

## API Endpoints

### GraphQL Queries
```graphql
sales                    # Get all sales records
sale(id: Int!)          # Get single sale by ID
analytics               # Get complete analytics (KPIs, trends, top products)
```

### GraphQL Mutations
```graphql
createSale(input: CreateSaleInput!)         # Create new sale
deleteSale(id: Int!)                        # Delete sale by ID
analyzeSentiment(input: SentimentAnalysisInput!)  # Analyze text sentiment
```

### REST Endpoints
- `GET /` - API information
- `GET /health` - Health check
- `GET /api-docs` - Swagger documentation

---

## Project Structure

```
sales-analytics-dashboard/
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma          # Database schema
│   │   └── seed.ts                # Sample data seeder
│   ├── src/
│   │   ├── graphql/
│   │   │   ├── typeDefs.ts       # GraphQL schema
│   │   │   └── resolvers.ts      # GraphQL resolvers
│   │   ├── services/
│   │   │   └── sentimentService.ts  # Sentiment analysis logic
│   │   ├── swagger/
│   │   │   └── swagger.ts        # API documentation
│   │   ├── utils/
│   │   │   └── validation.ts     # Input validation
│   │   └── index.ts              # Server entry point
│   ├── .env                       # Environment variables
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── layout.tsx        # Root layout
│   │   │   ├── page.tsx          # Home page
│   │   │   └── globals.css       # Global styles
│   │   ├── components/
│   │   │   ├── Dashboard.tsx     # Main dashboard
│   │   │   ├── KPICard.tsx       # KPI metric cards
│   │   │   ├── SalesChart.tsx    # Revenue trend chart
│   │   │   ├── TopProducts.tsx   # Top products list
│   │   │   ├── SalesByCategory.tsx  # Category breakdown
│   │   │   ├── AddSaleForm.tsx   # Add sale form
│   │   │   ├── SalesTable.tsx    # Sales data table
│   │   │   └── SentimentAnalyzer.tsx  # Sentiment analysis UI
│   │   ├── graphql/
│   │   │   ├── queries.ts        # GraphQL queries
│   │   │   └── mutations.ts      # GraphQL mutations
│   │   ├── lib/
│   │   │   └── apolloClient.ts   # Apollo Client setup
│   │   └── theme/
│   │       └── theme.ts          # MUI theme config
│   ├── .env.local                # Environment variables
│   ├── package.json
│   └── next.config.js
└── README.md
```

---

## Development

### Backend Commands
```bash
npm run dev              # Start dev server with hot reload
npm run build            # Build for production
npm run start            # Start production server
npm run prisma:generate  # Generate Prisma Client
npm run prisma:migrate   # Run database migrations
npm run prisma:seed      # Seed sample data
```

### Frontend Commands
```bash
npm run dev              # Start dev server
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Lint code
```

---

## Database Schema

```prisma
model Sale {
  id           Int      @id @default(autoincrement())
  productName  String
  category     String
  quantity     Int
  price        Decimal
  totalAmount  Decimal
  saleDate     DateTime
  createdAt    DateTime @default(now())
}
```

---

## Roadmap

- [ ] User authentication and authorization
- [ ] Export data to CSV/Excel
- [ ] Real-time updates with GraphQL subscriptions
- [ ] Dark mode support
- [ ] Email notifications for sales milestones
- [ ] Multi-language support
- [ ] Mobile app (React Native)
- [ ] Advanced AI analytics with predictions

---
## Acknowledgments

- [Apollo GraphQL](https://www.apollographql.com/) - GraphQL implementation
- [Prisma](https://www.prisma.io/) - Next-generation ORM
- [Material UI](https://mui.com/) - React component library
- [Next.js](https://nextjs.org/) - React framework
- [Recharts](https://recharts.org/) - Chart library
- [Sentiment](https://www.npmjs.com/package/sentiment) - NLP sentiment analysis

---

## Support

Give a ⭐️ if this project helped you!
