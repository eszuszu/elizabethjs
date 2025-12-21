import fs from 'node:fs';
import type { PathLike } from 'node:fs';
import path from 'node:path';
import * as stream from 'node:stream';
import util from 'node:util';
import { EOL } from 'node:os';
import { marked } from "marked";

/* This script module illustrates transforming markdown into html via streams of Uint8Array buffers */

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

async function* transformMarkdown(files: string[], encoder: TextEncoder, decoder: TextDecoder) {
  for (const file of files) {
    try {

      const rawBuffer = await fsPromises.readFile(file);
      const markdownString = decoder.decode(rawBuffer);
      const htmlString = marked.parse(markdownString);
      yield encoder.encode(htmlString + EOL); 

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

async function composePageHTML(templateFile: PathLike, markdownSource: string[], outPath: PathLike) {
  const templateBuffer = await fsPromises.readFile(templateFile);
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();
  const templateString = decoder.decode(templateBuffer);
  const [header, footer] = templateString.split('<!--__CONTENT_MARKER__-->');
  
  //this master generator yields streams of Uint8Array TypedArrays, encoders keep the pipeline binary first
  async function* pageAssembler() {
    yield encoder.encode(header + EOL);
    yield* transformMarkdown(markdownSource, encoder, decoder);
    yield encoder.encode(footer);
  }

  const readableStream = stream.Readable.from(pageAssembler());
  await writeToStream(readableStream, outPath)
}

async function main() {
  console.log("Compiling markdown...");
  try {
    const filesToTransform = await walkAsync(markdownSrc);
    
    await composePageHTML(templateSrc, filesToTransform, outPath);

    console.log(`Succesfully compiled ${filesToTransform.length} files to ${outPath}`);

  } catch (error) {
    console.error("An error occured during main process:", error);
    process.exit(1);
  }
}

main();