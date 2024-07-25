import { MdOutlineContentCopy } from "react-icons/md";

import { FormValues } from "../App";
import toast from "react-hot-toast";

type ConfigDisplayProps = {
  showDisplay: boolean;
  data: FormValues | undefined;
};

function ConfigDisplay({ showDisplay, data }: ConfigDisplayProps) {
  const codeToCopy = `fontSize: {
      ${data?.classes.map((item) => `${item.name}: ["${item.fontSize / 16}rem", { lineHeight: "${item.lineHeight}%", fontWeight: "${item.fontWeight}"}],`).join("\n\t  ")}
      }`;
  const codeText = `/** @type {import("tailwindcss').Config} */
export default {
  content: [
    // your files here
  ],
  theme: {
  extend: {
    ${codeToCopy}
    }
  }
}
// Paste it into your tailwind.config.js.
// Don't worry, just the fontSize obj is copied
// when you click to copy on top right.
// Run prettier on it to format it correctly!
`;
  if (showDisplay && data !== undefined) {
    return (
      <div className="relative mx-auto max-w-4xl rounded-lg bg-gray-700 p-4 text-gray-50 shadow-2xl">
        <MdOutlineContentCopy
          className="absolute right-2 top-2 h-6 w-6 cursor-pointer stroke-gray-50"
          onClick={() => {
            navigator.clipboard.writeText(codeToCopy.trim());
            toast.success("Copied to Clipboard!", {
              icon: "😎",
              position: "bottom-center",
              className: "bg-green-50 text-green-900",
              duration: 2500,
            });
          }}
        />
        <pre className="font-mono">
          <code>{codeText}</code>
        </pre>
      </div>
    );
  } else {
    return null;
  }
}

export default ConfigDisplay;
