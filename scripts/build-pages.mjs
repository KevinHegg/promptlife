import { build } from "vite";
// An explicit base works on Windows, macOS, Linux, and GitHub Actions.
await build({ base: "/promptlife/" });
