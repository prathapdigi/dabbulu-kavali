import Link from "next/link";
export default function Header() {
 return <header className="header"><Link href="/" className="brand"><img src="/logo.png" alt="Dabbulu Kavali" /><span>Dabbulu Kavali<small>Money knowledge for everyone</small></span></Link><nav><Link href="/category/saving">Saving</Link><Link href="/category/banking">Banking</Link><Link href="/category/investing">Investing</Link><Link href="/category/tax">Tax</Link><Link href="/about">About</Link></nav></header>;
}