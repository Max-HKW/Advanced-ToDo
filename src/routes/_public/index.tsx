/**
 * Node modules
 */
import { createFileRoute, Link } from "@tanstack/react-router";
import { useHead } from "@unhead/react";

/**
 * Assets
 */
import { heroBannerLg, heroBannerSm } from "@/assets";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_public/")({
  component: HomePage,
});

function HomePage() {
  useHead({
    title: "Tasky AI - AI-Powered To-Do List & Project Management App",
  });
  return (
    <section>
      <div
        className="container px-8! grid grid-cols-1 gap-8 items-center
        xl:gap-12 xl:grid-cols-[1fr_1.5fr]"
      >
        <div
          className="flex flex-col items-center text-center space-y-4
          lg:text-left lg:items-start lg:space-y-6"
        >
          <h1
            className="text-4xl font-semibold max-w-[22ch] 
            md:text-5xl lg:text-6xl xl:text-5xl 2xl:text-6xl"
          >
            Simplify Your Work and Life with{" "}
            <span
              className="inline-flex bg-linear-to-t from-primary/50
              to-primary/30 rounded-full px-2 overflow-hidden"
            >
              AI-Powered
            </span>
            Task Management.
          </h1>
          <p className="max-w-[48ch] text-foreground/80 md:text-lg lg:text-xl">
            Simplify life for both you and your team with the world's #1 task
            manager and to-do list app.
          </p>
          <Button asChild size="lg">
            <Link to="/register">Start for free</Link>
          </Button>
        </div>

        <figure
          className="bg-secondary rounded-xl overflow-hidden 
          aspect-square max-md:max-w-120 max-md:mx-auto md:aspect-video"
        >
          <img
            src={heroBannerSm}
            width={480}
            height={480}
            alt="Tasky AI Website"
            className="md:hidden"
          />

          <img
            src={heroBannerLg}
            width={960}
            height={540}
            alt="Tasky AI Website"
            className="max-md:hidden"
          />
        </figure>
      </div>
    </section>
  );
}
