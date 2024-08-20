const multer = require("multer");

const multerUpload = multer({
    limits: {
        fileSize: 1024 * 1024 * 5,
    },
});
const singleUpload = multerUpload.single("avatar");
const attachmentsMulter = multerUpload.array("files", 5);
module.exports = {
    singleUpload,
    attachmentsMulter,
};