import "dotenv/config";
import { PrismaClient, MissionStatus, UserRole } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.user.upsert({
    where: { email: "admin@sdg-sandbox.local" },
    update: {
      fullName: "Sandbox Admin",
      role: UserRole.ADMIN
    },
    create: {
      email: "admin@sdg-sandbox.local",
      fullName: "Sandbox Admin",
      role: UserRole.ADMIN
    }
  });

  await prisma.user.upsert({
    where: { email: "student@sdg-sandbox.local" },
    update: {
      fullName: "Test Student",
      role: UserRole.USER
    },
    create: {
      email: "student@sdg-sandbox.local",
      fullName: "Test Student",
      role: UserRole.USER
    }
  });

  await prisma.mission.upsert({
    where: { id: "sample-mission-id" },
    update: {
      title: "Upload a Recycling Activity Photo",
      description: "Submit one photo as a test mission proof upload.",
      points: 25,
      status: MissionStatus.ACTIVE
    },
    create: {
      id: "sample-mission-id",
      title: "Upload a Recycling Activity Photo",
      description: "Submit one photo as a test mission proof upload.",
      points: 25,
      status: MissionStatus.ACTIVE
    }
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error("Seed failed:", error);
    await prisma.$disconnect();
    process.exit(1);
  });
