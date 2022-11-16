/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    MONGODB_URI:
      "mongodb+srv://traveller-app:FpmugsXVDi4cfqol@cluster0.h1mekkd.mongodb.net/traveller-app?retryWrites=true&w=majority",
    AUTH_SECRET: "G&NZ^P*WHNco4VNeCjmxbUrPZ#jy!W",
    CUSTOM_UUID_DICTIONARY:
      "ABCDEFGHJKLMNPQRSTUVWYZ23456789abcdefghjklmnpqrstuvwyz",
    FOURSQUARE_APIKEY: "fsq37ErtVcHk8j6rnYbif1Seneg24Yd7YaUgSEJefvvC31Q=",
  },
  experimental: {
    allowMiddlewareResponseBody: true,
  },
};

module.exports = nextConfig;
