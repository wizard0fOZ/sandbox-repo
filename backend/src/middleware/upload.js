import multer from "multer";

const allowedMimeTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];

const storage = multer.memoryStorage();

function fileFilter(_request, file, callback) {
  if (allowedMimeTypes.includes(file.mimetype)) {
    callback(null, true);
    return;
  }

  callback(new Error("Only image uploads are allowed."));
}

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024
  }
});

export default upload;
