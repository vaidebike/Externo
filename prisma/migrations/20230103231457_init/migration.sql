-- CreateTable
CREATE TABLE "Charge" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "status" TEXT NOT NULL DEFAULT 'PENDENTE',
    "horaSolicitacao" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "horaFinalizacao" DATETIME,
    "valor" REAL NOT NULL,
    "ciclista" TEXT NOT NULL
);
