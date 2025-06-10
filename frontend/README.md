# StockArt AI Chat - Frontend

A modern, responsive frontend for the StockArt AI Chat application built with vanilla HTML, CSS, and JavaScript.

## Features

- **Modern UI Design**: Clean, Perplexity-inspired interface
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Real-time Chat**: Interactive chat interface with typing indicators
- **Dark/Light Theme**: Automatic theme detection with manual override
- **Accessibility**: WCAG compliant with keyboard navigation support
- **Mobile Optimized**: Touch-friendly interface with swipe gestures
- **Stock Watchlist**: Side panel for tracking favorite stocks
- **Progressive Enhancement**: Works without JavaScript (basic functionality)

## Technology Stack

- **HTML5**: Semantic markup with accessibility features
- **CSS3**: Modern CSS with custom properties and responsive design
- **Vanilla JavaScript**: No framework dependencies for optimal performance
- **Node.js**: Server-side rendering and API integration
- **Express.js**: Web application framework

## Project Structure

```
frontend/
├── index.html              # Main HTML file
├── server.js              # Express server
├── package.json           # Node.js dependencies
├── Dockerfile            # Docker configuration
├── railway.json          # Railway deployment config
├── scripts/
│   ├── config.js         # Configuration management
│   ├── chat.js           # Chat functionality
│   ├── mobile.js         # Mobile-specific features
│   └── main.js           # Main application logic
└── styles/
    ├── main.css          # Main styles
    ├── chat.css          # Chat interface styles
    ├── mobile.css        # Mobile responsive styles
    └── animations.css    # Animation definitions
```

## Configuration

The application uses environment variables for configuration:

- `NODE_ENV`: Environment (development/production)
- `PORT`: Server port (default: 3000)
- `N8N_WEBHOOK_URL`: Backend webhook URL for AI processing

## Local Development

1. Install dependencies:
```bash
npm install
```

2. Set environment variables:
```bash
export N8N_WEBHOOK_URL="your-n8n-webhook-url"
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:3000`

## Production Deployment

### Using Docker

1. Build the Docker image:
```bash
docker build -t stockart-frontend .
```

2. Run the container:
```bash
docker run -p 3000:3000 -e N8N_WEBHOOK_URL="your-webhook-url" stockart-frontend
```

### Using Railway

1. Connect your repository to Railway
2. Set the `N8N_WEBHOOK_URL` environment variable
3. Deploy automatically with Railway's GitHub integration

## API Integration

The frontend communicates with the n8n backend via webhooks:

- **Endpoint**: `/api/chat`
- **Method**: POST
- **Payload**: `{ message: string, conversationId?: string }`
- **Response**: `{ response: string, conversationId: string }`

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Performance Features

- **Lazy Loading**: Images and non-critical resources
- **Code Splitting**: Modular JavaScript architecture
- **Caching**: Service worker for offline functionality
- **Compression**: Gzip compression for static assets
- **CDN Ready**: Optimized for content delivery networks

## Accessibility Features

- **Keyboard Navigation**: Full keyboard support
- **Screen Reader Support**: ARIA labels and semantic HTML
- **High Contrast Mode**: Automatic detection and support
- **Reduced Motion**: Respects user motion preferences
- **Focus Management**: Proper focus handling for modals and navigation

## Mobile Features

- **Touch Gestures**: Swipe to open/close sidebar
- **Responsive Images**: Optimized for different screen densities
- **Viewport Handling**: Proper mobile viewport configuration
- **Safe Area Support**: Support for devices with notches
- **Keyboard Handling**: Proper virtual keyboard behavior

## Security Features

- **Content Security Policy**: Protection against XSS attacks
- **HTTPS Enforcement**: Secure communication
- **Input Sanitization**: Protection against injection attacks
- **Rate Limiting**: API request throttling

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
