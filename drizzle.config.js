import { defineConfig } from "drizzle-kit";
 
export default defineConfig({
  schema: "./dbConfigs/schema.js",
  out: "./drizzle",
  dialect: 'postgresql',
  dbCredentials: {
    url: `postgresql://neondb_owner:SqPhZdT62sDE@ep-lively-breeze-a1ti7851.ap-southeast-1.aws.neon.tech/AI-FORM-BUILDER?sslmode=require`,
  }
});