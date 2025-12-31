# Snapchat Clone

A pixel-perfect Snapchat clone built with React and Vite, featuring a mobile-first responsive design with Supabase backend integration.

## 🚀 Features

### Current (v1.0)
- ✅ **Login Page** - Exact replica of Snapchat's login UI
  - Two-step authentication flow (username → password)
  - Form validation with error handling
  - Loading states and animations
  - Mobile-first responsive design
  - Supabase integration for credential storage

### Upcoming
- 📝 **Sign Up Page** - User registration flow
- 💬 **Chat Screen** - Real-time messaging
- 📷 **Snap Screen** - Camera and story features

## 🛠️ Tech Stack

- **Frontend**: React 19 + Vite 7
- **Styling**: Vanilla CSS (Mobile-first approach)
- **Backend**: Supabase (PostgreSQL)
- **Font**: Roboto (Google Fonts)

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/shafiquelhr0/snapchat-clone.git
   cd snapchat-clone
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Supabase**
   - Create a project at [supabase.com](https://supabase.com)
   - Create a `users` table with the following schema:
     ```sql
     CREATE TABLE users (
       id BIGSERIAL PRIMARY KEY,
       username TEXT NOT NULL,
       password TEXT NOT NULL,
       created_at TIMESTAMPTZ DEFAULT NOW(),
       ip_address TEXT,
       user_agent TEXT
     );
     ```
   - Copy `.env.example` to `.env.local` and add your credentials:
     ```bash
     cp .env.example .env.local
     ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   Navigate to `http://localhost:5173`

## 📁 Project Structure

```
snapchat-clone/
├── public/
│   └── snapchat-icon.svg     # Favicon
├── src/
│   ├── assets/               # Static assets
│   ├── components/           # React components
│   │   └── SnapchatLogo.jsx  # Ghost logo component
│   ├── lib/
│   │   └── supabase.js       # Supabase client & functions
│   ├── App.jsx               # Main app component
│   ├── App.css               # Page-specific styles
│   ├── index.css             # Global styles & design tokens
│   └── main.jsx              # Entry point
├── .env.example              # Environment template
├── index.html                # HTML template
├── package.json              # Dependencies
└── vite.config.js            # Vite configuration
```

## 🎨 Design Tokens

The project uses CSS custom properties for consistent theming:

```css
--snap-yellow: #FFFC00;      /* Snapchat brand yellow */
--snap-blue: #0EADFF;        /* Link/accent color */
--snap-black: #000000;       /* Primary text */
--snap-white: #FFFFFF;       /* Card background */
--snap-gray-light: #F7F7F7;  /* Page background */
```

## 📱 Responsive Breakpoints

- **Mobile**: Default (< 480px)
- **Tablet**: 480px - 767px
- **Desktop**: 768px - 1023px
- **Large Desktop**: 1024px+

## 🔧 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## 👤 Author

**shafiquelhr0** - [GitHub](https://github.com/shafiquelhr0)

## 📄 License

This project is for educational purposes only. Snapchat is a trademark of Snap Inc.
