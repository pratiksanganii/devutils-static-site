# 🛠️ DevTools - Client-Side Developer Utilities

A suite of fast, lightweight, and privacy-first developer utility tools built using **React 19, TypeScript, Vite, and Tailwind CSS**. 

Live Site: [devutils.pratiksangani.com](https://devutils.pratiksangani.com)

---

## 🔒 Why DevTools? (Privacy-First)

Most online utility tools (like JSON formatters or Base64 converters) send your input strings, credentials, or logs to third-party servers. When dealing with API responses, database records, or secret configurations, this presents a severe security risk.

**DevTools processes everything locally in the browser.** Your data never leaves your machine, ensuring 100% data privacy and near-instant processing.

---

## ✨ Features

- **JSON Formatter:** Formats (with custom spaces), minifies, and validates raw JSON strings. Displays descriptive line-numbered syntax errors if validation fails.
- **UUID Generator:** Generates single or bulk cryptographically secure UUID v4 tokens using browser-native cryptography. Features toggles for Uppercase, hyphens, and braces.
- **Base64 Encoder/Decoder:** Safely converts text to Base64 and back. Custom-built to be **Unicode-Safe** (fully supports emojis 🚀 and international character sets without throwing browser crashes).
- **Responsive Layout:** Clean, minimalist UI matching Vercel and GitHub styling. Collapses gracefully for mobile viewports.
- **Persistent Theme Engine:** Responsive dark and light mode toggle that saves user preference in `localStorage` and falls back to system preferences.

---

## 🚀 Local Development

Follow these steps to run the application locally on your machine:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/devutils-static-site.git
   cd devutils-static-site
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Start the local development server:**
   ```bash
   npm run dev
   ```
4. **Compile production build:**
   ```bash
   npm run build
   ```
5. **Run linter checks:**
   ```bash
   npm run lint
   ```

---

## ☁️ AWS Static Hosting Deployment

The compiled application can be hosted on AWS at **$0.00 / month (100% Free)**.

We serve the static assets from a private **S3 bucket** through a **CloudFront CDN** distribution utilizing **Origin Access Control (OAC)** for security, **ACM** for HTTPS SSL, and **Cloudflare** for DNS.

For a detailed step-by-step manual setup guide, see [DEPLOYMENT.md](DEPLOYMENT.md).

---

## 📄 License

This project is licensed under the MIT License. Feel free to use, modify, and distribute it.
