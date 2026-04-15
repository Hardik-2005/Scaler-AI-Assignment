import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

app.get('/api/products', async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      include: { images: true, category: true }
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await prisma.product.findUnique({
      where: { slug: req.params.id },
      include: { images: true, category: true }
    });
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

// Create Order Route
app.post('/api/orders', async (req, res) => {
  try {
    const { items, address, totalAmount, userEmail, userName } = req.body;
    
    // In a real app we'd get userId from auth middleware. For testing/demo, we use dummy data.
    // Assuming user is authenticated via Clerk on frontend
    if (!items || !items.length || !address || !userEmail) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Usually you check if user exists. We will upsert User.
    const user = await prisma.user.upsert({
      where: { email: userEmail },
      update: {},
      create: { 
        email: userEmail, 
        name: userName || address.name || "User", 
        password: "placeholder", 
      },
    });

    // Create the order transaction
    const order = await prisma.$transaction(async (tx) => {
      const newOrder = await tx.order.create({
        data: {
          userId: user.id,
          totalAmount,
          status: 'PENDING',
          items: {
            create: items.map((item: any) => ({
              productId: parseInt((item.id || item.productId).toString(), 10),
              quantity: parseInt(item.quantity.toString(), 10),
              price: parseFloat(item.price.toString())
            }))
          }
        },
        include: {
          items: {
            include: {
              product: true
            }
          }
        }
      });
      return newOrder;
    });

    // Send confirmation email
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 3);
    const estimatedDelivery = deliveryDate.toLocaleDateString('en-IN', {
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });

    res.status(201).json({ message: "Order created successfully", orderId: order.id, estimatedDelivery });
  } catch (error) {
    console.error("Order creation failed:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Centralized Error Handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error', message: err.message });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
