# Architecture Overview & Project Scope

## Core Stack
- **Frontend:** React 19, TypeScript, Vite, Tailwind CSS, Lucide Icons, React Router.
- **Build Output:** `/dist` static assets.

## AWS Infrastructure Target
- **S3 Bucket:** Private hosting (`tools.yourdomain.com`), public access blocked.
- **CloudFront:** CDN distribution utilizing Origin Access Control (OAC) to read from S3 securely.
- **ACM:** SSL Certificate generated in `us-east-1` attached to CloudFront.
- **SPA Routing Fix:** CloudFront custom error pages mapping 404 and 403 errors to `/index.html` with a 200 OK status code.

## CI/CD Workflow Target
- **Trigger:** Push to `main` branch.
- **Pipeline (GitHub Actions):** Checkout -> Install deps -> Lint -> Vite Build -> Sync `/dist` to S3 -> Invalidate CloudFront cache.