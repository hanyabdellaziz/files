import { createHash } from "crypto"

export type UploadedFile = {
  filename: string
  contentType: string
  content: Buffer
}

/**
 * Processes a file from FormData into a Buffer and returns relevant file information
 */
export async function processFile(file: File): Promise<UploadedFile> {
  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)

  // Generate a hash of the file content to ensure uniqueness
  const hash = createHash("md5").update(buffer).digest("hex").substring(0, 10)

  // Create a safe filename with the hash appended
  const originalName = file.name
  const extension = originalName.split(".").pop() || "file"
  const safeName = originalName
    .split(".")
    .slice(0, -1)
    .join(".")
    .replace(/[^a-zA-Z0-9]/g, "-")
    .toLowerCase()

  const uniqueFilename = `${safeName}-${hash}.${extension}`

  return {
    filename: uniqueFilename,
    contentType: file.type,
    content: buffer,
  }
}
