 "use client";
import {useEffect,useState} from "react";
type Article={id:string;title:string;titleTe?:string|null;category:string;status:string;updatedAt:string};
const blank={title:"",titleTe:"",slug:"",excerpt:"",excerptTe:"",category:"Saving",content:"",contentTe:"",seoTitle:"",seoDescription:"",featured:false};
export default function Admin(){
 const [logged,setLogged]=useState(false),[message,setMessage]=useState(""),[articles,setArticles]=useState<Article[]>([]);
 const [email,setEmail]=useState("admin@dabbulukavali.in"),[password,setPassword]=useState("");
 const [form,setForm]=useState(blank);
 async function load(){const r=await fetch("/api/admin/articles");if(r.ok)setArticles(await r.json());}
 useEffect(()=>{if(logged)load();},[logged]);
 async function login(e:React.FormEvent){e.preventDefault();const r=await fetch("/api/admin/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email,password})});const d=await r.json();if(r.ok){setLogged(true);setMessage("Welcome to your publishing desk.");}else setMessage(d.error||"Login failed");}
 async function save(){const r=await fetch("/api/admin/articles",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(form)});const d=await r.json();setMessage(r.ok?"Saved as draft. Review both languages, then publish.":(d.error||"Could not save"));if(r.ok){setForm(blank);load();}}
 async function action(id:string,action:"publish"|"draft"){const r=await fetch("/api/admin/articles",{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({id,action})});setMessage(r.ok?(action==="publish"?"Article is live.":"Article moved to drafts."):"Action failed");load();}
 async function remove(id:string){if(!confirm("Permanently delete this article?"))return;const r=await fetch("/api/admin/articles",{method:"DELETE",headers:{"Content-Type":"application/json"},body:JSON.stringify({id})});setMessage(r.ok?"Article deleted.":"Delete failed");load();}
 const set=(key:keyof typeof blank,value:string|boolean)=>setForm(old=>({...old,[key]:value}));
 return <main className="admin"><a href="/" style={{color:"#10264b"}}>← View website</a><h1 style={{fontFamily:"Manrope",color:"#10264b"}}>Dabbulu Kavali · Publishing Desk</h1><p className="muted">English + Telugu · 3 articles daily · Admin approval required</p>{message&&<p className="notice">{message}</p>}
 {!logged?<form onSubmit={login}><h2>Admin login</h2><label>Email</label><input type="email" value={email} onChange={e=>setEmail(e.target.value)}/><label>Password</label><input type="password" value={password} onChange={e=>setPassword(e.target.value)}/><button>Sign in</button></form>:<>
 <section style={{background:"#f7f9fc",padding:18,borderRadius:12,margin:"20px 0"}}><h2>Daily publishing plan</h2><p>Target: <b>3 reviewed articles daily</b>. Suggested mix: (1) saving/budgeting, (2) banking/digital payments, (3) investing education/tax awareness.</p><p className="muted">Workflow: create draft → verify both languages and sources → preview → publish manually. No automatic publishing.</p></section>
 <h2>Create bilingual article</h2><label>English title *</label><input value={form.title} onChange={e=>{set("title",e.target.value);set("slug",e.target.value.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,""));}}/>
 <label>Telugu title</label><input value={form.titleTe} onChange={e=>set("titleTe",e.target.value)} placeholder="తెలుగు శీర్షిక"/>
 <label>URL slug (English)</label><input value={form.slug} onChange={e=>set("slug",e.target.value)}/>
 <label>English summary</label><textarea style={{minHeight:75}} value={form.excerpt} onChange={e=>set("excerpt",e.target.value)}/>
 <label>Telugu summary</label><textarea style={{minHeight:75}} value={form.excerptTe} onChange={e=>set("excerptTe",e.target.value)} placeholder="తెలుగు సారాంశం"/>
 <label>Category</label><select value={form.category} onChange={e=>set("category",e.target.value)}>{["Saving","Budgeting","Banking","Investing","Tax","Loans","Insurance","Digital Payments","Financial Awareness"].map(x=><option key={x}>{x}</option>)}</select>
 <label>English article *</label><textarea value={form.content} onChange={e=>set("content",e.target.value)} placeholder="Write original, sourced content. Use ## Heading on a new line."/>
 <label>Telugu article</label><textarea value={form.contentTe} onChange={e=>set("contentTe",e.target.value)} placeholder="తెలుగులో వ్యాసం రాయండి. ## శీర్షిక ఉపయోగించండి."/>
 <label>SEO title</label><input value={form.seoTitle} onChange={e=>set("seoTitle",e.target.value)}/>
 <label>SEO description</label><input value={form.seoDescription} onChange={e=>set("seoDescription",e.target.value)}/>
 <label><input type="checkbox" checked={form.featured} onChange={e=>set("featured",e.target.checked)} style={{width:"auto"}}/> Featured article</label>
 <p><button type="button" onClick={save}>Save as draft for review</button></p>
 <h2 style={{marginTop:40}}>Content library</h2><p className="muted">Only published articles appear publicly.</p>
 <div style={{display:"grid",gap:10}}>{articles.map(a=><div key={a.id} style={{border:"1px solid #e5eaf1",padding:15,borderRadius:10}}><b>{a.title}</b>{a.titleTe&&<div>{a.titleTe}</div>}<p className="muted">{a.category} · {a.status} · {new Date(a.updatedAt).toLocaleString()}</p><button type="button" onClick={()=>action(a.id,a.status==="PUBLISHED"?"draft":"publish")}>{a.status==="PUBLISHED"?"Move to draft":"Approve & publish"}</button><button type="button" onClick={()=>remove(a.id)} style={{marginLeft:8,background:"#8b2635"}}>Delete</button></div>)}</div>
 </>}
 </main>;
}