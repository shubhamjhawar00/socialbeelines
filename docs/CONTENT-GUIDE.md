# Social Beelines — Content Guide

This guide is for the Social Beelines team (no coding needed). You can edit site
content and manage the blog through the built-in content manager. Changes are
saved, the site rebuilds automatically, and your edits go live a minute or two
later.

## 1. Logging in

1. Go to `https://<your-site>.netlify.app/admin/`.
2. Sign in with the email invited to the site (Netlify Identity).
3. You'll see the content manager with sections in the left sidebar.

> The brand colours and logo are intentionally **not** editable — they stay
> consistent everywhere by design.

## 2. Managing the blog

- **New post**: Blog Posts → **New Blog Post**. Fill in the title, excerpt,
  author, publish date, optional cover image, tags, and the body. Leave
  **Draft** off to publish.
- **Edit**: click any post, make changes, publish.
- **Unpublish**: open the post, turn **Draft** on, and publish the change. The
  post disappears from the blog and its link stops working after the rebuild.
- **Slugs** come from the title and must be unique. If two posts would share a
  URL, rename one.

## 3. Editing site sections

Each section has its own editor:

- **Hero** — the big headline, description, and button.
- **Services** — add/edit/remove any of the services.
- **Packages** — names, prices, and features. Prices are shown as *starting*
  monthly prices.
- **Portfolio / Work** — showcase real projects (replace the sample entries).
- **Testimonials** — replace the placeholder with real client quotes.
- **Why Us**, **Process**, **Marquee**, **Contact details**, **Social Links**,
  **SEO & Analytics**.

Add an item to a list (e.g. a new service) and it appears automatically — no
code changes needed.

## 4. Images and the Image Slots

Anywhere you see an image field (hero, portfolio cover, blog cover, testimonial
avatar, social/SEO image), you can upload an image. If a slot is left empty, the
site shows a neutral placeholder, so nothing ever looks broken.

### Adding images exported from Figma

The design reference lives in Figma:
`https://www.figma.com/deck/dVqeiJPgmcyGgB7aRj7Mad/Portfolio`

To use those visuals on the site:

1. Open the Figma file.
2. Select the frame/image you want, then **Export** (right sidebar) as **PNG**
   or **JPG** (2x for crisp results).
3. In the content manager, open the section with the image field and **upload**
   the exported file — or drop files into `public/images/` if you're working in
   the code.
4. Always add descriptive **alt text** for images that convey meaning
   (accessibility requirement).

## 5. Good practices

- Keep claims honest — avoid promising guaranteed leads, sales, followers, or
  rankings.
- Prices are starting points; most work is customised per client.
- Preview your change, then publish.
