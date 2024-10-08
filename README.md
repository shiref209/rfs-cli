# RFS-CLI (React Folder Structure CLI)

RFS-CLI is a command-line tool designed to quickly generate a standardized folder structure for React projects. It creates a consistent folder and file organization for pages, higher-order components (HOCs), and regular components.

## Features

- Automatically generates a structured directory layout for React projects
- Creates boilerplate files for pages, HOCs, and components
- Ensures consistent naming conventions across your project
- Generates TypeScript files with basic React component structure
- Provides verbose output option for detailed creation process information
- Compatible with all versions of React

## Installation

You can install RFS-CLI globally using npm:

```bash
npm install -g rfs-cli
```

Or using yarn:

```bash
yarn global add rfs-cli
```

## Usage

After installation, you can use the `rfs` command followed by the module name you want to create:

```bash
rfs <module-name> [options]
```

### Options

- `-v, --verbose`: Enable verbose output for detailed information about the creation process.

### Example

To create a module named "UserProfile":

```bash
rfs UserProfile
```

This will create the following structure:

```
src/
├── pages/
│   └── userProfile/
│       ├── userProfile.page.tsx
│       └── index.ts
├── hoc/
│   └── userProfile/
│       ├── userProfile.hoc.tsx
│       └── index.ts
└── components/
    └── userProfile/
        ├── userProfile.content.tsx
        └── index.ts
```

## Project Structure

RFS-CLI generates the following structure for each module:

- `pages/`: Contains page components
- `hoc/`: Contains Higher-Order Components
- `components/`: Contains regular React components

Each directory contains:

- A main component file (e.g., `userProfile.page.tsx`)
- An `index.ts` file for easy importing

## Development

To set up the project for development:

1. Clone the repository:

   ```bash
   git clone https://github.com/shiref209/rfs-cli.git
   ```

2. Install dependencies:

   ```bash
   cd rfs-cli
   npm install
   ```

3. Link the package locally:
   ```bash
   npm link
   ```

Now you can use `rfs` command in your terminal, and it will use your local development version.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the ISC License.

## Author

Sherif Hamam <shiref.hamam2@gmail.com>

## React Compatibility

RFS-CLI is designed to work with all versions of React. However, please note that some generated code might use features from newer React versions. If you're using an older version of React, you may need to adjust the generated code accordingly.

## Issues

If you encounter any problems or have suggestions, please file an issue on the [GitHub repository](https://github.com/shiref209/rfs-cli/issues).

## Acknowledgements

Thanks to my senior Mostafa Sadeik who inspired me for this CLI and taught me the structure that I've been using for a year now.
