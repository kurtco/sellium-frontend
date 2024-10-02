declare module "react-dropzone" {
  import { DropzoneOptions, DropzoneState } from "react-dropzone";

  export function useDropzone(options?: DropzoneOptions): DropzoneState;
}
