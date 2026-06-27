import { ConditionFrontmatter } from "./schemas/content";

import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";

export async function loadCondition(slug: string): Promise<{ frontmatter: any, content: string }> {
  try {
    const filePath = path.join(process.cwd(), "src", "content", "mental-health", `${slug}.mdx`);
    const fileContents = await fs.readFile(filePath, "utf8");
    const { data, content } = matter(fileContents);
    return { frontmatter: data, content };
  } catch (err) {
    console.error(`Failed to load condition: ${slug}`, err);
    throw new Error(`Condition not found: ${slug}`);
  }
}

