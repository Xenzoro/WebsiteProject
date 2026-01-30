# Jacob Martinez Portfolio Website

A modern, interactive portfolio website showcasing my work as an aspiring Software Engineer studying Information Systems and Computer Science. Built with vanilla HTML, CSS, and JavaScript, featuring smooth animations and responsive design.

## 🌟 Features

### Interactive Navigation
- **Responsive Navbar**: Smooth hiding/showing behavior on scroll
- **Mobile-Friendly**: Hamburger menu for mobile devices
- **Liquid Button Effects**: Custom hover animations with gradient effects
- **Auto-hide on Scroll**: Desktop navbar intelligently hides when scrolling down

### Dynamic Content Sections

#### Horizontal Project Scroll
- Innovative horizontal scrolling section with parallax effects
- Dynamically loaded project images (11 images)
- 3D perspective transformations with GSAP
- Staggered card animations on scroll
- Multi-layered title animations with velocity-based effects

#### About Me Section
- Responsive layout with profile picture
- Clean typography and gradient background
- Fully responsive design

#### Contact Section
- Interactive hover animations on contact elements
- Scroll-triggered animations using GSAP ScrollTrigger
- Direct email integration
- Social media links (LinkedIn, GitHub)
- Web3Forms integration for contact form submissions

### Animation Features
- **Smooth Scrolling**: Powered by Lenis for buttery smooth scroll experience
- **GSAP Animations**: Professional-grade animations throughout
- **Scroll Triggers**: Content animates as you scroll
- **Hover Effects**: Interactive hover states on all interactive elements
- **Relative Animations**: Hover effects work correctly at any scroll position

## 🛠️ Technologies Used

### Core Technologies
- **HTML5**: Semantic markup
- **CSS3**: Modern styling with gradients, transforms, and animations
- **JavaScript (ES6+)**: Vanilla JS for all functionality

### Libraries & Frameworks
- **[GSAP 3.12.5](https://greensock.com/gsap/)**: Animation library
  - Core GSAP
  - ScrollTrigger plugin
- **[Lenis 1.1.20](https://lenis.studiofreight.com/)**: Smooth scrolling library
- **[Web3Forms](https://web3forms.com/)**: Form handling API

### Fonts
- **Archivo**: Custom font family for typography

## 📁 Project Structure

```
WebsiteProject/
├── index.html                          # Main landing page
├── README.md                           # Project documentation
├── project-files/
│   ├── css/
│   │   ├── navbar.css                 # Navigation styling
│   │   ├── intro-index.css            # Intro section styling
│   │   ├── horizontal-project-scroll.css  # Horizontal scroll section
│   │   ├── contact-outro.css          # Contact section styling
│   │   ├── about-me.css               # About me page styling
│   │   ├── contact-form.css           # Contact form styling
│   │   └── projects.css               # Projects page styling
│   ├── js/
│   │   ├── navbar.js                  # Navigation functionality
│   │   ├── horizontal-project-scroll.js   # Horizontal scroll logic
│   │   └── contact-outro.js           # Contact animations
│   ├── html/
│   │   ├── about-me.html              # About me page
│   │   ├── contactForm.html           # Contact form page
│   │   ├── projects.html              # Projects overview
│   │   ├── portfolio-project.html     # Portfolio details
│   │   ├── class-projects.html        # Class projects showcase
│   │   ├── controller-projects.html   # Controller mods showcase
│   │   └── computer-project.html      # Computer builds showcase
│   ├── horizontal-project-scroll-assets/
│   │   └── img (1-11).JPEG/jpeg       # Project images
│   ├── contact-form-assets/
│   │   ├── arrow_icon.png
│   │   └── maeNJakeMary.png
│   ├── archivo.ttf                    # Custom font
│   ├── dark-logo.png                  # Logo
│   ├── logo.png
│   ├── selfie2.JPG                    # Profile pictures
│   └── selfiecropped.jpg
└── Prev-Tasks/                        # Learning exercises and experiments
    ├── Animations/
    ├── buttons/
    ├── flex-box/
    ├── hover/
    └── ... (various learning modules)
```

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (optional, but recommended for development)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/WebsiteProject.git
   cd WebsiteProject
   ```

2. **Open in browser**
   - Simply open `index.html` in your web browser
   - Or use a local server:
     ```bash
     # Using Python
     python -m http.server 8000
     
     # Using Node.js (http-server)
     npx http-server
     ```

3. **View the site**
   - Navigate to `http://localhost:8000` (or your server's address)

### For GitHub Pages Deployment

1. Push to GitHub repository
2. Go to repository Settings → Pages
3. Set source to main branch
4. Site will be live at: `https://yourusername.github.io/WebsiteProject`

**Note**: File paths use absolute paths from root (`project-files/...`) to ensure compatibility with GitHub Pages.

## 🎨 Key Features Implementation

### Responsive Navigation
The navbar features:
- Scroll-based show/hide behavior
- Smooth transitions (0.5s ease)
- Mobile hamburger menu for screens ≤ 800px
- Active state management

### Horizontal Scroll Section
- **Pinning**: Section pins while content scrolls horizontally
- **Image Loading**: Dynamically creates 11 image cards with proper file extensions
- **3D Effects**: Cards animate from z: -50000 to z: 2000
- **Parallax Titles**: Multiple layers moving at different speeds
- **Velocity-based Animation**: Title offset responds to scroll velocity

### Contact Animations
- **Scroll Triggers**: Elements animate into position as section comes into view
- **Relative Hover Effects**: All hover animations use relative values (`+=`, `-=`)
- **Email Integration**: Direct Gmail link with pre-filled subject and body

## 🔧 Configuration

### Modifying Project Images
To change the horizontal scroll images:

1. Place images in `project-files/horizontal-project-scroll-assets/`
2. Update `imageCount` in `horizontal-project-scroll.js`:
   ```javascript
   const imageCount = 11; // Change this number
   ```
3. Update the `imageExtensions` object with correct file extensions

### Customizing Colors
Main color scheme uses:
- **Primary Blue**: `#269cd4`
- **Dark Background**: `#333333` to `#1c1c1c` (gradient)
- **Accent Blue**: `#238dbf`

Update in respective CSS files.

### Contact Form
To use your own Web3Forms key:
1. Sign up at [Web3Forms](https://web3forms.com/)
2. Replace the access key in `contactForm.html`:
   ```html
   <input type="hidden" name="access_key" value="YOUR_KEY_HERE">
   ```

## 📱 Browser Compatibility

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🐛 Known Issues & Solutions

### Images Not Showing on GitHub Pages
**Solution**: File extensions are case-sensitive on Linux (GitHub Pages). The project now includes proper extension mapping in `horizontal-project-scroll.js`.

### Hover Animations Jumping
**Solution**: All hover animations use relative values (`+=`, `-=`) to work correctly with scroll-triggered animations.

## 📝 Development Notes

### File Naming Convention
- Use lowercase with hyphens for CSS/JS files: `contact-outro.css`
- HTML files use camelCase or hyphens: `contactForm.html`, `about-me.html`
- Image files maintain original extensions (case-sensitive)

### Animation Performance
- All animations use GSAP for optimal performance
- `will-change` property used on animated elements
- Hardware acceleration via CSS transforms

## 🤝 Contributing

This is a personal portfolio project, but suggestions and feedback are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available for educational purposes. Please credit if you use any code from this project.

## 📧 Contact

**Jacob Martinez**
- Email: xxjacobmartinezxx@gmail.com
- LinkedIn: [linkedin.com/in/jacobmartinii](https://www.linkedin.com/in/jacobmartinii/)
- GitHub: [github.com/Xenzoro](https://github.com/Xenzoro)

## 🙏 Acknowledgments

- **GSAP**: For the amazing animation library
- **Lenis**: For smooth scrolling implementation
- **Web3Forms**: For simple form handling
- **GitHub Pages**: For free hosting

---

**Status**: 🚀 Live and actively maintained

**Last Updated**: January 2026
