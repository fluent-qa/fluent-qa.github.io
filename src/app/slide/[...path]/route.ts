import { NextRequest, NextResponse } from 'next/server'
import { createReadStream, existsSync } from 'fs'
import { join } from 'path'
import mime from 'mime-types'

export async function GET(
    request: NextRequest,
    { params }: { params: { path: string[] } }
) {
    const path = params.path

    if (!path || path.length === 0) {
        return new NextResponse('Bad Request', { status: 400 })
    }

    const filePath = join(process.cwd(), 'public', 'slides', ...path)

    console.log('Requested file path:', filePath)

    if (!existsSync(filePath)) {
        console.error('File not found:', filePath)
        return new NextResponse('File Not Found', { status: 404 })
    }

    const mimeType = mime.lookup(filePath) || 'application/octet-stream'

    const headers = new Headers()
    headers.set('Content-Type', mimeType)

    const stream = createReadStream(filePath)

    return new NextResponse(stream as unknown as ReadableStream, {
        headers,
    })
}