import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { blogHeading, blogPosts } from "@/constant/catalog";

/** "From the Blog" — three latest article cards. */
export function FromTheBlog() {
  return (
    <section className="py-20">
      <Container>
        <SectionHeading heading={blogHeading} mainColor="#36ded8" />
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {blogPosts.map((post, i) => (
            <article key={i} className="overflow-hidden rounded-blog border border-line">
              <a href="#" className="relative block aspect-[16/10]">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 90vw, 30vw"
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
              </a>
              <div className="p-6">
                <h5 className="mb-3 font-heading text-h5">
                  <a href="#" className="text-ink transition-colors hover:text-brand">
                    {post.title}
                  </a>
                </h5>
                <div className="mb-4 flex flex-wrap gap-x-4 gap-y-1 font-body text-xs uppercase tracking-wide text-gray-500">
                  <span>by {post.author}</span>
                  <span>{post.date}</span>
                  <span>{post.comments} comments</span>
                </div>
                <a
                  href="#"
                  className="font-body text-sm font-semibold text-brand hover:underline"
                >
                  Read more
                </a>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
