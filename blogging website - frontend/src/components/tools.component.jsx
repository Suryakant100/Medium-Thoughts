import Header from "@editorjs/header";
import List from "@editorjs/list";
import Image from "@editorjs/image";
import Embed from "@editorjs/embed";
import Quote from "@editorjs/quote";
import Marker from "@editorjs/marker";
import Inlinecode from "@editorjs/inline-code";
import Link from "@editorjs/link";
import Code from "@editorjs/code";
import uploadImage from "../common/aws";

const uploadImageByFile = (file) => {
  return new Promise((resolve, reject) => {
    uploadImage(file)
      .then((imageUrl) => {
        console.log(imageUrl);
        resolve({
          success: 1,
          file: {
            url: imageUrl,
          },
        });
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const uploadImageByUrl = (e) => {
  return new Promise((resolve, reject) => {
    const imageUrl = e;
    resolve({
      success: 1,
      file: {
        url: imageUrl,
      },
    });
  });
};

export const tools = {
  header: {
    class: Header,
    config: {
      placeholder: "Enter new header...",
      levels: [2, 3],
      defaultLevel: 2,
    },
  },

  list: { class: List, inlineToolbar: true },

  image: {
    class: Image,
    config: {
      uploader: {
        uploadByUrl: uploadImageByUrl,
        uploadByFile: uploadImageByFile,
      },
    },
  },

  embed: Embed,

  quote: { class: Quote, inlineToolbar: true },

  marker: Marker,

  inlineCode: Inlinecode,

  link: Link,

  code: Code,
};
