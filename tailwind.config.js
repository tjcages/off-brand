/* eslint-disable @typescript-eslint/no-var-requires */
const defaultTheme = require("tailwindcss/defaultTheme");
const plugin = require("tailwindcss/plugin");
const { default: flattenColorPalette } = require("tailwindcss/lib/util/flattenColorPalette");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ["var(--font-geist)", ...defaultTheme.fontFamily.serif],
        mono: ["var(--font-modena)", ...defaultTheme.fontFamily.mono]
      },

      colors: {
        red: { DEFAULT: "rgb(var(--color-red) / <alpha-value>)" },
        dullRed: { DEFAULT: "rgb(var(--color-dull-red) / <alpha-value>)" },
        green: { DEFAULT: "rgb(var(--color-green) / <alpha-value>)" },
        primary: {
          DEFAULT: "rgb(var(--color-primary) / <alpha-value>)",
          foreground: "hsl(var(--primary-foreground))"
        },
        grid: "rgb(var(--color-grid) / <alpha-value>)",
        line: "rgb(var(--color-line) / <alpha-value>)"
      },

      // shadcn stuff
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)"
      },

      // shadcn stuff
      animation: {
        "fade-in": "fade-in 5s ease-out 0.5s forwards"
      },

      // shadcn stuff
      keyframes: {
        "fade-in": {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 }
        }
      },

      // shadcn stuff
      textShadow: {
        sm: "0 1px 2px var(--tw-shadow-color)",
        DEFAULT: "2px 2px 6px var(--tw-shadow-color)",
        lg: "0 8px 16px var(--tw-shadow-color)"
      }
    },

    keyframes: {
      "accordion-down": {
        from: { height: "0" },
        to: { height: "var(--radix-accordion-content-height)" }
      },
      "accordion-up": {
        from: { height: "var(--radix-accordion-content-height)" },
        to: { height: "0" }
      }
    },
    animation: {
      "accordion-down": "accordion-down 0.2s ease-out",
      "accordion-up": "accordion-up 0.2s ease-out"
    }
  },
  plugins: [
    require("tailwind-gradient-mask-image"),
    require("tailwindcss-animate"),
    plugin(function ({ addUtilities, matchUtilities, theme }) {
      matchUtilities(
        {
          "text-shadow": value => ({
            textShadow: value
          })
        },
        { values: theme("textShadow") }
      ),
        addUtilities({
          ".fs-1": {
            fontSize: "clamp(6rem, 8vw, 8rem)",
            fontWeight: 500,

            "@media (max-width: 768px)": {
              fontSize: "4.25rem"
            }
          },
          ".fs-2": {
            fontSize: "clamp(4rem, 6vw, 5rem)",
            fontWeight: 500,

            "@media (max-width: 768px)": {
              fontSize: "3.75rem"
            }
          },
          ".fs-3": {
            fontSize: "clamp(2.5rem, 4vw, 3.75rem)",
            fontWeight: 500,

            "@media (max-width: 768px)": {
              fontSize: "1.75rem"
            }
          },
          ".fs-4": {
            fontSize: "clamp(1.25rem, 2.5vw, 2rem)",
            fontWeight: 400,

            "@media (max-width: 768px)": {
              fontSize: "1.25rem"
            }
          },
          ".fs-5": {
            fontSize: "clamp(1rem, 1.5vw, 1.55rem)",
            fontWeight: 400,

            "@media (max-width: 768px)": {
              fontSize: "1.4rem"
            }
          },
          ".disclaimer": {
            fontSize: "clamp(0.75rem, 1vw, 1rem)",
            fontWeight: 400,

            "@media (max-width: 768px)": {
              fontSize: "1rem"
            }
          },
          "canvas-fade-in": {
            animation: "fade-in 5s ease-out 0.5s forwards"
          }
        });
    }),
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          "chop-x": value => {
            value = value === "0" ? "0px" : value;
            return {
              "& > :not([hidden]) ~ :not([hidden])": {
                position: `relative`
              },
              "& > :not([hidden]) ~ :not([hidden]):before": {
                "@defaults border-width": {},
                content: "''",
                position: "absolute",
                top: 0,
                left: `calc(var(--tw-chop-x-offset,-1px)*-1)`,
                height: "100%",
                "border-right-width": `${value}`
              }
            };
          }
        },
        { values: theme("borderWidth"), type: ["line-width", "length", "any"] }
      );
      matchUtilities(
        {
          chop: value => {
            return {
              ["& > :not([hidden]) ~ :not([hidden]):before"]: {
                "border-color": value
              }
            };
          }
        },
        {
          values: (({ DEFAULT: _, ...colors }) => colors)(
            flattenColorPalette(theme("borderColor"))
          ),
          type: ["color", "any"]
        }
      );
      matchUtilities(
        {
          "chop-offset": value => {
            return {
              [`& > :not([hidden]) ~ :not([hidden]):before`]: {
                "--tw-chop-x-offset": value
              }
            };
          }
        },
        { values: theme("spacing") }
      );
    })
  ]
};
