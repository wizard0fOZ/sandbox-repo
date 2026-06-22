import prisma from "../lib/prisma.js";
import { uploadMissionProofFile } from "../services/blobStorageService.js";

export async function uploadMissionProof(request, response, next) {
  try {
    if (!request.file) {
      response.status(400).json({
        message: "A file is required under the field name 'file'."
      });
      return;
    }

    const uploadResult = await uploadMissionProofFile(request.file);

    await prisma.uploadedFile.create({
      data: {
        blobName: uploadResult.blobName,
        fileName: request.file.originalname,
        contentType: request.file.mimetype,
        url: uploadResult.url
      }
    });

    response.status(201).json({
      message: "File uploaded successfully",
      blobName: uploadResult.blobName,
      url: uploadResult.url
    });
  } catch (error) {
    next(error);
  }
}
