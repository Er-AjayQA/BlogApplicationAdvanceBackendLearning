// import { PrismaClient } from "@prisma/client";
// import { PrismaPg } from "@prisma/adapter-pg";
// import { Pool } from "pg";
// import { DATABASE_URL } from "../config/config.js";

// const pool = new Pool({
//   connectionString: DATABASE_URL,
// });

// const adapter = new PrismaPg(pool);
// export const prisma = new PrismaClient({ adapter });

////////// Above Way Gives Some Error //////////
import { PrismaClient } from "../generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import { DATABASE_URL } from "../config/config.js";

const connectionString = `${DATABASE_URL}`;
const adapter = new PrismaPg(connectionString);
const prisma = new PrismaClient({ adapter });

export { prisma };
