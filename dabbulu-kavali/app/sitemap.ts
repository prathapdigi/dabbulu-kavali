import type { MetadataRoute } from "next";
import { db } from "@/lib/db";
export default async function sitemap():Promise<MetadataRoute.Sitemap>{
 const base=process.env.NEXT_PUBLIC_SITE_URL||"http://localhost:3000";
 const articles=await db.article.findMany({where:{status:"PUBLISHED"},select:{slug:true,updatedAt:true}});
 return [{url:base,lastModified:new Date()},...articles.map(a=>({url:`${base}/articles/${a.slug}`,lastModified:a.updatedAt}))];
}