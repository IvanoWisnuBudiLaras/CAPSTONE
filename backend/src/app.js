import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import swaggerUi from 'swagger-ui-express'
import swaggerSpec from './swagger.js'

import transactionRoutes from './routes/transactions.js'
import dashboardRoutes   from './routes/dashboard.js'
import categoryRoutes    from './routes/categories.js'
import budgetRoutes      from './routes/budgets.js'
import allocationRoutes  from './routes/allocations.js'
import profileRoutes     from './routes/profiles.js'

const app  = express()
const PORT = process.env.PORT || 5000

app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:3000' }))
app.use(express.json())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customSiteTitle: 'Finance App API Docs',
  swaggerOptions: { persistAuthorization: true },
}))

app.use('/api/transactions', transactionRoutes)
app.use('/api/dashboard',    dashboardRoutes)
app.use('/api/categories',   categoryRoutes)
app.use('/api/budgets',      budgetRoutes)
app.use('/api/allocations',  allocationRoutes)
app.use('/api/profiles',     profileRoutes)

app.get('/api/health', (_, res) => res.json({ status: 'ok', timestamp: new Date() }))

app.use((err, _req, res, _next) => {
  console.error(err)
  res.status(500).json({ error: err.message || 'Internal server error' })
})

app.listen(PORT, () => console.log(`✓ Backend running → http://localhost:${PORT}`))
