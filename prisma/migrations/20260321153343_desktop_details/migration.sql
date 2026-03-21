-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Desktop" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "cpu" TEXT NOT NULL,
    "gpu" TEXT NOT NULL,
    "ram" TEXT NOT NULL,
    "ssd" TEXT NOT NULL,
    "os" TEXT NOT NULL,
    "specs" TEXT NOT NULL DEFAULT '{}',
    "price" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Desktop" ("cpu", "createdAt", "gpu", "id", "name", "os", "price", "ram", "slug", "ssd") SELECT "cpu", "createdAt", "gpu", "id", "name", "os", "price", "ram", "slug", "ssd" FROM "Desktop";
DROP TABLE "Desktop";
ALTER TABLE "new_Desktop" RENAME TO "Desktop";
CREATE UNIQUE INDEX "Desktop_slug_key" ON "Desktop"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
