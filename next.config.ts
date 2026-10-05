import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  turbopack: {
    resolveAlias: {
      '@': path.join(process.cwd(), 'src'),
    },
  },
};

export default nextConfig;
