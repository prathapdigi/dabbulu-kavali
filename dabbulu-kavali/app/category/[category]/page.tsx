import Header from "@/components/Header";
import {db} from "@/lib/db";
import Link from "next/link";
import {notFound} from "next/navigation";
const labels:Record<string,string>={saving:"Saving",budgeting:"Budgeting",banking:"Banking",investing:"Investing",tax:"Tax",loans:"Loans",insurance:"Insurance","digital-payments":"Digital Payments","financial-awareness":"Financial Awareness"};
export default async function CategoryPage({params}:{params:Promise<{category:string}>}){
 const {category}=await params; const label=labels[category]; if(!label)notFound();
 const articles=await db.article.findMany({where:{status:"PUBLISHED",category:label},orderBy:{publishedAt:"desc"}});
 return <><Header/><main className="section"><span className="eyebrow">EXPLORE TOPIC</span><h1 style={{fontFamily:"Manrope",color:"#10264b"}}>{label}</h1><div className="grid">{articles.map(a=><Link className="article-card" href={`/articles/${a.slug}`} key={a.id}><h3>{a.title}</h3><p>{a.excerpt}</p><b>Read more →</b></Link>)}</div>{!articles.length&&<p className="muted">No articles in this category yet. New guides will be added here.</p>}</main></>;
}