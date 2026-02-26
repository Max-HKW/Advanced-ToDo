import { Link } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";

import { pageNotFound } from "@/assets";

const RootErrorBoundary = () => {
  return (
    <>
      <div className="min-h-[100dvh] flex flex-col">
        <div
          className="grow container flex flex-col justify-center items-center 
        pt-32 pb-12"
        >
          <h1 className="text-2xl font-semibold text-center sm:text-4xl">
            Hmmm, that page doesn't exist.
          </h1>

          <p
            className="text-muted-foreground max-w-[55ch] text-center mt-4 mb-6
          sm:text-lg"
          >
            You can get back on track and manage your tasks with ease.'
          </p>

          <div className="flex gap-2">
            <Button asChild>
              <Link to="/">Return to Home</Link>
            </Button>

            <Button asChild variant="ghost">
              <Link to="/">View Inbox</Link>
            </Button>
          </div>

          <figure className="mt-10">
            <img
              src={pageNotFound}
              width={560}
              height={373}
              alt="404 page not found"
            />
          </figure>
        </div>
      </div>
    </>
  );
};

export default RootErrorBoundary;
