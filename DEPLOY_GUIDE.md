# Univo MVP Deployment & Cleanup Guide

## 1. Quick Deployment to Vercel (Recommended)
You don't need to change your folder structure to deploy!

1.  **Stop Local Server**: Press `Ctrl + C` in your terminal.
2.  **Push to GitHub**:
    ```bash
    # Run these in your 'campus-gazette' folder
    git remote add origin https://github.com/Keremdogan1/univo-mvp.git
    git push -u origin master
    ```
    *(Make sure to create an empty repo on GitHub first named `univo-mvp`)*

3.  **Deploy on Vercel**:
    *   Go to [Vercel.com/new](https://vercel.com/new).
    *   Import your `univo-mvp` repository.
    *   **Root Directory**: Vercel should auto-detect it. If asked, select `.` (current root).
    *   **Environment Variables**: Add your `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, and `GEMINI_API_KEY`.
    *   Click **Deploy**.

## 2. Organizing the Folder (Optional Cleanup)
If you *really* want to remove the outer `campus-gazette` folder to make it cleaner locally:

**⚠️ WARNING: Stop `npm run dev` before doing this!**

1.  **Move Files Up**:
    ```powershell
    # In c:\ProgrammingFile\Web\Complete_Projects\Univo
    move campus-gazette\* .
    move campus-gazette\.git .
    move campus-gazette\.env.local .
    move campus-gazette\.gitignore .
    ```
2.  **Delete Empty Folder**:
    ```powershell
    rmdir campus-gazette
    ```
3.  **Restart**:
    Now your project is directly in `Univo`. You can run `npm run dev` from there.
