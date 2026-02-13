# Sahr Emmanuel - Professional Website

A professional portfolio website for Sahr Emmanuel, Environmental Science & Engineering Professional, showcasing academic work, research, EPA contributions, and professional accomplishments.

## 🌟 Features

- **Responsive Design**: Fully responsive across all devices (mobile, tablet, desktop)
- **Modern UI/UX**: Clean, professional design with smooth animations
- **Dark Mode**: Toggle between light and dark themes with preference persistence
- **External CSS/JS**: Optimized file structure with separated concerns
- **Working Contact Form**: JavaScript-based form handling compatible with GitHub Pages
- **Dashboard Templates**: Downloadable Excel templates for EPA data collection
- **SEO Optimized**: Complete meta tags for search engines and social media
- **Accessibility**: ARIA labels and semantic HTML for better accessibility
- **Performance**: Optimized images and lazy loading for fast page loads

## 📁 Project Structure

```
mysite/
├── index.html                  # Homepage
├── pages/                      # All internal pages
│   ├── about.html
│   ├── contact.html
│   ├── dashboard.html
│   ├── epa-work.html
│   ├── faith.html
│   ├── gallery.html
│   ├── research.html
│   └── teaching.html
├── assets/
│   ├── css/
│   │   ├── main.css           # Main stylesheet
│   │   ├── responsive.css     # Responsive styles (optional)
│   │   └── dashboard.css      # Dashboard-specific styles
│   ├── js/
│   │   ├── main.js            # Main JavaScript
│   │   ├── form-handler.js    # Contact form handler
│   │   ├── dashboard-comp.js  # Dashboard components
│   │   ├── dashboard-ui.js    # Dashboard UI
│   │   └── dashboard-data.js  # Dashboard data
│   ├── images/                # All images
│   └── templates/             # Downloadable Excel templates
│       ├── license-applications.xlsx
│       ├── field-investigations.xlsx
│       ├── water-quality.xlsx
│       └── chemical-testing.xlsx
├── documents/
│   ├── Sahr_Emmanuel_CV.pdf
│   └── publications/
├── favicon/                    # Favicon files
└── README.md
```

## 🚀 Setup Instructions

### For GitHub Pages Deployment

1. **Upload to GitHub Repository**
   - Create a new repository named `mysite` (or use existing)
   - Upload all files maintaining the folder structure
   - Ensure the repository is public

2. **Enable GitHub Pages**
   - Go to repository Settings
   - Navigate to Pages section
   - Select branch: `main` (or `master`)
   - Select folder: `/ (root)`
   - Click Save

3. **Configure Contact Form**
   - Sign up at [Web3Forms](https://web3forms.com) (free)
   - Get your access key
   - Open `assets/js/form-handler.js`
   - Replace `YOUR_ACCESS_KEY_HERE` with your actual key
   - Add this hidden input to your contact form:
     ```html
     <input type="hidden" name="access_key" value="YOUR_ACCESS_KEY_HERE">
     ```

4. **Update URLs**
   - If using custom domain, update all absolute URLs
   - Update social media links in footer
   - Verify all internal links work correctly

### Alternative Contact Form Services

If you prefer different services:

- **EmailJS**: Uncomment EmailJS code in `form-handler.js`
- **Formspree**: Use their endpoint directly in form action
- **Netlify Forms**: If hosting on Netlify, add `netlify` attribute to form

## 🎨 Customization

### Colors
Edit CSS variables in `assets/css/main.css`:
```css
:root {
    --primary-color: #2c6e49;
    --secondary-color: #4c956c;
    --accent-color: #d68c45;
    /* ... */
}
```

### Content
- Update text content in HTML files
- Replace images in `assets/images/`
- Update CV in `documents/`
- Modify social media links in footer

### Adding New Pages
1. Create HTML file in `pages/` folder
2. Copy header and footer from existing page
3. Add navigation link in header
4. Update footer links if needed

## 📊 Dashboard Templates

Four Excel templates are included for EPA data collection:

1. **License Applications**: Track chemical, effluent, and mining licenses
2. **Field Investigations**: Record field investigation data and findings
3. **Water Quality Monitoring**: Log water quality parameters
4. **Chemical Testing**: Document chemical analysis results

All templates include:
- Styled headers
- Sample data for reference
- Instructions for use
- Proper formatting

## 🔧 Maintenance

### Updating Content
- **News/Updates**: Edit the "Latest Updates" section in `index.html`
- **Publications**: Add new items to `research.html`
- **CV**: Replace PDF in `documents/` folder
- **Images**: Optimize before uploading (recommended: <500KB per image)

### Performance Optimization
- Compress images using tools like TinyPNG
- Minify CSS/JS for production (optional)
- Enable browser caching via `.htaccess` (if applicable)

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📱 Responsive Breakpoints

- Desktop: 1200px+
- Laptop: 992px - 1199px
- Tablet: 768px - 991px
- Mobile: < 768px

## 🔒 Security & Privacy

- No server-side code (static site)
- Form submissions via secure HTTPS API
- No cookies except localStorage for dark mode preference
- No tracking scripts (add Google Analytics if needed)

## 📈 SEO Features

- Complete meta tags (title, description, keywords)
- Open Graph tags for social media sharing
- Twitter Card tags
- Semantic HTML5 structure
- Alt tags on all images
- Sitemap ready (add sitemap.xml if needed)

## 🆘 Troubleshooting

### Contact Form Not Working
- Verify Web3Forms access key is correct
- Check browser console for errors
- Ensure form has `id="contact-form"`
- Test with different email addresses

### Images Not Loading
- Check file paths are correct
- Verify images exist in `assets/images/`
- Check file extensions match (case-sensitive on Linux)
- Clear browser cache

### Dark Mode Not Persisting
- Check localStorage is enabled in browser
- Verify JavaScript is not blocked
- Check browser console for errors

## 📝 License

© 2025 Sahr Emmanuel. All rights reserved.

## 👤 Contact

**Sahr Emmanuel**
- Email: esahr37@gmail.com
- Phone: +231 881 650 202
- Office: University of Liberia, Monrovia

## 🙏 Acknowledgments

- Font Awesome for icons
- Google Fonts for Poppins font family
- Web3Forms for contact form service
- GitHub Pages for hosting

---

**Last Updated**: February 2025
**Version**: 2.0
**Status**: Production Ready
