import cors from "cors";
import express from "express";
import fs from "fs";
import multer from "multer";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const { id } = req.params;
    const dir = path.join(__dirname, `public/uploads/books/${id}`);

    fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

app.use(express.static(path.join(__dirname, "public")));

app.post("/upload/:id", upload.array("images"), (req, res) => {
  const { id } = req.params;
  const files = req.files;

  console.log("req.params:", req.params);
  console.log("req.files:", req.files);

  if (!files) {
    return res.status(400).send("Nenhum arquivo foi enviado.");
  }

  const imagePaths = files.map(
    (file) => `/uploads/books/${id}/${file.filename}`
  );
  res.json({ imagePaths });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

app.post("/books", (req, res) => {
  const newBook = req.body;

  console.log("Novo livro recebido:", newBook);

  if (!newBook || typeof newBook !== "object") {
    console.log("aqui: Dados inválidos.");
    return res.status(400).send("Dados inválidos.");
  }

  try {
    const dbContent = fs.readFileSync("db.json", "utf8");
    const db = JSON.parse(dbContent);
    db.books.push(newBook);

    fs.writeFileSync("db.json", JSON.stringify(db, null, 2));
    res.status(201).send("Livro adicionado com sucesso!");
    console.log("Livro adicionado com sucesso!");
  } catch (err) {
    console.error("Erro ao processar livro:", err);
    res.status(500).send("Erro ao processar livro.");
  }
});
