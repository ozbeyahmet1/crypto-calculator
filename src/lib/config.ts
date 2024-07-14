import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { QueryClient } from '@tanstack/react-query';
import { arbitrum, base, mainnet, optimism, polygon, sepolia } from 'wagmi/chains';

/**
 * Default configuration for the application.
 */
export const config = getDefaultConfig({
  appName: 'StableJack',
  projectId: `${process.env.NEXT_PUBLIC_PROJECT_ID}`,
  chains: [mainnet, polygon, optimism, arbitrum, base, sepolia],
  ssr: true,
});

export const queryClient = new QueryClient();
