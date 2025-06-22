# Trans History Archive

A digital archive documenting the history of trans identities in the United States and beyond.

## Project Structure

```
/ (project root)
├── .eleventy.js        # Eleventy configuration
├── netlify.toml        # Netlify deployment configuration
├── package.json        # Node.js project configuration
├── README.md           # Project documentation
├── UXUI-Plan.md        # Design and UX documentation
├── .gitignore          # Git ignore rules
└── src/                # Source files
    ├── _data/          # Site-wide data and configuration
    ├── _includes/      # Layouts and partials
    │   └── layouts/    # Base layout templates
    ├── assets/         # Static assets
    │   ├── images/     # Image files
    │   ├── css/        # Stylesheets
    │   └── js/         # JavaScript files
    ├── content/        # Content collections
    │   ├── figures/    # Historical figures (Markdown)
    │   └── events/     # Historical events (future)
    └── pages/          # Page templates (Nunjucks)
```

### Directory Descriptions

- **`src/_data`**: Contains global data files that Eleventy can access. These can be JSON, YAML, or JavaScript files that export data.

- **`src/_includes`**: Stores reusable template partials and layouts.
  - `layouts/`: Base layout templates that define the overall page structure.

- **`src/assets`**: Contains all static assets.
  - `images/`: All image files used in the site.
  - `css/`: Stylesheets (Sass/CSS).
  - `js/`: Client-side JavaScript files.

- **`src/content`**: Houses all content in Markdown format.
  - `figures/`: Individual historical figure profiles.
  - `events/`: Historical events (planned for future implementation).

- **`src/pages`**: Contains page templates in Nunjucks format that define the site's routes.

## Adding Content

1. **Historical Figures**
   - Create a new Markdown file in `src/content/figures/`
   - Follow the naming convention: `YYYY-name-of-figure.md`
   - Use the following frontmatter structure:
     ```yaml
     ---
     title: Full Name
     name: Display Name
     pronouns: they/them
     born: YYYY
     died: YYYY
     summary: Brief summary (1-2 sentences)
     notable_for:
       - Key achievement 1
       - Key achievement 2
     sources:
       - Source 1
       - Source 2
     image: filename.jpg
     ---
     ```

2. **Images**
   - Place all images in `src/assets/images/`
   - Use descriptive filenames (e.g., `marsha-p-johnson.jpg`)
   - Optimize images before committing

## Development

### Prerequisites
- Node.js (v14 or later)
- npm (v6 or later)

### Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Available Commands

- `npm start` or `npm run serve`: Start development server with live reload
- `npm run build`: Build production site to `_site` directory
- `npm run clean`: Clean the build directory
- `npm run deploy`: Build and deploy to Netlify

## Accessibility

This project follows WCAG 2.1 AA standards and includes:

- Semantic HTML5 structure
- ARIA labels and roles
- Keyboard navigation
- Screen reader support
- High contrast color scheme
- Responsive design for all devices
- Print styles for all pages

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
