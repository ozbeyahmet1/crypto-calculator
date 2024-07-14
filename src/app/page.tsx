import type { Metadata } from 'next';

import HomepageView from '../ui/views/homepage';

export const metadata: Metadata = {
  title: 'StableJack',
  description: 'Crypto Calculator',
};
export default function Home() {
  return <HomepageView />;
}
