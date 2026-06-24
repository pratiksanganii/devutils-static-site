# Feature Specifications

## Core Pages
- `/` (Landing Page): Hero section, modern minimal UI, links to previewed tools.
- `/about`: Project purpose, tech stack overview, text-based AWS architecture flow.
- `/tools`: Hub page listing all available tools.

## MVP Tools
1. **JSON Formatter (`/tools/json-formatter`):**
   - Inputs: Raw JSON string text area.
   - Operations: Format, Minify, Validate, Copy to Clipboard.
   - Outputs: Clean syntax panel or descriptive validation error message.
2. **UUID Generator (`/tools/uuid-generator`):**
   - Inputs: Select count configuration (1, 5, 10).
   - Operations: Generate UUID v4 array, Copy all.
3. **Base64 Encoder/Decoder (`/tools/base64`):**
   - Inputs: Input text area.
   - Operations: Encode, Decode, Clear text, Copy output.

## Design Constraints
- Strict dark/light theme persistence utilizing local storage or fallback to system preferences via media match queries.