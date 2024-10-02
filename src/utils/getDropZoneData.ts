interface ExtendedFile extends File {
  path?: string;
  preview?: string;
}

interface FileData {
  key: string;
  preview: string;
  name?: string;
  size?: number;
  path?: string;
  type?: string;
  lastModified?: number;
}

export default function getDropzoneData(
  file: ExtendedFile | string,
  index?: number
): FileData {
  if (typeof file === "string") {
    return {
      key: index ? `${file}-${index}` : file,
      preview: file,
    };
  }

  return {
    key: index ? `${file.name}-${index}` : file.name,
    name: file.name,
    size: file.size,
    path: file.path,
    type: file.type,
    preview: file.preview || "",
    lastModified: file.lastModified,
  };
}
