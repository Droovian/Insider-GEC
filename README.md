# GEC Insider

We're a group of computer science students on a mission to create the ultimate platform for our college community to connect and discuss anything and everything – anonymously.

Building an anonymous Reddit clone for our college (but way cooler).

Think Reddit, but tailored to the inside jokes, and campus happenings that define our college experience.

## Contributing

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

Install the dependencies:

```bash
npm install
```

Fill up the following env variables

```
NEXT_PUBLIC_APP_URL=
DATABASE_URL=

RESEND_API_KEY=
NEXTAUTH_SECRET=test

PUSHER_APP_ID=
PUSHER_KEY=
PUSHER_SECRET=

UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
```

Run the development server.

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Learn More

To learn more about the project, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Shadcn-ui](https://ui.shadcn.com/) - Accessible, Customizable, Open Source components that you can copy and paste into your apps.
- [Resend](https://resend.com/overview) - A simple, elegant interface so you can start sending emails in minutes.

Your feedback and contributions are welcome! :)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
