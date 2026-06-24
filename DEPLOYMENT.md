# AWS Static Hosting Deployment Guide

This guide details the step-by-step manual setup of a secure, production-ready static website hosting architecture on Amazon Web Services (AWS). It covers S3 private hosting, CloudFront CDN edge delivery, ACM SSL certifications, custom subdomain DNS setups, and React Router Single Page Application (SPA) routing fixes.

---

## 💰 Monthly Cost Estimation

Because the application runs entirely client-side, the monthly operational cost for this hosting stack is **$0.00 (100% Free)** under normal traffic volumes:

| Service | Component | Pricing Detail | Estimated Monthly Cost |
| :--- | :--- | :--- | :--- |
| **Amazon S3** | Storage (Standard) | $0.023 per GB (Build size is only ~350 KB) | **$0.00** |
| | Requests (GET/PUT) | Free tier: 20,000 GETs / 2,000 PUTs free. Only charged during code deployments. | **$0.00** |
| **Amazon CloudFront** | Data Transfer Out | **1 TB (1,000 GB) per month is permanently free** | **$0.00** |
| | HTTP/HTTPS Requests | 10 million requests per month are permanently free | **$0.00** |
| **AWS ACM** | SSL/TLS Certificate | Public certificates and renewals are **100% free** | **$0.00** |
| **DNS Provider** | Custom Subdomain | Creating a CNAME record on your existing domain provider (e.g. Cloudflare, Namecheap, GoDaddy) is **free** | **$0.00** |
| **Total** | | | **$0.00 / month** |

*Note: If you use AWS Route 53 as your DNS host rather than keeping your registrar's default free DNS, Route 53 charges **$0.50 per month** per hosted zone.*

---

## 🏗️ Architecture Design

```
[ Developer ] --( Upload dist/ )--> [ Amazon S3 ] (Private Bucket)
                                           ^
                                           | (Secure read via OAC)
[ End User ] <---( HTTPS / ACM )---- [ CloudFront CDN ] (Edge Cache)
```

---

## 🛠️ Step-by-Step Setup Instructions

### Step 1: Amazon S3 Bucket Creation
Create a private S3 bucket to store the compiled static assets.

1. Open the **Amazon S3 Console** and click **Create bucket**.
2. **Bucket name:** Enter a globally unique name for your S3 bucket (e.g. `devutils-static-site-assets` or `tools-yourdomain-assets`). *Note: Unlike S3 direct website hosting, because we are using CloudFront, the S3 bucket name does NOT need to match your custom domain.*
3. **Bucket type:** Select **General Purpose** (standard storage). *Do NOT select "Directory" (S3 Express One Zone) as it is designed for ultra-low latency database query workloads, carries a high hourly base cost, and is not free-tier eligible.*
4. **Bucket namespace:** Keep the default **Global namespace** selected. *This ensures maximum compatibility with standard deployment tools, CLI sync operations, and CloudFront OAC settings.*
5. **AWS Region:** Choose your nearest local region (e.g. `ap-south-1` Mumbai if you are in India) to optimize file upload speeds.
6. **Object Ownership:** Keep **ACLs disabled (recommended)**.
7. **Bucket Versioning:** Keep **Disable** selected. *Since this is a compiled static site, versioning old bundle files in S3 is unnecessary and will gradually increase storage costs. Source code history is already tracked in Git.*
8. **Block Public Access settings for this bucket:** Ensure **Block all public access** is **checked**. (We do NOT run S3 static web hosting directly; instead, CloudFront reads from S3 securely).
9. **Default encryption:** Choose **Server-side encryption with Amazon S3 managed keys (SSE-S3)**. *Do NOT select AWS KMS (SSE-KMS) because KMS keys incur active lookup fees on every request and require additional IAM decryption configurations.*
10. **Bucket Key:** Keep **Enable** selected.
11. **Object Lock:** Keep **Disable** selected. *Object Lock prevents files from being overwritten or deleted, which would block your ability to deploy updates.*
12. Click **Create bucket**.

---

### Step 2: AWS ACM SSL Certificate Setup
Generate a free SSL certificate to serve the site over HTTPS.

> [!IMPORTANT]
> **Region Constraint:** You **must** switch your AWS Console region to **`us-east-1` (N. Virginia)** before requesting this certificate. CloudFront can only attach SSL certificates that are provisioned in the `us-east-1` region.

1. Switch your AWS Console region to **`us-east-1` (N. Virginia)**.
2. Open the **AWS Certificate Manager (ACM) Console** and click **Request**.
3. Select **Request a public certificate** and click **Next**.
4. **Fully qualified domain name:** Enter your subdomain (e.g. `tools.yourdomain.com`).
5. **Validation method:** Select **DNS validation (recommended)**.
6. **Key algorithm:** Select **RSA 2048** (default, universally compatible with all browsers and CloudFront).
7. **Allow Export / Tags:** Leave these as default (Allow Export is disabled/not applicable for public certificates, and tags are optional metadata).
8. Click **Request**.
9. Once requested, click on the Certificate ID. Under **Domains**, click **Create records in Route 53** (if using Route 53) OR copy the **CNAME name** and **CNAME value** and add them as a CNAME record in your domain registrar's DNS settings (GoDaddy, Cloudflare, etc.) to validate ownership.
8. Wait for the certificate status to change to **Issued** (takes 5–15 minutes after DNS validation).

---

### Step 3: CloudFront Distribution Setup
Create the CDN distribution to serve files securely and quickly from edge locations.

1. Open the **Amazon CloudFront Console** and click **Create distribution**.
2. **If presented with a "Choose a Plan" (Simplified Creation Flow):**
   - Select **Free plan** (or standard free-tier option).
   - **Distribution name:** Enter a friendly name (e.g. `DevTools CDN`).
   - **Description:** Optional (e.g. `CDN distribution for DevTools static site`).
   - **Distribution type:** Keep **Single website or app** selected.
   - **Domain (Route 53 managed domain):** Skip / Leave blank. *Because your DNS is hosted externally (e.g. Cloudflare), you will configure the custom subdomain and attach the ACM SSL certificate in the alternate domain names (CNAMEs) settings later.*
   - **Tags:** Leave blank/empty.
3. **Origin Settings (Origin Configuration):**
   - **Origin domain:** Select your S3 bucket from the dropdown.
   - **Origin path:** Leave blank/empty.
   - **Origin access (Allow private S3 bucket access to CloudFront):** Choose **Allow private S3 bucket access to CloudFront - Recommended** (which enables OAC).
   - **Origin settings:** Choose **Use recommended origin settings**.
   - **Cache settings:** Choose **Use recommended cache settings tailored to serving S3 content**.
4. **Default cache behavior:**
   - **Viewer protocol policy:** Select **Redirect HTTP to HTTPS**.
   - **Allowed HTTP methods:** Select **GET, HEAD**.
5. **WAF & Advanced Settings (If using Standard Flow):**
   - **Web Application Firewall (WAF):** Select **Do not enable security protections** (to keep setups simple and free under light traffic).
   - **Price class:** Select **Use all edge locations (best performance)**. *This ensures that users in India and Asia are routed to regional Edge locations (Mumbai, Chennai, etc.) for fast loadings. This is covered under the 1 TB/month free tier data transfer.*
   - **Alternate domain name (CNAME):** Click **Add item** and enter your subdomain (e.g. `tools.yourdomain.com`).
   - **Custom SSL certificate:** Select the ACM certificate you created in `us-east-1` from the dropdown list.
   - **Default root object:** Enter `index.html`.
6. Click **Create distribution**.

---

### Step 3.5: Post-Creation Settings (Required for Free Plan Users)
If you used the simplified **Free plan** wizard and skipped the Route 53 domain step during creation, you **must** update your settings manually after the distribution is created to map your custom subdomain and enable SSL:

1. Open your distribution in the **CloudFront Console**.
2. Under the **General** tab, scroll down to the **Settings** section and click **Edit**.
3. **Alternate domain name (CNAME):** Click **Add item** and enter your custom subdomain (e.g. `tools.yourdomain.com`).
4. **Custom SSL certificate:** Check the dropdown and select the ACM certificate you created in `us-east-1` for your domain.
5. **Default root object:** Enter exactly **`index.html`**. *(Crucial: leaving this blank causes a `403 Forbidden` directory listing error when users visit the root domain).*
6. Click **Save changes** and wait 1–3 minutes for deployment.

---

### Step 4: S3 Bucket Policy Update
Authorize CloudFront to read files from the S3 bucket.

> [!NOTE]
> **Auto-Applied Policy:** If you used the simplified *Free Plan* wizard and kept the *Allow private S3 bucket access to CloudFront* option enabled, CloudFront has already automatically applied the S3 bucket policy for you behind the scenes. You can verify this by checking your S3 Bucket -> **Permissions** -> **Bucket Policy**. If you see a policy for `AllowCloudFrontServicePrincipalReadOnly`, you can skip this step and proceed directly to **Step 5**.

1. Once the CloudFront distribution is created, a warning banner will appear showing: *"The S3 bucket policy needs to be updated..."* (if you are using the standard creation flow).
2. Click the **Copy policy** button in that banner.
3. Open the **Amazon S3 Console** in a new tab, select your bucket, and go to the **Permissions** tab.
4. Scroll down to **Bucket policy** and click **Edit**.
5. Paste the copied JSON policy into the editor. It will resemble this:
   ```json
   {
     "Version": "2012-10-17",
     "Statement": {
       "Sid": "AllowCloudFrontServicePrincipalReadOnly",
       "Effect": "Allow",
       "Principal": {
         "ServicePrincipal": "cloudfront.amazonaws.com"
       },
       "Action": "s3:GetObject",
       "Resource": "arn:aws:s3:::<your-bucket-name>/*",
       "Condition": {
         "StringEquals": {
           "AWS:SourceArn": "arn:aws:cloudfront::<your-account-id>:distribution/<your-distribution-id>"
         }
       }
     }
   }
   ```
6. Click **Save changes**.

---

### Step 5: React Router SPA Routing Configuration
Map standard S3 directory errors to the index router to prevent 403/404 breaks on page refreshes.

1. Open your distribution in the **CloudFront Console** and click the **Error pages** tab.
2. Click **Create custom error response**.
3. **HTTP error code:** Select **403: Forbidden**.
4. **Customize error response:** Select **Yes**.
5. **Response page path:** Enter `/index.html`.
6. **HTTP response code:** Select **200: OK**.
7. Click **Create**.
8. Click **Create custom error response** again.
9. **HTTP error code:** Select **404: Not Found**.
10. **Customize error response:** Select **Yes**.
11. **Response page path:** Enter `/index.html`.
12. **HTTP response code:** Select **200: OK**.
13. Click **Create**.

---

### Step 6: Custom Domain DNS Setup
Point your subdomain to the CloudFront CDN endpoint.

1. Open your CloudFront distribution and copy the **Distribution domain name** (e.g. `dxxxxxxxxxxxxx.cloudfront.net`).
2. Go to your DNS hosting provider's dashboard (e.g. Cloudflare, Namecheap, GoDaddy).
3. Add a new DNS record:
   - **Type:** `CNAME`
   - **Name/Host:** Your subdomain prefix (e.g. `tools`)
   - **Value/Target:** The CloudFront distribution domain name you copied.
   - **TTL:** Auto or 3600 seconds.
4. Save the record.

> [!TIP]
> **Cloudflare Users:** If your DNS is hosted on Cloudflare, change the **Proxy Status** toggle from *Proxied (Orange cloud)* to **DNS Only (Grey cloud)**. Proxying Cloudflare to another CDN (CloudFront) can trigger caching conflicts, SSL handshake loop errors, and increase connection latency. If you must keep the proxy enabled, ensure Cloudflare's SSL/TLS mode is set to **Full (strict)**.

---

## 🚀 How to Deploy the Application

Once the infrastructure is set up, deploying updates is straightforward:

### Method A: AWS Console (Manual Upload)
1. In your local workspace, compile the static files:
   ```bash
   npm run build
   ```
2. Open the **Amazon S3 Console** and click on your bucket.
3. Select and delete any outdated files (if updating).
4. Click **Upload**, and drag-and-drop the *contents* of your local `dist/` directory (not the folder itself) into S3.
5. Click **Upload**.

### Method B: AWS CLI (Recommended for Speed)
1. Install and configure the AWS CLI.
2. Run the build and sync command:
   ```bash
   npm run build
   aws s3 sync dist/ s3://<your-bucket-name> --delete
   ```

### ⚡ Cache Invalidation
CloudFront caches static files at edge locations. When you upload code changes, invalidate the cache to make them live instantly:
1. Open the **CloudFront Console** and click on your distribution.
2. Go to the **Invalidations** tab.
3. Click **Create invalidation**.
4. In **Object paths**, enter `/*` to invalidate all files.
5. Click **Create invalidation**. (It will complete in 1–2 minutes).
