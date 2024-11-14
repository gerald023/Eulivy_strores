-- CreateEnum
CREATE TYPE "ROLES" AS ENUM ('ADMIN', 'SELLER', 'BUYER', 'DELIVERY');

-- CreateEnum
CREATE TYPE "ShopCategory" AS ENUM ('LOGISTICS', 'BOUTIQUE', 'FOODSTUFF', 'UTENSILS', 'TECH', 'DRUGS');

-- CreateEnum
CREATE TYPE "ProductStatus" AS ENUM ('AVAILABLE', 'OUT_OF_STOCK');

-- CreateEnum
CREATE TYPE "TransactionStatus" AS ENUM ('pending', 'failed', 'successful');

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "ROLES" NOT NULL DEFAULT 'SELLER',
    "email" TEXT NOT NULL,
    "activationLink" TEXT NOT NULL,
    "isActivated" BOOLEAN NOT NULL DEFAULT false,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserProfile" (
    "id" UUID NOT NULL,
    "username" TEXT NOT NULL,
    "bio" TEXT,
    "profileImage" TEXT NOT NULL,
    "userID" UUID NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RefreshTokens" (
    "id" SERIAL NOT NULL,
    "userId" UUID NOT NULL,
    "token" TEXT NOT NULL,

    CONSTRAINT "RefreshTokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Shop" (
    "id" UUID NOT NULL,
    "shopName" TEXT NOT NULL,
    "shopImage" TEXT[],
    "aboutShop" TEXT NOT NULL,
    "userID" UUID NOT NULL,
    "shopCategory" "ShopCategory" NOT NULL DEFAULT 'BOUTIQUE',
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Shop_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contact" (
    "id" SERIAL NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "address" TEXT,
    "socials" TEXT[],
    "shopID" UUID NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "status" "ProductStatus" NOT NULL DEFAULT 'AVAILABLE',
    "price" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "shopID" UUID NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" UUID NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "user_id" UUID NOT NULL,
    "status" "TransactionStatus" NOT NULL DEFAULT 'pending',
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_activationLink_key" ON "User"("activationLink");

-- CreateIndex
CREATE UNIQUE INDEX "UserProfile_userID_key" ON "UserProfile"("userID");

-- CreateIndex
CREATE UNIQUE INDEX "RefreshTokens_userId_key" ON "RefreshTokens"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "RefreshTokens_token_key" ON "RefreshTokens"("token");

-- CreateIndex
CREATE UNIQUE INDEX "Shop_shopName_key" ON "Shop"("shopName");

-- CreateIndex
CREATE UNIQUE INDEX "Shop_userID_key" ON "Shop"("userID");

-- CreateIndex
CREATE UNIQUE INDEX "Contact_phoneNumber_key" ON "Contact"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Contact_email_key" ON "Contact"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Contact_shopID_key" ON "Contact"("shopID");

-- AddForeignKey
ALTER TABLE "UserProfile" ADD CONSTRAINT "UserProfile_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RefreshTokens" ADD CONSTRAINT "RefreshTokens_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Shop" ADD CONSTRAINT "Shop_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_shopID_fkey" FOREIGN KEY ("shopID") REFERENCES "Shop"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_shopID_fkey" FOREIGN KEY ("shopID") REFERENCES "Shop"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
