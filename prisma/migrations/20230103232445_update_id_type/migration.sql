/*
  Warnings:

  - The primary key for the `Charge` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Charge` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Charge" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "status" TEXT NOT NULL DEFAULT 'PENDENTE',
    "horaSolicitacao" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "horaFinalizacao" DATETIME,
    "valor" REAL NOT NULL,
    "ciclista" TEXT NOT NULL
);
INSERT INTO "new_Charge" ("ciclista", "horaFinalizacao", "horaSolicitacao", "id", "status", "valor") SELECT "ciclista", "horaFinalizacao", "horaSolicitacao", "id", "status", "valor" FROM "Charge";
DROP TABLE "Charge";
ALTER TABLE "new_Charge" RENAME TO "Charge";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
