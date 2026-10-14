export default function AdSlot({ slot = "" }: { slot?: string }) {
 const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
 if (!client) return <div className="ad-placeholder">Advertisement space · AdSense can be enabled after site approval</div>;
 return <ins className="adsbygoogle ad-placeholder" style={{display:"block"}} data-ad-client={client} data-ad-slot={slot || process.env.NEXT_PUBLIC_ADSENSE_SLOT_HOME} data-ad-format="auto" data-full-width-responsive="true" />;
}