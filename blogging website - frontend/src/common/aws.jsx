import axios from "axios";

const uploadImage = async (img) => {
  let imgUrl = null;
  try {
    const response = await axios.get(
      import.meta.env.VITE_SERVER_DOMAIN + "/get-upload-url"
    );
    const { uploadUrl } = response.data;

    await axios
      .put(uploadUrl, img, {
        headers: {
          "Content-Type": "image/jpeg",
        },
      })
      .then(() => {
        imgUrl = uploadUrl.split("?")[0];
      });
  } catch (error) {
    console.error("Error uploading image:", error);
  }

  return imgUrl;
};

export default uploadImage;
