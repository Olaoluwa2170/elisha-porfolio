# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)

## Blog & admin panel

The site has a `/blog` section and a `/admin` panel for publishing posts without touching code.

**Content model**: posts live in `src/content/blog/posts.json`. The admin panel edits this file directly via the GitHub API, so publishing a post is a real commit to `main` — your Vercel project then redeploys automatically. There's no database.

**One-time setup**:

1. Set an admin passphrase:
   ```sh
   node scripts/hash-password.mjs "your-passphrase"
   ```
   Put the resulting hash in a local `.env` file as `VITE_ADMIN_PASSWORD_HASH=...` (see `.env.example`), and add the same variable to your Vercel project's Environment Variables (Production + Preview). Redeploy for it to take effect.
2. Create a GitHub [fine-grained personal access token](https://github.com/settings/tokens?type=beta) scoped to just this repo, with **Contents: Read and write** permission.
3. Open `/admin` on the live site, enter the passphrase, then paste the token into the GitHub connection panel (owner/repo/branch default to this repo — adjust if needed) and hit "Save settings". The token is stored only in your browser's local storage.

**Publishing**: fill in the post form (title, topic, description, cover image — upload a file or paste a URL — and Markdown content) and hit Publish. It commits straight to `posts.json` (and to `public/blog/` for an uploaded cover), and the post appears live once the redeploy finishes (usually under two minutes).

**Social previews**: link-sharing apps (Twitter/X, Slack, WhatsApp, LinkedIn, ...) don't run JavaScript, so a plain client-rendered SPA can't give them a per-post preview card. A `postbuild` script (`scripts/prerender-blog.mjs`) generates a static HTML file per post with the right `<title>`/description/`og:image` baked in; `vercel.json`'s `cleanUrls` serves those for the exact post URLs while everything else still falls through to the SPA. If you move off Vercel, keep an equivalent "serve `dist/blog/<slug>.html` for `/blog/<slug>`" rule.
