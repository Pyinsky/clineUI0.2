FROM n8nio/n8n:latest

# Set environment variables
ENV N8N_HOST=0.0.0.0
ENV N8N_PORT=3000
ENV WEBHOOK_URL=https://stockart-n8n.railway.app
ENV N8N_PROTOCOL=https
ENV NODE_ENV=production

# Create data directory
USER root
RUN mkdir -p /home/node/.n8n
RUN chown -R node:node /home/node/.n8n

# Switch back to node user
USER node

# Copy workflow file
COPY --chown=node:node stockart-ai-workflow.json /home/node/.n8n/

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/healthz || exit 1

# Start n8n
CMD ["n8n", "start"]
