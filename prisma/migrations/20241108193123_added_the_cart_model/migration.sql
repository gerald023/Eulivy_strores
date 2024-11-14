/*
  Warnings:

  - You are about to drop the column `productId` on the `Cart` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Cart` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_cartId_fkey";

-- DropIndex
DROP INDEX "Cart_productId_key";

-- AlterTable
ALTER TABLE "Cart" DROP COLUMN "productId",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "cartId" DROP NOT NULL;

-- CreateTable
CREATE TABLE "CartItem" (
    "id" UUID NOT NULL,
    "productId" UUID NOT NULL,
    "cartId" UUID NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "CartItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Cart"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
