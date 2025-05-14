# Free Hosting Options for Your Gut Health Dashboard

Here are some excellent free options for hosting your static Gut Health Dashboard website. These platforms are well-suited for personal projects and offer generous free tiers.

## 1. GitHub Pages

**Best for:** Users already familiar with Git and GitHub.

**Features:**
- Free hosting directly from your GitHub repository.
- Custom domain support.
- Automatic deployment on push (GitHub Actions).

**How to Deploy:**
1.  **Create a GitHub Repository:** If you don't have one, create a new public repository on GitHub (e.g., `gut-health-dashboard`).
2.  **Upload Your Files:**
    *   Initialize a Git repository in your `/home/ubuntu/gut_health_dashboard` folder:
        ```bash
        cd /home/ubuntu/gut_health_dashboard
        git init
        git add .
        git commit -m "Initial commit of dashboard files"
        ```
    *   Add your GitHub repository as a remote and push the files:
        ```bash
        git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY_NAME.git
        git branch -M main
        git push -u origin main
        ```
3.  **Enable GitHub Pages:**
    *   Go to your repository's **Settings** tab on GitHub.
    *   Navigate to the **Pages** section in the left sidebar.
    *   Under "Build and deployment", select **Deploy from a branch** as the source.
    *   Choose the `main` branch (or whichever branch you pushed your code to) and the `/ (root)` folder.
    *   Click **Save**.
4.  **Access Your Site:** GitHub will provide you with a URL (e.g., `https://YOUR_USERNAME.github.io/YOUR_REPOSITORY_NAME/`). It might take a few minutes for the site to become live.

## 2. Netlify

**Best for:** Ease of use, drag-and-drop deployment, and powerful features like continuous deployment, form handling, and serverless functions (though not needed for this static site).

**Features:**
- Drag-and-drop deployment.
- Continuous deployment from Git (GitHub, GitLab, Bitbucket).
- Free SSL certificates.
- Custom domain support.
- Generous free tier.

**How to Deploy (Drag-and-Drop):**
1.  **Prepare Your Files:** Ensure all your website files (HTML, CSS, JS, data, img folders) are in a single folder (e.g., `gut_health_dashboard`). You can use the `gut_health_dashboard.zip` file I will provide.
2.  **Sign Up/Log In:** Go to [Netlify](https://www.netlify.com/) and sign up for a free account or log in.
3.  **Deploy:**
    *   Go to your Netlify dashboard.
    *   Drag the `gut_health_dashboard` folder (or the unzipped contents of `gut_health_dashboard.zip`) into the deployment area that says "Drag and drop your site output folder here".
4.  **Access Your Site:** Netlify will automatically build and deploy your site, providing you with a unique URL (e.g., `random-name-12345.netlify.app`). You can customize this subdomain or add a custom domain later.

**How to Deploy (Git-based):**
1.  **Push to Git Provider:** Ensure your code is on GitHub, GitLab, or Bitbucket (as described in GitHub Pages section).
2.  **Sign Up/Log In to Netlify.**
3.  **New Site from Git:**
    *   Click "Add new site" -> "Import an existing project".
    *   Connect to your Git provider (e.g., GitHub).
    *   Select the repository containing your dashboard code.
    *   Deployment settings are usually auto-detected for static sites. Ensure the "Build command" is empty and the "Publish directory" is set to the root of your project (or the folder containing `index.html`).
    *   Click "Deploy site".

## 3. Vercel

**Best for:** Developers, especially those working with Next.js (though excellent for static sites too). Offers a great developer experience and performance.

**Features:**
- Seamless Git integration (GitHub, GitLab, Bitbucket).
- Automatic deployments.
- Global CDN for fast loading.
- Free SSL certificates.
- Custom domain support.
- Generous free tier for personal projects.

**How to Deploy:**
1.  **Push to Git Provider:** Ensure your code is on GitHub, GitLab, or Bitbucket.
2.  **Sign Up/Log In:** Go to [Vercel](https://vercel.com/) and sign up with your Git provider account or log in.
3.  **Import Project:**
    *   From your Vercel dashboard, click "Add New..." -> "Project".
    *   Select your Git repository containing the dashboard files.
    *   Vercel will usually auto-detect it as a static site (or you can select "Other" for the framework preset).
    *   The build and output settings should be fine by default for a static site (no build command needed, root directory as output).
    *   Click "Deploy".
4.  **Access Your Site:** Vercel will build and deploy your site, providing you with a URL.

**General Tips for All Platforms:**
-   Ensure your main HTML file is named `index.html` in the root of your deployment folder.
-   All asset paths (CSS, JS, images, data files) in your `index.html` should be relative and correct (e.g., `css/custom.css`, `data/dashboard-data.json`). The current structure of the `gut_health_dashboard` folder is already set up this way.

I will provide the `gut_health_dashboard` folder as a zip archive. You can unzip it and use the folder directly for drag-and-drop deployment on Netlify, or initialize a Git repository within it to deploy to GitHub Pages or Vercel.

