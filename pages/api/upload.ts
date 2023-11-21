import type { NextApiRequest, NextApiResponse } from 'next'
import { promises as fs } from "fs";
import path from "path";
// @ts-ignore
import formidable, { File } from 'formidable';
import { mkdir, stat } from "fs/promises";
import * as dateFn from "date-fns";
import mime from "mime";

import { join } from "path";


export const config = {
    api: {
        bodyParser: false,
    }
};

type ProcessedFiles = Array<[string, File]>;



export const parseForm = async (
  req: NextApiRequest
): Promise<{ fields: formidable.Fields; files: formidable.Files }> => {
    return new Promise(async (resolve, reject) => {
        const uploadDir = join(
          process.env.ROOT_DIR || process.cwd(),
          `/uploads/${dateFn.format(Date.now(), "dd-MM-Y")}`
        );

        try {
            await stat(uploadDir);
        } catch (e: any) {
            if (e.code === "ENOENT") {
                await mkdir(uploadDir, { recursive: true });
            } else {
                console.error(e);
                reject(e);
                return;
            }
        }

        const form = formidable({
            maxFiles: 2,
            maxFileSize: 1024 * 1024, // 1mb
            uploadDir,
            filename: (_name, _ext, part) => {
                const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
                const filename = `${part.name || "unknown"}-${uniqueSuffix}.${
                  mime.getExtension(part.mimetype || "") || "unknown"
                }`;
                return filename;
            },
            filter: (part) => {
                return (
                  part.name === "media" && (part.mimetype?.includes("image") || false)
                );
            },
        });

        form.parse(req, function (err, fields, files) {
            if (err) reject(err);
            else resolve({ fields, files });
        });
    });
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    let status = 200,
        resultBody = { status: 'ok', message: 'Files were uploaded successfully' };


     const parseFiles= await parseForm(req)

    console.log(parseFiles)

    /* Get files using formidable */
    const files:any = await new Promise<ProcessedFiles | undefined>((resolve, reject) => {
        const form = new formidable.IncomingForm();
        // const files: ProcessedFiles = [];
        console.log('1: ',form)
        // form.on('file', function (field, file) {
        //     files.push([field, file]);
        // })
        // console.log(files)
        // form.on('end', () => resolve(files));
        // form.on('error', err => reject(err));
        // form.parse(req, () => {
        //     //
        // });
    }).catch(e => {
        console.log(e);
        status = 500;
        resultBody = {
            status: 'fail', message: 'Upload error'
        }
    });


    if (files?.length) {

        /* Create directory for uploads */
        const targetPath = path.join(process.cwd(), `/uploads/`);
        try {
            await fs.access(targetPath);
        } catch (e) {
            await fs.mkdir(targetPath);
        }

        /* Move uploaded files to directory */
        for (const file of files) {
            const tempPath = file[1].filepath;
            await fs.rename(tempPath, targetPath + file[1].originalFilename);
        }
    }

    res.status(status).json(resultBody);
}

export default handler;
