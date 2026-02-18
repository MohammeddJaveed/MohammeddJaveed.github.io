# Mohammed Javeed Portfolio (Next.js)

Modern portfolio rebuilt with Next.js + TypeScript + Framer Motion.

## Run locally

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start development server:

   ```bash
   npm run dev
   ```

3. Open `http://localhost:3000`.

## Notes

- Contact form posts to Formspree endpoint: `https://formspree.io/f/xgvnjllv`
- Existing image assets are in `public/images`.

## Build Static Export (`out/`)

```bash
npm run build:static
```

This project uses `output: "export"` in `next.config.mjs`, so the static site is generated into `out/`.

## Deploy `out/` to AWS EC2 with Terraform

Terraform config is in `terraform/aws-ec2-static-site`.

1. Build the static export:
   ```bash
   npm run build:static
   ```
2. Copy vars example and fill your values:
   ```bash
   cd terraform/aws-ec2-static-site
   cp terraform.tfvars.example terraform.tfvars
   ```
3. Initialize and apply:
   ```bash
   terraform init
   terraform apply
   ```

This creates an EC2 instance with Nginx and uploads all files from `out/` to `/usr/share/nginx/html`.
