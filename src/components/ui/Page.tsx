/**
 * Types
 */
import type { PropsWithChildren } from 'react';

const Page = ({ children }: PropsWithChildren) => {
  return <div className="container md:max-w-3xl">{children}</div>;
};

const PageHeader = ({ children }: PropsWithChildren) => {
  return <div className="pt-2 pb-3 space-y-2 md:px-4 lg:px-10">{children}</div>;
};

const PageTitle = ({ children }: PropsWithChildren) => {
  return <h2 className="text-2xl font-semibold">{children}</h2>;
};

const PageList = ({ children }: PropsWithChildren) => {
  return <div className="pt-2 pb-20 md:px-4 lg:px-10">{children}</div>;
};

export { Page, PageHeader, PageTitle, PageList };
