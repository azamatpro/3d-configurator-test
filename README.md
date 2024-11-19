# 3D Teapot Configurator

## 🚀 Features

- Real-time 3D rendering with Three.js
- Interactive color customization
- Responsive design for mobile, tablet, and desktop
- Orbit controls for model inspection
- Dynamic lighting and material properties
- Optimized performance with proper scaling

## 🛠 Tech Stack

- **Frontend Framework**: Preact
- **3D Graphics**: Three.js
- **State Management**: Preact Signals
- **Build Tool**: Preact CLI
- **Testing**: Jest + Testing Library
- **Code Quality**: ESLint + Prettier

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)

## 💻 Installation & CLI Commands

```bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# test the production build locally
npm run serve

# run tests with jest and enzyme
npm run test
```

## 📖 Project Structure

```
src/
├── components/
│   ├── App.js                 # Main application component
│   ├── canvas/
│   │   └── TeapotSean.js     # 3D teapot rendering component
│   └── ui/
│       └── ChooseColors.js    # Color selection interface
├── utils/
│   └── index.js              # Utility functions and state management
├── style/
│   └── index.css             # Global styles
└── index.js                  # Application entry point
```

## 🎨 Component Documentation

### TeapotSean Component

The main 3D rendering component that handles:
- Scene setup and management
- Camera positioning and controls
- Lighting configuration
- Model loading and rendering
- Responsive adjustments

Configuration options:
```javascript
const config = {
  fov: {
    mobile: 60,
    tablet: 55,
    desktop: 50
  },
  teapotScale: {
    mobile: 0.15,
    tablet: 0.18,
    desktop: 0.2
  },
  breakpoints: {
    mobile: 768,
    tablet: 1024
  }
};
```

### ChooseColors Component

Handles color selection interface:
- Predefined color palette
- Custom color picker
- Responsive layout
- Real-time color updates

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Testing Guidelines

- Unit tests should cover all core functionality
- Run tests before submitting PRs
- Maintain test coverage above 80%
- Follow Testing Library best practices

## 🔍 Performance Considerations

- Three.js scene optimization
- Proper disposal of 3D resources
- Responsive scaling for different devices
- Efficient state management

## 🔒 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📱 Mobile Support

The configurator is fully responsive and supports:
- Touch interactions
- Mobile-optimized controls
- Adaptive rendering quality

## 🐛 Known Issues

- Performance may vary on lower-end mobile devices
- WebGL support required

## 📈 Future Improvements

- [ ] Add more customization options
- [ ] Implement texture support
- [ ] Add animation presets
- [ ] Export functionality
- [ ] AR/VR support

## 👏 Acknowledgments

- Three.js community
- Preact team
- Testing Library maintainers

## 📧 Contact

Azamat - azamat.rasulov00@gmail.com

Project Link: [https://github.com/yourusername/3d-configurator-test](https://github.com/azamatpro/3d-configurator-test)
