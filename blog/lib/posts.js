import fs from "fs";
import html from "remark-html";
import matter from "gray-matter";
import path from "path";
import { remark } from "remark";

const posts_dir = path.join(process.cwd(), "posts");

export function getSortedPostsData() {
  // Read posts.
  const filenames = fs.readdirSync(posts_dir);
  const posts_data = filenames.map((filename) => {
    const id = filename.replace(/\.md$/, "");
    const post_path = path.join(posts_dir, filename);
    const file_contents = fs.readFileSync(post_path, "utf8");

    const matter_result = matter(file_contents);

    return {
      id,
      ...matter_result.data,
    };
  });

  // Sort posts by date.
    return posts_data.sort((a, b) => {
      if (a.date < b.date) {
        return 1;
      } else {
        return -1;
      }
    });
}

export function getPostIds() {
  const filenames = fs.readdirSync(posts_dir);

  return filenames.map((filename) => {
    return {
      params: {
        id: filename.replace(/\.md$/, ""),
      },
    };
  });
}

export async function getPostData(id) {
  const fullpath = path.join(posts_dir, `${id}.md`);
  const file_contents = fs.readFileSync(fullpath, "utf8");

  const matter_result = matter(file_contents);

  const processed_content = await remark()
    .use(html)
    .process(matter_result.content);
  const content_html = processed_content.toString();

  return {
    id,
    content_html,
    ...matter_result.data,
  };
}
