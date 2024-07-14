import type { PropsWithChildren } from 'react';

import { Sheet, SheetContent, SheetTrigger } from '../components/lib/sheet';

export function HamburgerMenu({ children }: PropsWithChildren) {
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="container mt-[100px] w-full  bg-white p-0 outline-none dark:bg-[#121212]">
        <div className="container mt-10">
          <p className="overflow-hidden border-b-2 border-solid border-gray-200 bg-transparent py-2 text-base font-normal">
            REPORTS
          </p>
          <p className="overflow-hidden bg-transparent py-2 text-base font-normal">SAVED CALCULATIONS</p>
        </div>
      </SheetContent>
    </Sheet>
  );
}
