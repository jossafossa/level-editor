# Level Editor

A modern, web-based level editor built with React and TypeScript. Create and edit game levels with an intuitive drag-and-drop interface. It is still in early development.

## 🚀 Demo

Check out the live demo: [level-editor.jossafossa.nl](https://level-editor.jossafossa.nl)

## 🛠️ Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Fast build tool
- **Sass** - CSS preprocessing
- **Plop** - Code generation

## ⚡ Quickstart

Make sure you have [pnpm](https://pnpm.io) installed.

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

## 🔧 Development

### Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm lint` - Run ESLint
- `pnpm preview` - Preview production build
- `pnpm create` - Generate components using Plop templates

### Project Structure

The project uses a component-based architecture with:

- `src/components/` - Reusable UI components
- `src/hooks/` - Custom React hooks
- `src/utils/` - Utility functions
- `tooling/` - Development tools and templates

### Code Generation

Generate new components quickly:

```bash
pnpm create
```

This will prompt you to create components, hooks, or utilities with pre-configured templates.
