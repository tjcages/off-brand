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
      "frame-src": ["self", "https://js.stripe.com"],
      "script-src": ["self", "https://js.stripe.com"],
    },
  }),
  strictDynamic(),
];

export default chainMatch(isPageRequest)(...securityMiddleware);
