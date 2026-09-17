import multer from "multer";

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowedImageTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/gif",
  ];

  const allowedDocumentTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  if (
    allowedImageTypes.includes(file.mimetype) ||
    allowedDocumentTypes.includes(file.mimetype)
  ) {
    cb(null, true);
  } else {
    cb(
      new Error("Only images, PDF, DOC, and DOCX files are allowed"),
      false
    );
  }
};

const upload = multer({
  storage,
  fileFilter,
});

export default upload;