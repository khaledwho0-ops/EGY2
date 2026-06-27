import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { ContentFrontmatter } from "../src/lib/schemas/content.js"; // Note: the .js extension is required when tsx resolves ESM

const CONTENT_DIR = path.join(process.cwd(), "src/content");

function getAllFiles(dirPath: string, arrayOfFiles: string[] = []) {
  if (!fs.existsSync(dirPath)) return arrayOfFiles;
  
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
    } else {
      arrayOfFiles.push(fullPath);
    }
  });

  return arrayOfFiles;
}

async function validate() {
  console.log("🔍 Scanning for MDX content files...");
  const allFiles = getAllFiles(CONTENT_DIR);
  const mdxFiles = allFiles.filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));

  if (mdxFiles.length === 0) {
    console.log("ℹ️ No MDX files found to validate.");
    return;
  }

  let hasErrors = false;

  for (const file of mdxFiles) {
    const content = fs.readFileSync(file, "utf8");
    let parsedMatter;
    try {
      parsedMatter = matter(content);
    } catch (e) {
      console.error(`\n❌ Failed to parse YAML frontmatter in: ${file}`);
      hasErrors = true;
      continue;
    }

    const { data } = parsedMatter;
    
    // Convert string dates into Date objects if necessary, though our schema expects datetime strings.
    // gray-matter auto-converts unquoted YAML dates to JS Date objects. We need to normalize them to ISO strings for Zod `.datetime()`.
    const normalizedData = JSON.parse(JSON.stringify(data, (key, value) => {
      if (typeof value === "string" && !isNaN(Date.parse(value))) {
        // If gray-matter didn't parse it but it's a valid date string
        return value;
      }
      return value;
    }));
    
    // Explicitly handle JS Dates from gray-matter
    for (const key in data) {
      if (data[key] instanceof Date) {
        normalizedData[key] = data[key].toISOString();
      }
    }
    
    if (normalizedData.reviewers) {
      normalizedData.reviewers = normalizedData.reviewers.map((r: any) => ({
        ...r,
        reviewedAt: r.reviewedAt instanceof Date ? r.reviewedAt.toISOString() : r.reviewedAt
      }));
    }
    if (normalizedData.citations) {
      normalizedData.citations = normalizedData.citations.map((c: any) => ({
        ...c,
        archivedAt: c.archivedAt instanceof Date ? c.archivedAt.toISOString() : c.archivedAt,
        accessedAt: c.accessedAt instanceof Date ? c.accessedAt.toISOString() : c.accessedAt
      }));
    }
    if (normalizedData.correctionsLog) {
      normalizedData.correctionsLog = normalizedData.correctionsLog.map((c: any) => ({
        ...c,
        at: c.at instanceof Date ? c.at.toISOString() : c.at
      }));
    }

    const parsed = ContentFrontmatter.safeParse(normalizedData);

    if (!parsed.success) {
      console.error(`\n❌ Validation Failed: ${file}`);
      const issues = parsed.error.issues || [];
      issues.forEach((err: any) => {
        console.error(`   - [${err.path.join(".")}] ${err.message}`);
      });
      hasErrors = true;
    } else {
      console.log(`✅ Validated: ${path.relative(process.cwd(), file)}`);
    }

    // Extract and archive all external markdown links (Prohibition #4)
    const linkRegex = /\[[^\]]*\]\((https?:\/\/[^\s\)]+)\)/g;
    let match;
    const links = new Set<string>();
    while ((match = linkRegex.exec(content)) !== null) {
      links.add(match[1]);
    }

    for (const link of links) {
      let success = false;
      let lastError;
      for (let attempt = 1; attempt <= 3; attempt++) {
        try {
          console.log(`   ⏳ Archiving external link: ${link} (Attempt ${attempt}/3)`);
          const { saveSnapshot } = await import("../src/lib/provenance/wayback.js");
          await saveSnapshot(link);
          success = true;
          break;
        } catch (e: any) {
          lastError = e.message;
          // Wait 2 seconds before retry
          await new Promise(r => setTimeout(r, 2000));
        }
      }
      if (!success) {
        console.error(`\n❌ Validation Failed: Could not archive ${link} in ${file}. Error: ${lastError}`);
        // Prohibition #4: Fail the build if any link fails to archive after 3 retries
        hasErrors = true;
      }
    }
  }

  if (hasErrors) {
    console.error("\n🚨 Frontmatter validation failed! Build rejected. Editorial standards violated.");
    process.exit(1);
  } else {
    console.log("\n🚀 All content frontmatter validated successfully against the Universal Contract.");
  }
}

validate().catch((err) => {
  console.error(err);
  process.exit(1);
});
