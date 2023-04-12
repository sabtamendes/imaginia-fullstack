import { PrismaClient, PageType } from "@prisma/client";
const prisma = new PrismaClient();
import { randomBytes } from "crypto";

export function generateRandomCode(): string {
  let code = "";
  while (code.length < 6) {
    const byte = randomBytes(1)[0];
    const char = String.fromCharCode(byte);
    if (char >= "A" && char <= "Z") {
      code += char;
    }
  }
  return code;
}

async function createBook() {
  const book = await prisma.book.create({
    data: {
      title: "O Coelhinho Aventureiro",
      author: "Ana Silva",
      professor: "Luiz Andre",
      magicCode: generateRandomCode(),
      pages: {
        create: [
          {
            pageNumber: 1,
            pageType: PageType.TEXT,
            content: `Era uma vez um coelhinho chamado Tico, que adorava aventuras. 
              Ele morava em uma toca no meio da floresta e sempre que podia, 
              explorava os arredores em busca de novidades.`,
          },
          {
            pageNumber: 2,
            pageType: PageType.TEXT,
            content: `Um dia, enquanto Tico caminhava pela floresta, 
            ele ouviu um som estranho vindo de um arbusto. 
            Curioso, ele se aproximou e viu que era um pequeno filhote de coruja que tinha caído do ninho.`,
          },

          {
            pageNumber: 3,
            pageType: PageType.TEXT,
            content: `Sem hesitar, Tico pegou o filhote de coruja e começou a procurar por sua mãe. 
            Ele perguntou a todos os animais que encontrava pelo caminho,
             mas ninguém parecia saber onde a coruja morava.`,
          },

          {
            pageNumber: 4,
            pageType: PageType.TEXT,
            content: `Foi então que Tico teve uma ideia. 
            Ele sabia que os pássaros costumavam construir seus ninhos nas árvores mais altas da floresta. 
            Então, ele começou a subir em uma árvore, com o filhote de coruja em seus braços.`,
          },

          {
            pageNumber: 5,
            pageType: PageType.TEXT,
            content: `Depois de subir muito alto, Tico finalmente encontrou o ninho da coruja e deixou o filhote lá. 
            Quando a mãe coruja voltou, ficou muito agradecida e agradeceu Tico com um abraço apertado.`,
          },

          {
            pageNumber: 6,
            pageType: PageType.TEXT,
            content: `Desde aquele dia, Tico ficou conhecido como o coelhinho aventureiro, 
            que sempre estava disposto a ajudar os animais da floresta em apuros. 
            E todos os animais se tornaram seus amigos e o respeitavam muito.
            E assim, o coelhinho Tico viveu muitas aventuras e sempre foi lembrado como um herói na floresta.`,
          },
        ],
      },
    },
  });

  console.log(book);
}

createBook()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
