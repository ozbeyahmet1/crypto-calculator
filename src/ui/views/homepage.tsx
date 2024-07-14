import dynamic from 'next/dynamic';

export const TabsDemo = dynamic(() => import('../components/tabs').then((mod) => mod.TabsDemo), { ssr: false });
export default function HomepageView() {
  return (
    <div className="container mt-5">
      <TabsDemo />
    </div>
  );
}
