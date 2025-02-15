import crypto from "crypto";
import "server-only";

const ALG = "aes-256-cbc";

export function symmetricEncrypt(data: string) {
  // openssl rand -hex 32
  const key = process.env.ENCRYPTION_SECRET;
  if (!key) {
    throw new Error("encryption key is not set");
  }
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(ALG, Buffer.from(key, "hex"), iv);
  let encrypted = cipher.update(data);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString("hex") + ":" + encrypted.toString("hex");
}

export const symmetricDecrypt = (encrypted: string) => {
  const key = process.env.ENCRYPTION_SECRET;
  if (!key) {
    throw new Error("encryption key is not set");
  }
  const parts = encrypted.split(":");
  const iv = Buffer.from(parts.shift() as string, "hex");
  const encryptedText = Buffer.from(parts.join(":"), "hex");
  const decipher = crypto.createDecipheriv(ALG, Buffer.from(key, "hex"), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
};
