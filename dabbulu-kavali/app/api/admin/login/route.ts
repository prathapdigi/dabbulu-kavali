import { NextResponse } from "next/server";
import { verifyAdmin, createSession } from "@/lib/auth";
export async function POST(req:Request){
 const {email,password}=await req.json();
 if(!await verifyAdmin(String(email||""),String(password||"")))return NextResponse.json({error:"Invalid login"},{status:401});
 await createSession(); return NextResponse.json({ok:true});
}
