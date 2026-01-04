# Tinerii Vorbesc - Website

This is a website built for **Tinerii Vorbesc**, a non-profit organization (ONG) in Romania that empowers young people through podcasts, events, and community projects.

## About the Organization

**Tinerii Vorbesc** (Young People Speak) is a movement dedicated to giving young people in Romania a platform to express their ideas, share their stories, and create meaningful change. Founded by Carina Tănăselea, the organization focuses on:

- 🎙️ Podcasts featuring real conversations with young people and special guests
- 📅 Events, workshops, and conferences that bring young people together
- 🤝 Community projects that transform ideas into reality
- 💬 Creating spaces where young voices are truly heard

## Project Overview

This website serves as the digital home for Tinerii Vorbesc, providing:

- Information about the organization and its mission
- Podcast episodes and content
- Project showcases and initiatives
- Volunteer signup forms
- Sponsorship and support information
- Contact and collaboration opportunities
- Blog with reflections and resources

## Technology Stack

- **Framework**: Next.js 16.1.1
- **React**: 19.2.3
- **Styling**: CSS Modules
- **Language**: Romanian

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd tineriivorbesc
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
   - Create a `.env.local` file in the root directory
   - Add your YouTube API key (required for podcasts page):
     ```
     YOUTUBE_API_KEY=your-youtube-api-key-here
     ```
   - To get a YouTube API key:
     1. Go to [Google Cloud Console](https://console.cloud.google.com/)
     2. Create a new project or select an existing one
     3. Enable the YouTube Data API v3
     4. Create credentials (API Key)
     5. Copy the API key to your `.env.local` file

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── page.js            # Home page
│   ├── despre-noi/        # About Us page
│   ├── podcasturi/        # Podcasts page
│   ├── proiecte/          # Projects page
│   ├── servicii/          # Services page
│   ├── blog/              # Blog page
│   ├── sponsorizari/      # Support/Sponsorships page
│   ├── contact/           # Contact page
│   └── faq/               # FAQ page
├── components/            # Reusable components
│   ├── Navigation.js     # Main navigation
│   └── Footer.js         # Site footer
└── globals.css            # Global styles
```

## Features

- ✅ Fully responsive design (mobile-friendly)
- ✅ Modern, clean UI with gradient hero sections
- ✅ Interactive FAQ accordion
- ✅ Contact and volunteer forms
- ✅ Podcast episode showcase
- ✅ Project gallery
- ✅ Blog structure
- ✅ Sponsorship information and forms
- ✅ Form 230 (Tax Redirection Form) with signature capture
- ✅ Email notifications for form submissions (sent to carinatanaselea993@gmail.com)
- ✅ PDF form generation and download
- ✅ Dynamic YouTube video integration for podcasts page
- ✅ Automatic fetching of all videos from YouTube channel

## Email Notifications

The website includes automated email notifications for Form 230 submissions:

- **Recipient**: carinatanaselea993@gmail.com
- **Triggers**:
  1. When a user submits the Form 230 with their personal details
  2. When a user downloads the completed form image
- **Content**: Email includes all form data and signature (as attachment)

### Setting Up Email Credentials

1. Use a Gmail account for sending emails
2. Generate an App-Specific Password (not your regular password):
   - Visit: https://myaccount.google.com/apppasswords
   - Sign in with your Google account
   - Select "Mail" and "Other" (custom name)
   - Copy the 16-character password
3. Add to `.env.local`:
   ```
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=your-16-char-app-password
   ```

**Important**: Never commit `.env.local` to version control. It's already in `.gitignore`.

## Contact

For questions about the website or the organization:

- **Email**: carinadianatanaselea@gmail.com
- **Location**: Romania

## License

This project was built for Tinerii Vorbesc, a non-profit organization. All rights reserved.

---

**Note**: This website was built to support the mission of Tinerii Vorbesc in empowering young voices and creating positive change in Romania.
