import {NextResponse} from "next/server";
import {mechanicsStore} from "@/lib/mechanics-store";

export async function GET(_request:Request,{params}:{params:Promise<{id:string}>}){
  const {id}=await params;
  const mechanic=mechanicsStore.mechanics.find(m=>m.id===id);
  if(!mechanic)return NextResponse.json({error:"Mechanic not found"},{status:404});
  const reviews=mechanicsStore.ratings.filter(r=>r.mechanic_id===id).sort((a,b)=>b.created_at.localeCompare(a.created_at)).slice(0,50);
  return NextResponse.json({reviews});
}
