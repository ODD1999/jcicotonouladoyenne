import { NextRequest, NextResponse } from 'next/server';
import { put } from '@vercel/blob';
import { randomUUID } from 'node:crypto';
import { authorized } from '@/lib/awards';

export const runtime = 'nodejs';
const MAX_BYTES = 5 * 1024 * 1024;
const mimeExtensions: Record<string,string> = {
  'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp'
};

function recognizedImage(bytes: Uint8Array, type: string) {
  if (type === 'image/jpeg') return bytes.length > 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
  if (type === 'image/png') return bytes.length > 8 && [137,80,78,71,13,10,26,10].every((value,index)=>bytes[index]===value);
  if (type === 'image/webp') {
    const ascii=(start:number)=>String.fromCharCode(...bytes.slice(start,start+4));
    return bytes.length > 12 && ascii(0)==='RIFF' && ascii(8)==='WEBP';
  }
  return false;
}

export async function POST(request: NextRequest) {
  if (!authorized(request.cookies.get('fva_admin')?.value)) {
    return NextResponse.json({ error: 'Accès administrateur requis.' }, {status:401});
  }
  try {
    const formData=await request.formData();
    const file=formData.get('image');
    if (!(file instanceof File)) return NextResponse.json({error:'Sélectionnez une photo.'},{status:400});
    if (file.size === 0 || file.size > MAX_BYTES) {
      return NextResponse.json({error:'La photo ne doit pas dépasser 5 Mo.'},{status:413});
    }
    const extension=mimeExtensions[file.type];
    if (!extension) return NextResponse.json({error:'Formats acceptés : JPG, PNG ou WebP.'},{status:415});
    const bytes=new Uint8Array(await file.arrayBuffer());
    if (!recognizedImage(bytes,file.type)) return NextResponse.json({error:'Ce fichier ne semble pas être une image valide.'},{status:415});
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      return NextResponse.json({error:'Stockage des photos non configuré sur le serveur.'},{status:503});
    }
    const objectName=`full-vibes-awards/candidates/${randomUUID()}.${extension}`;
    const stored=await put(objectName,Buffer.from(bytes),{
      access:'public',
      contentType:file.type,
      addRandomSuffix:false,
      token:process.env.BLOB_READ_WRITE_TOKEN
    });
    return NextResponse.json({success:true,url:stored.url},{headers:{'Cache-Control':'no-store'}});
  } catch {
    return NextResponse.json({error:'Téléversement impossible, veuillez réessayer.'},{status:500});
  }
}
