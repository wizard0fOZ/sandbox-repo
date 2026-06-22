import prisma from "../lib/prisma.js";

export async function testDatabase(_request, response, next) {
  try {
    const result = await prisma.$queryRaw`SELECT NOW() AS current_time`;

    response.json({
      status: "ok",
      message: "Database connection successful",
      currentTime: result[0]?.current_time ?? null
    });
  } catch (error) {
    next(error);
  }
}
