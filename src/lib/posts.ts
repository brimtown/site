import fs from "fs";
import path from "path";

export interface PostMetadata {
  title: string;
  subtitle?: string;
  date?: string;
  published?: boolean;
}

/**
 * Read metadata from an MDX file without importing the component.
 * This avoids serialization issues during static generation.
 */
export async function getPostMetadata(slug: string): Promise<PostMetadata | null> {
  const postsDirectory = path.join(process.cwd(), "src/posts");
  const filePath = path.join(postsDirectory, `${slug}.mdx`);

  try {
    const fileContent = fs.readFileSync(filePath, "utf8");
    // Extract metadata export using regex ([\s\S] matches any character including newlines)
    const metadataMatch = fileContent.match(/export const metadata = \{([\s\S]+?)\};/);
    if (!metadataMatch) {
      return null;
    }

    // Parse the metadata object
    const metadataStr = `{${metadataMatch[1]}}`;
    // Use Function constructor to safely evaluate the object literal
    const metadata = new Function(`return ${metadataStr}`)() as PostMetadata;
    return metadata;
  } catch (error) {
    return null;
  }
}

/**
 * Get all posts with their metadata.
 * @param includeUnpublished - Whether to include unpublished posts (default: false)
 */
export async function getAllPosts(includeUnpublished: boolean = false) {
  const postsDirectory = path.join(process.cwd(), "src/posts");
  const files = fs.readdirSync(postsDirectory);

  const posts = await Promise.all(
    files
      .filter((file) => file.endsWith(".mdx"))
      .map(async (file) => {
        const slug = file.replace(/\.mdx$/, "");
        const metadata = await getPostMetadata(slug);

        if (!metadata) {
          return null;
        }

        return {
          slug,
          title: metadata.title || slug,
          subtitle: metadata.subtitle || "",
          date: metadata.date || "",
          published: metadata.published ?? false, // Default to false
        };
      })
  );

  // Filter out null entries and unpublished posts (unless includeUnpublished is true)
  const filteredPosts = posts.filter((post): post is NonNullable<typeof post> => {
    if (!post) return false;
    if (!includeUnpublished && !post.published) return false;
    return true;
  });

  // Sort by date, newest first
  return filteredPosts.sort((a, b) => (a.date < b.date ? 1 : -1));
}
