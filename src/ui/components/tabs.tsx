'use client';

import { useRouter } from 'next/navigation';

import { ProtocolSimulation } from '../containers/protocolSimulation';
import { TradingSimulation } from '../containers/tradingSimulation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './lib/tabs';

export function TabsDemo() {
  const router = useRouter();
  let selectedTab = 'protocol-simulation';
  if (window.location.hash.includes('protocol-simulation')) {
    selectedTab = 'protocol-simulation';
  } else if (window.location.hash.includes('trading-simulation')) {
    selectedTab = 'trading-simulation';
  } else {
    selectedTab = 'protocol-simulation';
  }

  return (
    <Tabs defaultValue={selectedTab} className="mt-6 lg:mt-12">
      <TabsList className="grid h-auto w-full grid-cols-2 bg-gray-200 dark:bg-gray-600 dark:bg-opacity-50 lg:w-[600px]">
        <TabsTrigger
          onClick={() => router.push('#protocol-simulation')}
          value="protocol-simulation"
          className="w-[150px] whitespace-break-spaces px-5 font-medium lg:w-auto lg:whitespace-normal lg:px-0">
          Protocol Simulation
        </TabsTrigger>
        <TabsTrigger
          onClick={() => router.push('#trading-simulation')}
          value="trading-simulation"
          className="w-[150px] whitespace-break-spaces font-medium lg:w-auto lg:whitespace-normal">
          Trading Simulation for xAVAX
        </TabsTrigger>
      </TabsList>
      <TabsContent value="protocol-simulation" className="mt-10 w-full">
        <ProtocolSimulation />
      </TabsContent>
      <TabsContent value="trading-simulation" className="mt-10 w-full">
        <TradingSimulation />
      </TabsContent>
    </Tabs>
  );
}
