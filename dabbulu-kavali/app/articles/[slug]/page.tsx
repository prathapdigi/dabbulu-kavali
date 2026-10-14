import { notFound } from "next/navigation";
import Header from "@/components/Header";
import AdSlot from "@/components/AdSlot";
import { db } from "@/lib/db";
import type { Metadata } from "next";
export const revalidate = 60;
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
 const {slug}=await params; const a=await db.article.findUnique({where:{slug}});
 return a?{title:a.seoTitle||a.title,description:a.seoDescription||a.excerpt,openGraph:{title:a.title,description:a.excerpt}}:{title:"Article not found"};
}
export default async function ArticlePage({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params; const a=await db.article.findUnique({where:{slug,status:"PUBLISHED"}});
 if(!a)notFound();
 return <><Header/><main className="page"><span className="eyebrow">{a.category.toUpperCase()}</span><h1>{a.title}</h1><p className="muted">Published {a.publishedAt?.toLocaleDateString("en-IN")}</p><p>{a.excerpt}</p><AdSlot/><article className="prose">{a.content.split("\\n").map((line,i)=>line.startsWith("## ")?<h2 key={i}>{line.slice(3)}</h2>:<p key={i}>{line}</p>)}</article><p className="notice">Disclaimer: This article is for general education only. It is not personalized financial, tax or investment advice. Verify details with official sources or a qualified professional.</p><AdSlot/>{a.contentTe&&<><hr/><span className="eyebrow">తెలుగు</span><h2>{a.titleTe||a.title}</h2><p>{a.excerptTe}</p><article className="prose">{a.contentTe.split("\\n").map((line,i)=>line.startsWith("## ")?<h2 key={i}>{line.slice(3)}</h2>:<p key={i}>{line}</p>)}</article></>}</main><footer>© Dabbulu Kavali · Financial education</footer></>;
}