import {
  chainMatch,
  isPageRequest,
  csp,
  strictDynamic,
} from "@next-safe/middleware";

const securityMiddleware = [
  csp({
    // your CSP base configuration with IntelliSense
    // single quotes for values like 'self' are automatic
    directives: {
      "img-src": [
        "self",
        "data:",
        "https://assets.codepen.io",
        "https://i.postimg.cc",
      ],
      "style-src": ["self", "unsafe-inline"],
      "frame-src": ["self", "data:", "https://js.stripe.com"],
      "script-src": ["self", "https://js.stripe.com"],
    },
  }),
  strictDynamic(),
];

export default chainMatch(isPageRequest)(...securityMiddleware);
