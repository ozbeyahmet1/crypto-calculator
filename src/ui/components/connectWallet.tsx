import { IoWalletOutline } from 'react-icons/io5';

import { Button } from '@/ui/components/lib/button';

export default function ConnectWallet() {
  return (
    <Button className="gap-2 overflow-hidden bg-transparent px-0 text-xs font-normal text-black hover:bg-transparent">
      <IoWalletOutline size={15} />
      CONNECT WALLET
    </Button>
  );
}
