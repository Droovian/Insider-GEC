/** @type {import('next').NextConfig} */
const headers = [
    "Accept", "Accept-Version", "Content-Length",
    "Content-MD5", "Content-Type", "Date", "X-Api-Version",
    "X-CSRF-Token", "X-Requested-With",
];

const nextConfig = {

    async headers(){
        return [
            {
                source: "/api/(.*)",
                headers: [
                    { key: "Access-Control-Allow-Credentials", value: "true" },
                    {  key: 'Access-Control-Allow-Origin', value: `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}` },
                    { key: "Access-Control-Allow-Methods", value: "GET,POST" },
                    { key: "Access-Control-Allow-Headers", value: headers.join(", ") }
                ]
            }
        ];
    },
    experimental:{
        missingSuspenseWithCSRBailout: false,
    }
};

export default nextConfig;
