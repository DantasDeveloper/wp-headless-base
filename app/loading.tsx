import { Section, Container } from "@/components/craft";
import { PostsSkeleton } from "@/components/posts/posts-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <>
      {/* Banner Skeleton */}
      <section className="relative w-full min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent to-secondary dark:from-primary/20 dark:via-accent dark:to-secondary/80" />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <Skeleton className="h-16 w-3/4 mx-auto" />
            <Skeleton className="h-8 w-2/3 mx-auto" />
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
              <Skeleton className="h-12 w-40" />
              <Skeleton className="h-12 w-40" />
            </div>
          </div>
        </div>
      </section>

      {/* First Section Skeleton */}
      <Section>
        <Container>
          <div className="relative w-full h-[100px] md:h-[200px] mb-8 overflow-hidden rounded-lg bg-black" />
          <PostsSkeleton />
        </Container>
      </Section>

      {/* Second Section Skeleton */}
      <Section>
        <Container>
          <div className="relative w-full h-[100px] md:h-[200px] mb-8 overflow-hidden rounded-lg bg-black" />
          <PostsSkeleton />
        </Container>
      </Section>

      {/* Third Section Skeleton */}
      <Section>
        <Container>
          <div className="relative w-full h-[100px] md:h-[200px] mb-8 overflow-hidden rounded-lg bg-black" />
          <PostsSkeleton />
        </Container>
      </Section>
    </>
  );
}
