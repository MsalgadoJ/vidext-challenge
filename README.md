## <img src="/public/readme-app.png">

---

## About

Video player page built as part of the Vidext's hiring process.

## Main features

- The user can access a list of sample videos provided with title, description, views and likes.
- The user can login using google auth.
- The user can reproduce the videos but only the views of authenticated users are counted.
- Only authenticated users can like a video.
- Error pages included:
  - 404 Page not found
  - Video not found (videos/invalid-id)
  - Error page (for other possible errors)

## Technologies

- NextJs
- tRPC
- Drizzle
- Next Auth (with Google)
- Tailwind
- Chandcn
- Media-chrome

<br>

## Getting Started

#### Node version

Make sure you have installed a node version > 18.17.0

```
node -v
```

If not, try installing this version by running nvm

```
nvm install 18.17.0
```

Make sure to use it

```
nvm use 18.17.0
```

<br>

#### Project dependencies

Install all required dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

<br>

#### Environment variables

Create a .env.local file in the root of the project and add the environmental variables provided by the developer

```
touch .env.local
```

<br>

#### Run

Start the app by running the development

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

The app will be running @ [http://localhost:3000](http://localhost:3000).

---

Deverloped by [Mayra Rincones](https://www.linkedin.com/in/mayrarincones/) - 2024

<br>

_This is a [Next.js](https://nextjs.org/) project bootstrapped with [create-next-app](https://github.com/vercel/next.js/tree/canary/packages/create-next-app)_
