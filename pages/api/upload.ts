import type { NextApiRequest, NextApiResponse } from 'next'
import mime from 'mime'
import { join } from 'path'
import * as dateFn from 'date-fns'
import formidable from 'formidable'
import { mkdir, stat } from 'fs/promises'


const parseForm = async (
  req: NextApiRequest
): Promise<{ fields: formidable.Fields; files: formidable.Files }> => {
  return await new Promise(async (resolve, reject) => {
    const uploadDir = join(
      process.env.ROOT_DIR || process.cwd(),
      `/uploads/${dateFn.format(Date.now(), 'dd-MM-Y')}`
    )

    try {
      await stat(uploadDir)
    } catch (e: any) {
      if (e.code === 'ENOENT') {
        await mkdir(uploadDir, { recursive: true })
      } else {
        console.error(e)
        reject(e)
        return
      }
    }

    const form = formidable({
      maxFiles: 10,
      maxFileSize: 1024 * 1024 * 2048, //  2 GB
      uploadDir,
      filename: (_name, _ext, part) => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`
        return `${part.name || 'unknown'}-${uniqueSuffix}.${
          mime.getExtension(part.mimetype || '') || 'unknown'
        }`
      },
      filter: (part) => {
        return part.name === 'media'
      }
    })

    form.parse(req, function (err, fields, files) {
      if (err) reject(err)
      else resolve({ fields, files })
    })
  })
}
const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<{
    data: {
      url: string | string[]
    } | null
    error: string | null
  }>
) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    res.status(405).json({
      data: null,
      error: 'Method Not Allowed'
    })
    return
  }
  try {
    const { files } = await parseForm(req)

    const file = files.media
    let url = Array.isArray(file)
      ? file.map((f) => f.filepath)
      : (file as formidable.File).filepath

    res.status(200).json({
      data: {
        url
      },
      error: null
    })
  } catch (e) {
    console.error(e)
  }
}

export const config = {
  api: {
    bodyParser: false
  }
}

export default handler
