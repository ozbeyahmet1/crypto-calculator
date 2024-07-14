import { Montserrat } from 'next/font/google';
import { MdOutlineMenu } from 'react-icons/md';

import ConnectWallet from '@/ui/components/connectWallet';

import { ThemeSwitcher } from '../components/themeSwitcher';
import { HamburgerMenu } from './hamburgerMenu';

/**
 * Represents the navigation bar component.
 */
const montserrat = Montserrat({ subsets: ['latin'] });
export default function Navbar() {
  return (
    <div className="left-0 top-0 w-screen border-b border-none border-b-gray-200 py-0 dark:border-b-gray-600 dark:text-white lg:border-solid lg:py-3">
      <div className="w-full border border-solid border-b-gray-200 py-2 lg:hidden">
        <div className="container flex items-center justify-between">
          <ConnectWallet />
          <ThemeSwitcher />
        </div>
      </div>
      <div className="container flex items-center justify-between py-2 lg:justify-normal lg:py-0">
        <div className="mr-10">
          <p className={`text-md overflow-hidden font-semibold leading-[0.95] text-red-700 ${montserrat.className}`}>
            Stable
          </p>
          <p className={`text-md overflow-hidden font-semibold leading-[0.95] text-red-700 ${montserrat.className}`}>
            Jack
          </p>
        </div>
        <div className="flex lg:hidden">
          <HamburgerMenu>
            <MdOutlineMenu size={36} />
          </HamburgerMenu>
        </div>
        <div className="hidden w-2/3 items-center justify-end lg:flex lg:w-5/6 lg:justify-between">
          <div className="flex items-center gap-3 ">
            <span className="border-r pr-3">
              <ConnectWallet />
            </span>
            <p className="hidden overflow-hidden bg-transparent text-xs font-normal hover:bg-transparent lg:flex">
              REPORTS
            </p>
            <p className="hidden overflow-hidden bg-transparent text-xs font-normal hover:bg-transparent lg:flex">
              SAVED CALCULATIONS
            </p>
          </div>
          <div className="hidden items-center lg:flex">
            <ThemeSwitcher />
          </div>
        </div>
      </div>
    </div>
  );
}
