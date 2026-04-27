import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

type RuntimeEnv = Record<string, string | number | boolean | undefined>;

export const env = createEnv({
  clientPrefix: "NEXT_",
  client: {
    NEXT_PUBLIC_REMOTE_AI_ASSISTANT_URL: z.url(),
    NEXT_PUBLIC_REMOTE_USER_APP_URL: z.url(),
    NEXT_PUBLIC_REMOTE_PAYMENT_APP_URL: z.url(),
    NEXT_PUBLIC_API_URL: z.url(),
  },
  runtimeEnv: import.meta.env as RuntimeEnv,
  emptyStringAsUndefined: true,
});
