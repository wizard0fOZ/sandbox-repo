import { BlobServiceClient } from "@azure/storage-blob";

function getMissionProofContainerName() {
  return process.env.AZURE_STORAGE_CONTAINER_MISSION_PROOFS || "mission-proofs";
}

function buildBlobName(originalName) {
  const safeName = originalName.replace(/\s+/g, "-").toLowerCase();
  return `${Date.now()}-${safeName}`;
}

export async function uploadMissionProofFile(file) {
  const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;

  if (!connectionString) {
    throw new Error("AZURE_STORAGE_CONNECTION_STRING is not configured.");
  }

  const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
  const containerClient = blobServiceClient.getContainerClient(
    getMissionProofContainerName()
  );

  await containerClient.createIfNotExists();

  const blobName = buildBlobName(file.originalname);
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);

  await blockBlobClient.uploadData(file.buffer, {
    blobHTTPHeaders: {
      blobContentType: file.mimetype
    }
  });

  return {
    blobName,
    url: blockBlobClient.url
  };
}
