import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";

interface PostPageProps {
  params: {
    slug: string;
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = params;

  try {
    // Dynamic import of the MDX post
    const Post = (await import(`@/posts/${slug}.mdx`)).default;

    return (
      <article>
        <Post />
      </article>
    );
  } catch (error) {
    notFound();
  }
}

// Generate static params for all posts at build time
export async function generateStaticParams() {
  const postsDirectory = path.join(process.cwd(), "src/posts");
  const files = fs.readdirSync(postsDirectory);

  return files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => ({
      slug: file.replace(/\.mdx$/, ""),
    }));
}

