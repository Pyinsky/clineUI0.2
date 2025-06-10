# Deployment Guide - StockArt AI Chat

This guide will help you deploy the StockArt AI Chat application to Railway.

## 🚀 Railway Deployment Steps

### Step 1: Prepare Your Repository

1. **Push to GitHub**
```bash
git init
git add .
git commit -m "Initial commit: StockArt AI Chat"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

### Step 2: Deploy n8n Backend

1. **Create Railway Project**
   - Go to [railway.app](https://railway.app)
   - Click "New Project" → "Deploy from GitHub repo"
   - Select your repository
   - Choose "Deploy from a folder" → `n8n-backend`

2. **Configure Environment Variables**
   ```
   N8N_ENCRYPTION_KEY=your-32-character-random-string
   OPENROUTER_API_KEY=your-openrouter-api-key
   N8N_PORT=5678
   N8N_PROTOCOL=https
   N8N_HOST=0.0.0.0
   WEBHOOK_TUNNEL_URL=https://your-n8n-railway-url.railway.app
   ```

3. **Generate Encryption Key**
   ```bash
   # Generate a random 32-character string
   openssl rand -hex 16
   ```

4. **Get Your OpenRouter API Key**
   - Sign up at [openrouter.ai](https://openrouter.ai)
   - Go to Keys section
   - Create a new API key
   - Copy the key (starts with `sk-or-...`)

5. **Deploy and Get URL**
   - Railway will provide a URL like: `https://stockart-backend-production-xxxx.up.railway.app`
   - Save this URL for the frontend configuration

### Step 3: Import n8n Workflow

1. **Access n8n Interface**
   - Visit your Railway n8n URL
   - Complete the initial setup (create admin account)

2. **Import Workflow**
   - Click "Import from file"
   - Upload `n8n-backend/stockart-ai-workflow.json`
   - Configure the OpenRouter credentials in the HTTP Request node

3. **Activate Workflow**
   - Click the toggle to activate the workflow
   - Test the webhook endpoint

### Step 4: Deploy Frontend

1. **Create New Railway Service**
   - In the same Railway project, add new service
   - Choose "Deploy from GitHub repo"
   - Select your repository
   - Choose "Deploy from a folder" → `frontend`

2. **Configure Environment Variables**
   ```
   NODE_ENV=production
   PORT=3000
   N8N_WEBHOOK_URL=https://your-n8n-railway-url.railway.app/webhook/stockart-chat
   ```

3. **Deploy**
   - Railway will automatically deploy and provide a frontend URL
   - Example: `https://stockart-frontend-production-xxxx.up.railway.app`

## 🔧 Configuration Details

### Backend Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `N8N_ENCRYPTION_KEY` | 32-character encryption key | `a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6` |
| `OPENROUTER_API_KEY` | OpenRouter API key | `sk-or-v1-abc123...` |
| `N8N_PORT` | Port for n8n | `5678` |
| `N8N_PROTOCOL` | Protocol | `https` |
| `N8N_HOST` | Host binding | `0.0.0.0` |

### Frontend Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `production` |
| `PORT` | Server port | `3000` |
| `N8N_WEBHOOK_URL` | Backend webhook URL | `https://your-backend.railway.app/webhook/stockart-chat` |

## 🧪 Testing Your Deployment

### 1. Test n8n Backend

```bash
curl -X POST https://your-backend.railway.app/webhook/stockart-chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello, tell me about Apple stock"}'
```

Expected response:
```json
{
  "response": "Apple Inc. (AAPL) is a multinational technology company...",
  "conversationId": "generated-uuid"
}
```

### 2. Test Frontend

1. Visit your frontend URL
2. Try sending a message in the chat
3. Verify the response appears
4. Test mobile responsiveness
5. Test dark/light theme switching

## 🐛 Troubleshooting

### Common Issues

1. **n8n Workflow Not Responding**
   - Check if workflow is activated
   - Verify OpenRouter API key is valid
   - Check n8n logs in Railway dashboard

2. **Frontend Can't Connect to Backend**
   - Verify `N8N_WEBHOOK_URL` environment variable
   - Check CORS settings in n8n
   - Ensure both services are running

3. **OpenRouter API Errors**
   - Verify API key format: `sk-or-v1-...`
   - Check API key permissions
   - Ensure sufficient credits in OpenRouter account

4. **Railway Build Failures**
   - Check Dockerfile syntax
   - Verify all required files are committed
   - Check Railway build logs

### Debug Steps

1. **Check Railway Logs**
   ```
   Railway Dashboard → Your Service → Deployments → View Logs
   ```

2. **Test API Endpoints**
   ```bash
   # Test n8n health
   curl https://your-backend.railway.app/webhook/health
   
   # Test frontend health
   curl https://your-frontend.railway.app/health
   ```

3. **Verify Environment Variables**
   ```
   Railway Dashboard → Your Service → Variables
   ```

## 🔒 Security Checklist

- [ ] OpenRouter API key is not exposed in frontend code
- [ ] n8n admin interface is secured
- [ ] HTTPS is enforced on both services
- [ ] Environment variables are properly set
- [ ] No sensitive data in git repository

## 📈 Performance Optimization

### n8n Backend
- Enable caching for repeated requests
- Optimize workflow execution order
- Monitor memory usage

### Frontend
- Enable gzip compression
- Implement service worker for caching
- Optimize image loading
- Monitor Core Web Vitals

## 🔄 CI/CD Setup

### Automatic Deployments

Railway automatically deploys when you push to your main branch. To set up staging environments:

1. **Create staging branch**
   ```bash
   git checkout -b staging
   git push origin staging
   ```

2. **Set up staging service**
   - Create new Railway service
   - Connect to staging branch
   - Use different environment variables

### Manual Deployment

```bash
# Deploy specific commit
git push origin main

# Force redeploy
railway redeploy --service=your-service-id
```

## 📊 Monitoring

### Railway Metrics
- CPU usage
- Memory consumption
- Request volume
- Response times

### Application Logs
- n8n workflow execution logs
- Frontend server logs
- API request/response logs

## 🆘 Support

If you encounter issues:

1. Check Railway status page
2. Review application logs
3. Test API endpoints individually
4. Verify environment variables
5. Check OpenRouter service status

---

**Deployment Complete! 🎉**

Your StockArt AI Chat application should now be live and accessible via the Railway URLs.
