import { BlobServiceClient } from "@azure/storage-blob";

function getMissionProofContainerName() {
  return process.env.AZURE_STORAGE_CONTAINER_MISSION_PROOFS || "mission-proofs";
}

function buildPublicFileUrl(containerName, blobName, fallbackUrl) {
  const baseUrl = process.env.AZURE_STORAGE_BLOB_BASE_URL;

  if (!baseUrl) {
    return fallbackUrl;
  }

  return `${baseUrl.replace(/\/$/, "")}/${containerName}/${blobName}`;
}

function buildBlobName(originalName) {
  const safeName = originalName.replace(/\s+/g, "-").toLowerCase();
  return `${Date.now()}-${safeName}`;
}

export async function uploadMissionProofFile(file) {
  const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
  const containerName = getMissionProofContainerName();

  if (!connectionString) {
    throw new Error("AZURE_STORAGE_CONNECTION_STRING is not configured.");
  }

  const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
  const containerClient = blobServiceClient.getContainerClient(containerName);

  await containerClient.createIfNotExists();

  const blobName = buildBlobName(file.originalname);
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);

  await blockBlobClient.uploadData(file.buffer, {
    blobHTTPHeaders: {
      blobContentType: file.mimetype
    }
  });

  return {
    containerName,
    blobName,
    url: buildPublicFileUrl(containerName, blobName, blockBlobClient.url)
  };
}
