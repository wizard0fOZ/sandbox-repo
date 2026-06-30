import "dotenv/config";
import {
  ApprovalMode,
  MissionStatus,
  MissionType,
  PrismaClient,
  UserRole
} from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const admin = await prisma.user.upsert({
    where: { email: "admin@sdg-sandbox.local" },
    update: {
      name: "Sandbox Admin",
      passwordHash: "sandbox-admin-placeholder-hash",
      role: UserRole.ADMIN
    },
    create: {
      email: "admin@sdg-sandbox.local",
      name: "Sandbox Admin",
      passwordHash: "sandbox-admin-placeholder-hash",
      role: UserRole.ADMIN
    }
  });

  await prisma.user.upsert({
    where: { email: "student@sdg-sandbox.local" },
    update: {
      name: "Test Student",
      passwordHash: "sandbox-student-placeholder-hash",
      role: UserRole.USER
    },
    create: {
      email: "student@sdg-sandbox.local",
      name: "Test Student",
      passwordHash: "sandbox-student-placeholder-hash",
      role: UserRole.USER
    }
  });

  await prisma.mission.upsert({
    where: { id: "sample-mission-id" },
    update: {
      title: "Upload a Recycling Activity Photo",
      description: "Submit one photo as a test mission proof upload.",
      missionType: MissionType.QUANTITY,
      points: 25,
      submissionCap: 1,
      approvalMode: ApprovalMode.MANUAL,
      status: MissionStatus.ACTIVE
    },
    create: {
      id: "sample-mission-id",
      title: "Upload a Recycling Activity Photo",
      description: "Submit one photo as a test mission proof upload.",
      missionType: MissionType.QUANTITY,
      points: 25,
      submissionCap: 1,
      approvalMode: ApprovalMode.MANUAL,
      createdById: admin.id,
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
