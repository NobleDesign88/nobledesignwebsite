# Noble Design Portfolio Website

Open `index.html` in a web browser to view the site. No installation is needed.

## Make it yours

1. Replace `hello@nobledesign.com` with your real business email address and update the three social-media `href="#"` links.
3. Update the About text, services, skills, project names, descriptions, and years to match your experience.
4. The three coloured Work blocks are intentionally image-free placeholders. To use real images, create an `assets` folder next to `index.html`, put your images there, then replace an image block with something like:
   ```html
   <img src="assets/my-project.jpg" alt="Description of my project" />
   ```
   Add this to `style.css` so the images fill the cards neatly:
   ```css
   .project-image img { width: 100%; height: 100%; object-fit: cover; }
   ```
5. For a profile photo, replace the `<span>R</span>` inside `.profile-card` with an `<img>` element and add:
   ```css
   .profile-card img { width:100%; height:100%; object-fit:cover; border-radius:inherit; }
   ```

The contact form is intentionally an email link, so it works without a server. You can later connect it to Formspree, Netlify Forms, or a backend if you want direct form submissions.
