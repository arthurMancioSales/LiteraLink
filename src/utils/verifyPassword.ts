import { scrypt } from "crypto";

export async function verifyPassword(senha: string, salt: string, hashArmazenado: string) {
    return new Promise((resolve, reject) => {
      scrypt(senha, salt, 64, (err, derivedKey) => {
        if (err) reject(err);
        const hashGerado = derivedKey.toString('hex');
        resolve(hashGerado === hashArmazenado);
      });
    });
}