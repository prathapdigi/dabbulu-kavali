import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { isAdmin } from "@/lib/auth";
export async function GET(){if(!await isAdmin())return NextResponse.json({error:"Unauthorized"},{status:401});return NextResponse.json(await db.article.findMany({orderBy:{updatedAt:"desc"},take:100}));}
export async function POST(req:Request){
 if(!await isAdmin())return NextResponse.json({error:"Unauthorized"},{status:401});
 const x=await req.json(); const slug=String(x.slug||"").toLowerCase().trim().replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,"");
 if(!x.title||!slug||!x.content)return NextResponse.json({error:"English title, slug and English article are required"},{status:400});
 try{return NextResponse.json(await db.article.create({data:{title:x.title,titleTe:x.titleTe||null,slug,excerpt:x.excerpt||"",excerptTe:x.excerptTe||null,content:x.content,contentTe:x.contentTe||null,category:x.category||"Personal Finance",status:"DRAFT",featured:!!x.featured,seoTitle:x.seoTitle||x.title,seoDescription:x.seoDescription||x.excerpt}}),{status:201});}
 catch{return NextResponse.json({error:"Could not save. Check whether this URL slug is already used."},{status:409});}
}
export async function PATCH(req:Request){if(!await isAdmin())return NextResponse.json({error:"Unauthorized"},{status:401});const {id,action}=await req.json();if(!id||!["publish","draft"].includes(action))return NextResponse.json({error:"Invalid request"},{status:400});return NextResponse.json(await db.article.update({where:{id},data:action==="publish"?{status:"PUBLISHED",publishedAt:new Date()}:{status:"DRAFT",publishedAt:null}}));}
export async function DELETE(req:Request){if(!await isAdmin())return NextResponse.json({error:"Unauthorized"},{status:401});const {id}=await req.json();if(!id)return NextResponse.json({error:"Article ID required"},{status:400});await db.article.delete({where:{id}});return NextResponse.json({ok:true});}
