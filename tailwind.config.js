/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontSize: {
        mh1: ["2.5625rem", { lineHeight: "115%", fontWeight: "700" }],
        mh2: ["2.25rem", { lineHeight: "115%", fontWeight: "700" }],
        mh3: ["2rem", { lineHeight: "115%", fontWeight: "700" }],
        mh4: ["1.75rem", { lineHeight: "115%", fontWeight: "700" }],
        mh5: ["1.5625rem", { lineHeight: "115%", fontWeight: "700" }],
        mh6: ["1.4375rem", { lineHeight: "150%", fontWeight: "400" }],
        msmp: ["1.125rem", { lineHeight: "150%", fontWeight: "400" }],
        mxsp: ["1rem", { lineHeight: "150%", fontWeight: "400" }],
        dh1: ["3.375rem", { lineHeight: "115%", fontWeight: "700" }],
        dh2: ["2.8125rem", { lineHeight: "115%", fontWeight: "700" }],
        dh3: ["2.3125rem", { lineHeight: "115%", fontWeight: "700" }],
        dh4: ["1.9375rem", { lineHeight: "115%", fontWeight: "700" }],
        dh5: ["1.625rem", { lineHeight: "115%", fontWeight: "700" }],
        dh6: ["1.375rem", { lineHeight: "115%", fontWeight: "700" }],
        dp: ["1.125rem", { lineHeight: "150%", fontWeight: "400" }],
        dsmp: ["0.9375rem", { lineHeight: "150%", fontWeight: "400" }],
        dxsp: ["0.75rem", { lineHeight: "150%", fontWeight: "400" }],
      },
    },
  },
  plugins: [],
};
