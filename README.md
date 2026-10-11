# Furaveri Maldives – Landing Page , Registration Form

A responsive landing page for a Maldives resort, with a full-screen background photo and a sign-up / log-in card. Both forms validate input in real time.

> **Note:** This is a front-end demo. Nothing is saved or sent to a server, and the resort details are placeholder text.

## Features

- Full-screen background image, with a gradient fallback if the image is missing
- Navbar and hero section with resort highlights
- Sign-up form (Name, Email, Password) and log-in form (Email, Password) on switchable tabs
- Real-time validation as the user types:
  - **Name:** must not be empty
  - **Email:** must be a valid email format
  - **Password:** minimum 6 characters
- Submit button stays disabled until every field is valid
- Show / Hide password toggle
- Success message after submitting
- Responsive layout for mobile, tablet and desktop

## Project structure

```
your-folder/
├── index.html
├── script.js
├── README.md
└── images/
    └── maldives.jpg
```

## Getting started

1. Put all the files in one folder.
2. Add your background photo as `images/maldives.jpg`.
3. Open `index.html` in a web browser.

No build step or installation is needed. An internet connection is required to load Tailwind CSS and Google Fonts.

## Customization

**Change the background image**
In `index.html`, find the `body{...}` rule in the `<style>` section and change the file name:

```css
background: url('images/your-photo.jpg') center / cover no-repeat fixed;
```

**Change how bright the background looks**
Edit `--overlay` at the top of the CSS. A higher value makes the text easier to read and the photo less bright.

```css
--overlay: rgba(255,255,255,.06);
```

**Change the text and branding**
Edit the headline, description, highlights and resort name directly in `index.html`.

**Change validation rules**
Edit the `rules` object at the top of `script.js`, for example to require 8 characters:

```js
password: v => v.length >= 8 ? '' : 'Password needs at least 8 characters.'
```

**Connect to a real backend**
In `script.js`, the `setupForm(...)` calls at the bottom run when a form is valid. Replace the `finish(...)` call there with a `fetch()` request to your server.

## Built with

- HTML5
- [Tailwind CSS](https://tailwindcss.com) (via CDN)
- Vanilla JavaScript
- Google Fonts: Cormorant Garamond and Jost

## Notes

- Only use background images you own or have permission to use.
- The forms do not store passwords or any other data.
- Never handle real passwords without a secure backend (HTTPS, hashing and server-side validation).

## License

Add your license here (for example MIT), or remove this section.
