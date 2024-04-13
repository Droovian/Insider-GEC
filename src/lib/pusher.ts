import PusherServer from 'pusher'
import PusherClient from 'pusher-js'

export const pusherServer = new PusherServer ({
    appId: "1777188",
    key:"c8f14f466e2ca8bd98b9",
    secret:"e0edf061f0ebd8f3ec3a",
    cluster: "ap2",
});

export const pusherClient = new PusherClient("c8f14f466e2ca8bd98b9", {
    cluster: 'ap2',
});