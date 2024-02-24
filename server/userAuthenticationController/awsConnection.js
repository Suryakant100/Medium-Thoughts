import { nanoid } from "nanoid";
import aws from "aws-sdk";

//AWS Setup

const s3 = new aws.S3({
  region: "ap-south-1",
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const generateUploadUrl = async (req, res) => {
  const date = new Date();
  const imgName = `${nanoid()}-${date.getTime()}.jpeg`;

  return await s3
    .getSignedUrlPromise("putObject", {
      Bucket: process.env.AWS_BUCKET_NAME,
      ContentType: "image/jpeg",
      Key: imgName,
      Expires: 1000,
    })
    .then((url) => {
      res.status(200).json({ uploadUrl: url });
    })
    .catch((err) => {
      res.status(500).json({
        error: "Error occurred while generating upload url",
        details: err.message,
      });
    });
};

export default generateUploadUrl;
