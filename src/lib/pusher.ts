import PusherServer from 'pusher'
import PusherClient from 'pusher-js'

export const pusherServer = new PusherServer ({
    appId: process.env.PUSHER_APP_ID!,
    key:process.env.PUSHER_KEY!,
    secret:process.env.PUSHER_SECRET!,
    cluster: "ap2",
});

export const pusherClient = new PusherClient("c8f14f466e2ca8bd98b9", {
    cluster: 'ap2',
});