import { NextResponse } from "next/server"
import { processFile } from "@/lib/fileUpload"

// Set a reasonable max file size (10MB)
const MAX_FILE_SIZE = 10 * 1024 * 1024

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const files: { [key: string]: any } = {}

    // Process each file in the form
    for (const [key, value] of formData.entries()) {
      // Skip non-file entries
      if (!(value instanceof File)) continue

      // Check file size
      if (value.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          { error: `File ${value.name} exceeds the maximum allowed size of 10MB` },
          { status: 400 },
        )
      }

      // Process the file
      const processedFile = await processFile(value)
      files[key] = processedFile
    }

    // In a real application, you would upload these files to a storage service
    // like AWS S3, Vercel Blob Storage, etc.
    // For this example, we'll just return the processed files as confirmation

    return NextResponse.json({
      success: true,
      fileCount: Object.keys(files).length,
      files: Object.keys(files).map((key) => ({
        fieldName: key,
        filename: files[key].filename,
        contentType: files[key].contentType,
        size: files[key].content.length,
      })),
    })
  } catch (error) {
    console.error("File upload error:", error)
    return NextResponse.json({ error: "Failed to process file upload" }, { status: 500 })
  }
}
