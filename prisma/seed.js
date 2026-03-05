const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  await prisma.student.createMany({
    data: [
      { name: "John Doe", email: "john.doe@example.com", enrolledCourses: 5, certificates: 3, joinDate: "2024-01-15" },
      { name: "Jane Smith", email: "jane.smith@example.com", enrolledCourses: 8, certificates: 6, joinDate: "2024-02-01" },
      { name: "Alex Johnson", email: "alex.johnson@example.com", enrolledCourses: 3, certificates: 1, joinDate: "2024-02-10" },
      { name: "Maria Garcia", email: "maria.garcia@example.com", enrolledCourses: 6, certificates: 4, joinDate: "2024-01-28" },
    ],
    skipDuplicates: true,
  });
  console.log("Seeded students.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
