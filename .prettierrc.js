module.exports = {

  // prettier settings
  "arrowParens": "avoid",
  "trailingComma": "none",
  "printWidth": 100,

  "plugins": ["prettier-plugin-tailwindcss", "@trivago/prettier-plugin-sort-imports"],

  // tailwindcss plugin settings
  "tailwindFunctions": ["cn"],

  // sort imports plugin settings
  "importOrder": [
    "^@/utils/(.*)$",
    "^@/apis/(.*)$",
    "^@/hooks/(.*)$",
    "^@/app/(.*)$",
    "^@/pages/(.*)$",
    "^@/components/(.*)$",
    "^@/styles/(.*)$",
    "^[./]"
  ],
  "importOrderSeparation": true,
  "importOrderSortSpecifiers": true
}
