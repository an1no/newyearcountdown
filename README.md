# 🎉 New Year Countdown Timer

A stunning, interactive countdown timer for New Year celebrations with fireworks, music, and celebration effects.

## 🌟 Live Demo

**Website**: [https://newyearcountdown.net](https://newyearcountdown.net)

## ✨ Features

- 🕒 **Real-time countdown** to New Year in your local timezone
- 🎆 **Interactive fireworks** animation when countdown reaches zero
- 🎵 **Background music** and celebration sound effects
- 🖥️ **Fullscreen mode** for big screen displays
- 📱 **Mobile responsive** design for all devices
- 🌍 **Timezone aware** - works globally with VPN support
- ⚡ **Accurate timing** using WorldTimeAPI for precision
- 🎨 **Beautiful UI** with gradient backgrounds and animations

## 🚀 Technologies Used

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **Build Tool**: Vite
- **Deployment**: GitHub Pages with custom domain
- **Analytics**: Google Analytics (GA4)
- **Monetization**: Google AdSense
- **API**: WorldTimeAPI for accurate timezone handling

## 🛠️ Local Development

### Prerequisites
- Node.js 18+ and npm
- Git

### Setup

```bash
# Clone the repository
git clone https://github.com/an1no/newyearcountdown.git

# Navigate to project directory
cd newyearcountdown

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173` to see the application.

### Build for Production

```bash
# Build the project
npm run build

# Preview the build
npm run preview
```

## 📁 Project Structure

```
├── src/
│   ├── components/          # React components
│   │   ├── Fireworks.tsx   # Fireworks animation component
│   │   ├── GoogleAds.tsx   # AdSense integration
│   │   └── ui/             # shadcn/ui components
│   ├── pages/
│   │   ├── Index.tsx       # Main countdown page
│   │   ├── Privacy.tsx     # Privacy policy page
│   │   └── NotFound.tsx    # 404 page
│   ├── config/
│   │   └── adsense.ts      # AdSense configuration
│   └── lib/
│       └── utils.ts        # Utility functions
├── public/
│   ├── song.mp3           # Background music
│   ├── firework.mp3       # Celebration sound
│   ├── manifest.json      # PWA manifest
│   ├── sitemap.xml        # SEO sitemap
│   ├── robots.txt         # SEO robots file
│   ├── 404.html          # SPA routing support
│   └── CNAME             # Custom domain configuration
└── docs/                  # Documentation
    ├── MONETIZATION_GUIDE.md
    ├── ADSENSE_SETUP.md
    └── DEPLOYMENT_CHECKLIST.md
```

## 🌍 Deployment

The project is deployed on GitHub Pages with a custom domain:

1. **Domain**: `newyearcountdown.net`
2. **CI/CD**: Automated deployment via GitHub Actions
3. **SSL**: Automatically managed by GitHub Pages

### Deployment Process

```bash
# Build and deploy (automated via GitHub Actions)
git push origin main
```

## 🔧 Configuration

### Environment Variables
- Google Analytics: `G-GPT7MWGXT2`
- Google AdSense: `ca-pub-5179227765734373`

### API Dependencies
- **WorldTimeAPI**: For accurate timezone detection and time synchronization

## 📊 Analytics & Monetization

- **Google Analytics 4**: Tracks user behavior and site performance
- **Google AdSense**: Banner advertisements for revenue generation
- **Performance Monitoring**: Core Web Vitals tracking

## 🎯 SEO Features

- **Structured Data**: Schema.org markup for rich snippets
- **Meta Tags**: Comprehensive Open Graph and Twitter Card support
- **Sitemap**: Auto-generated XML sitemap
- **Robots.txt**: Search engine crawling instructions

## 📱 PWA Support

- **Manifest**: Web app manifest for installation
- **Icons**: Multiple icon sizes for different devices
- **Offline**: Basic offline functionality

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Anino Zaridze**
- Website: [newyearcountdown.net](https://newyearcountdown.net)
- LinkedIn: [anino-zaridze](https://linkedin.com/in/anino-zaridze)
- GitHub: [@an1no](https://github.com/an1no)

## 🙏 Acknowledgments

- Sound effects and music assets
- WorldTimeAPI for accurate time data
- shadcn/ui for beautiful UI components
- The React and Vite communities

---

**Happy New Year!** 🎊
