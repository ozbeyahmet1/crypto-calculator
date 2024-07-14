import { ProtocolSimulation } from '../containers/protocolSimulation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './lib/tabs';

export function TabsDemo() {
  return (
    <Tabs defaultValue="account" className="mt-6 lg:mt-12">
      <TabsList className="grid h-auto w-full grid-cols-2 bg-gray-200 dark:bg-gray-600 dark:bg-opacity-50 lg:w-[600px]">
        <TabsTrigger
          value="account"
          className="w-[150px] whitespace-break-spaces px-5 font-medium lg:w-auto lg:whitespace-normal lg:px-0">
          Protocol Simulation
        </TabsTrigger>
        <TabsTrigger
          value="password"
          className="w-[150px] whitespace-break-spaces font-medium lg:w-auto lg:whitespace-normal">
          Trading Simulation for xAVAX
        </TabsTrigger>
      </TabsList>
      <TabsContent value="account" className="mt-10 w-full">
        <ProtocolSimulation />
      </TabsContent>
      <TabsContent value="password">
        <div>PssWord</div>
      </TabsContent>
    </Tabs>
  );
}
