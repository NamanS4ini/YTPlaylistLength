import type { NextConfig } from "next";
import withFlowbiteReact from "flowbite-react/plugin/nextjs";

const nextConfig: NextConfig = {
  images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'i.ytimg.com',
          },
        ],
      },
};

export default withFlowbiteReact(nextConfig);