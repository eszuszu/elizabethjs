import fs from 'node:fs';
import type { PathLike } from 'node:fs';
import path from 'node:path';
import * as stream from 'node:stream';
import util from 'node:util';
import { EOL } from 'node:os';
import { marked } from "marked";


const fsPromises = fs.promises;
const pipeline = util.promisify(stream.pipeline);

const markdownSrc = path.resolve("content");
const templateSrc = path.resolve("templates/case-studies.template.html");

const outPath = path.resolve("src/case-studies/index.html");

async function walkAsync(dir: string): Promise<string[]> {
  try {
    const files = await fsPromises.readdir(dir, { recursive: true });

    const markdown = files
      .filter((file) => file.endsWith(".md"))
      .map((file) => path.join(dir, file));
    return markdown;

  } catch (error) {
    console.error("Error walking directory:", error);
    return [];
  }
}

async function* transformMarkdown(files: string[]) {
  for (const file of files) {
    try {
      const raw = await fsPromises.readFile(file, 'utf-8');
      yield marked.parse(raw) + EOL; 
    } catch (error) {
      console.error(`Skipping file due to read error: ${file}`, error);
    }

  }
}

async function writeToStream(readable: stream.Readable, filePath: PathLike) {
  await fsPromises.mkdir(path.dirname(filePath.toString()), { recursive: true });

  const writable = fs.createWriteStream(filePath);
  await pipeline(readable, writable);

}

async function composePageHTML(templateFile: PathLike, markdownSource: string[], outDir: PathLike) {
  const template = await fsPromises.readFile(templateFile, 'utf-8');
  const [header, footer] = template.split('<!--__CONTENT_MARKER__-->');

  async function* pageAssembler() {
    yield header + EOL;
    yield* transformMarkdown(markdownSource);
    yield footer;
  }

  const readableStream = stream.Readable.from(pageAssembler(), {encoding: 'utf8'});
  await writeToStream(readableStream, outDir)
}

async function main() {
  console.log("Compiling markdown...");
  try {
    const filesToTransform = await walkAsync(markdownSrc);
    
    await composePageHTML(templateSrc, filesToTransform, outPath);

    console.log(`Succesfully compiled ${filesToTransform.length} files to ${outPath}`);

  } catch (error) {
    console.error("An error occured dcuring main process:", error);
    process.exit(1);
  }
}

main();