import type { MetadataRoute } from "next";
import { articleLink, articles } from "@/lib/articles";
import { postPath, posts } from "@/lib/posts";
import { recipePath, recipes } from "@/lib/recipes";
import { site } from "@/lib/site";

// Every public page. New issues, articles and recipes are picked up from their content files.
// /subscribe is left out because it is marked noindex.
export default function sitemap(): MetadataRoute.Sitemap {
  const page = (path: string, priority: number): MetadataRoute.Sitemap[number] => ({ url: `${site.url}${path}`, priority });
  return [
    page("/", 1),
    page("/newsletter", 0.8),
    page("/flavour-science", 0.8),
    page("/recipes", 0.8),
    page("/about", 0.6),
    page("/privacy", 0.3),
    ...posts.map((post) => page(postPath(post.slug), 0.7)),
    ...articles.map((article) => page(articleLink(article.slug).href, 0.7)),
    ...recipes.map((recipe) => page(recipePath(recipe.slug), 0.7)),
  ];
}
