import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./tmp"); // Destination folder where files will be stored
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname); // Extract file extension
    cb(null, uniqueSuffix + ext); // Append extension to filename
  },
});

export const upload = multer({
  storage,
});
