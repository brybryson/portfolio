import fs from "node:fs";
import path from "node:path";
import PDFDocument from "pdfkit";

const TARGET_DIR = path.resolve("public/portfolio-info");

const COLORS = {
  primary: "#0B0F19", // Cyber dark slate
  secondary: "#0284C7", // Sky / Cyan
  accent: "#2563EB", // Blue accent
  text: "#1E293B", // Text slate
  muted: "#64748B", // Gray
  lightBg: "#F8FAFC", // Off-white / light slate
  border: "#CBD5E1", // Border
  codeBg: "#F1F5F9", // Code box
  alertBg: "#EFF6FF", // Blue tint callout
  alertBorder: "#38BDF8", // Alert bar
};

function parseInlineTokens(text) {
  // Replace links [label](url) -> label (url)
  const clean = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1 ($2)");

  // Split by bold (**...**)
  const tokens = [];
  const parts = clean.split(/(\*\*[^*]+\*\*)/g);

  for (const part of parts) {
    if (!part) continue;
    if (part.startsWith("**") && part.endsWith("**")) {
      tokens.push({ text: part.slice(2, -2), bold: true });
    } else {
      tokens.push({ text: part, bold: false });
    }
  }

  return tokens;
}

function renderTokens(doc, tokens, options = {}) {
  const align = options.align || "left";
  const width = options.width;
  const indent = options.indent || 0;

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    const isLast = i === tokens.length - 1;

    doc
      .font(token.bold ? "Helvetica-Bold" : "Helvetica")
      .fontSize(options.fontSize || 9.5)
      .fillColor(token.bold ? options.boldColor || COLORS.primary : options.color || COLORS.text);

    doc.text(token.text, {
      continued: !isLast,
      align: align,
      width: width,
      indent: i === 0 ? indent : 0,
      lineGap: options.lineGap !== undefined ? options.lineGap : 1.5,
    });
  }
}

async function convertMarkdownToPDF(mdFilePath) {
  const fileName = path.basename(mdFilePath, ".md");
  const pdfFilePath = path.join(TARGET_DIR, `${fileName}.pdf`);
  const content = fs.readFileSync(mdFilePath, "utf-8");

  console.log(
    `[PDF Generator] Converting: ${path.basename(mdFilePath)} -> ${path.basename(pdfFilePath)}`,
  );

  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({
      size: "A4",
      margins: { top: 45, bottom: 45, left: 45, right: 45 },
      bufferPages: true,
      autoFirstPage: true,
      info: {
        Title: fileName.replace(/_/g, " ").toUpperCase(),
        Author: "Bryant Iverson Melliza",
        Subject: "Owley AI RAG Knowledge Base Document",
        Keywords: "RAG, Vector Database, Bryant Melliza, Owley AI, Full-Stack, n8n",
        CreationDate: new Date(),
      },
    });

    const writeStream = fs.createWriteStream(pdfFilePath);
    doc.pipe(writeStream);

    const lines = content.split("\n");
    let inCodeBlock = false;
    let codeBuffer = [];

    const contentWidth = doc.page.width - doc.page.margins.left - doc.page.margins.right;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Code Block Handling
      if (line.trim().startsWith("```")) {
        if (inCodeBlock) {
          const codeText = codeBuffer.join("\n");
          doc.moveDown(0.2);

          doc.font("Courier").fontSize(8);
          const blockHeight = doc.heightOfString(codeText, { width: contentWidth - 16 });

          // If block doesn't fit on page, move to next page
          if (doc.y + blockHeight + 16 > doc.page.height - doc.page.margins.bottom) {
            doc.addPage();
          }

          const startY = doc.y;
          doc
            .rect(doc.page.margins.left, startY, contentWidth, blockHeight + 12)
            .fillAndStroke(COLORS.codeBg, COLORS.border);

          doc.fillColor(COLORS.primary).text(codeText, doc.page.margins.left + 8, startY + 6, {
            width: contentWidth - 16,
            lineGap: 1,
          });

          doc.y = startY + blockHeight + 16;
          doc.font("Helvetica").fontSize(9.5);
          codeBuffer = [];
          inCodeBlock = false;
        } else {
          inCodeBlock = true;
          codeBuffer = [];
        }
        continue;
      }

      if (inCodeBlock) {
        codeBuffer.push(line);
        continue;
      }

      // Empty Line
      if (!line.trim()) {
        doc.moveDown(0.25);
        continue;
      }

      // H1 Header (# )
      if (line.startsWith("# ")) {
        const text = line.replace(/^#\s+/, "").trim();
        if (
          doc.y > doc.page.margins.top + 20 &&
          doc.y + 50 > doc.page.height - doc.page.margins.bottom
        ) {
          doc.addPage();
        }
        doc.moveDown(0.3);
        doc
          .font("Helvetica-Bold")
          .fontSize(16)
          .fillColor(COLORS.primary)
          .text(text, { width: contentWidth, lineGap: 2 });

        const barY = doc.y + 2;
        doc.rect(doc.page.margins.left, barY, 40, 2.5).fill(COLORS.secondary);
        doc.y = barY + 8;
        continue;
      }

      // H2 Header (## )
      if (line.startsWith("## ")) {
        const text = line.replace(/^##\s+/, "").trim();
        if (doc.y + 35 > doc.page.height - doc.page.margins.bottom) {
          doc.addPage();
        }
        doc.moveDown(0.35);
        doc
          .font("Helvetica-Bold")
          .fontSize(12)
          .fillColor(COLORS.secondary)
          .text(text, { width: contentWidth });
        doc.moveDown(0.15);
        continue;
      }

      // H3 Header (### )
      if (line.startsWith("### ")) {
        const text = line.replace(/^###\s+/, "").trim();
        if (doc.y + 25 > doc.page.height - doc.page.margins.bottom) {
          doc.addPage();
        }
        doc.moveDown(0.25);
        doc
          .font("Helvetica-Bold")
          .fontSize(10.5)
          .fillColor(COLORS.primary)
          .text(text, { width: contentWidth });
        doc.moveDown(0.1);
        continue;
      }

      // Blockquote (> )
      if (line.startsWith("> ")) {
        const text = line.replace(/^>\s+/, "").trim();
        const tokens = parseInlineTokens(text);

        doc.font("Helvetica").fontSize(8.5);
        const quoteHeight = doc.heightOfString(text.replace(/\*\*/g, ""), {
          width: contentWidth - 20,
        });

        if (doc.y + quoteHeight + 12 > doc.page.height - doc.page.margins.bottom) {
          doc.addPage();
        }

        const startY = doc.y;
        doc.rect(doc.page.margins.left, startY, contentWidth, quoteHeight + 8).fill(COLORS.alertBg);
        doc.rect(doc.page.margins.left, startY, 3.5, quoteHeight + 8).fill(COLORS.alertBorder);

        doc.x = doc.page.margins.left + 10;
        doc.y = startY + 4;
        renderTokens(doc, tokens, {
          fontSize: 8.5,
          width: contentWidth - 20,
          color: COLORS.text,
          lineGap: 1,
        });

        doc.y = startY + quoteHeight + 11;
        continue;
      }

      // Horizontal Rule (---)
      if (line.trim() === "---") {
        doc.moveDown(0.2);
        const ruleY = doc.y;
        doc
          .moveTo(doc.page.margins.left, ruleY)
          .lineTo(doc.page.width - doc.page.margins.right, ruleY)
          .strokeColor(COLORS.border)
          .lineWidth(0.5)
          .stroke();
        doc.y = ruleY + 6;
        continue;
      }

      // Markdown Table Line (| ... |)
      if (line.trim().startsWith("|") && line.trim().endsWith("|")) {
        if (line.includes("---")) continue; // Skip delimiter row

        const cells = line
          .split("|")
          .slice(1, -1)
          .map((c) => c.trim());
        const colWidth = contentWidth / cells.length;

        if (doc.y + 18 > doc.page.height - doc.page.margins.bottom) {
          doc.addPage();
        }

        const rowY = doc.y;
        cells.forEach((cell, idx) => {
          const isHeader = i > 0 && lines[i - 1]?.includes("---");
          const tokens = parseInlineTokens(cell);
          doc.x = doc.page.margins.left + idx * colWidth + 3;
          doc.y = rowY;
          renderTokens(doc, tokens, {
            fontSize: 8,
            width: colWidth - 6,
            lineGap: 1,
            color: isHeader ? COLORS.primary : COLORS.text,
          });
        });

        doc.y = rowY + 14;
        continue;
      }

      // Bullet Point or Numbered List Item
      const listMatch = line.match(/^(\s*)([-•*]|\d+\.)\s+(.*)/);
      if (listMatch) {
        const indentLevel = Math.floor(listMatch[1].length / 2);
        const indentPx = indentLevel * 10;
        const bulletSymbol = listMatch[2].length === 1 ? "•" : listMatch[2];
        const rawContent = listMatch[3];
        const tokens = parseInlineTokens(rawContent);

        // Prepend bullet as first token
        const fullTokens = [{ text: `${bulletSymbol}  `, bold: true }, ...tokens];

        renderTokens(doc, fullTokens, {
          fontSize: 9.5,
          width: contentWidth - indentPx,
          indent: indentPx,
          boldColor: COLORS.secondary,
          color: COLORS.text,
          lineGap: 1.5,
        });

        doc.moveDown(0.15);
        continue;
      }

      // Regular Paragraph
      const tokens = parseInlineTokens(line);
      renderTokens(doc, tokens, {
        fontSize: 9.5,
        width: contentWidth,
        color: COLORS.text,
        lineGap: 1.5,
      });
      doc.moveDown(0.2);
    }

    // Process Header and Footer across all generated pages
    const pageRange = doc.bufferedPageRange();
    const totalPages = pageRange.count;

    for (let p = 0; p < totalPages; p++) {
      doc.switchToPage(p);

      // Running Header
      doc
        .font("Helvetica")
        .fontSize(7.5)
        .fillColor(COLORS.muted)
        .text(
          "BRYANT IVERSON MELLIZA // VERIFIED PORTFOLIO RAG DOSSIER (OWLEY AI)",
          doc.page.margins.left,
          20,
          { width: contentWidth, align: "left" },
        );

      doc
        .moveTo(doc.page.margins.left, 30)
        .lineTo(doc.page.width - doc.page.margins.right, 30)
        .strokeColor("#E2E8F0")
        .lineWidth(0.5)
        .stroke();

      // Running Footer
      const footerY = doc.page.height - 30;
      doc
        .moveTo(doc.page.margins.left, footerY)
        .lineTo(doc.page.width - doc.page.margins.right, footerY)
        .strokeColor("#E2E8F0")
        .lineWidth(0.5)
        .stroke();

      doc
        .font("Helvetica")
        .fontSize(7.5)
        .fillColor(COLORS.muted)
        .text(`Confidential · Page ${p + 1} of ${totalPages}`, doc.page.margins.left, footerY + 6, {
          width: contentWidth,
          align: "right",
        });

      doc.text(
        `Source: ${fileName}.pdf · For n8n / Vector DB Ingestion`,
        doc.page.margins.left,
        footerY + 6,
        { width: contentWidth, align: "left" },
      );
    }

    doc.end();

    writeStream.on("finish", () => {
      console.log(`[PDF Generator] Successfully written: ${pdfFilePath} (${totalPages} pages)`);
      resolve({ pdfFilePath, totalPages });
    });

    writeStream.on("error", (err) => {
      console.error(`[PDF Generator] Error writing ${pdfFilePath}:`, err);
      reject(err);
    });
  });
}

async function main() {
  if (!fs.existsSync(TARGET_DIR)) {
    fs.mkdirSync(TARGET_DIR, { recursive: true });
  }

  const files = fs.readdirSync(TARGET_DIR).filter((f) => f.endsWith(".md"));

  if (files.length === 0) {
    console.log("No markdown files found in", TARGET_DIR);
    return;
  }

  console.log(`Found ${files.length} markdown file(s) to convert to PDF.\n`);

  for (const file of files) {
    const fullPath = path.join(TARGET_DIR, file);
    await convertMarkdownToPDF(fullPath);
  }

  console.log("\n All PDF documents generated successfully without blank pages!");
}

main().catch((err) => {
  console.error("PDF generation failed:", err);
  process.exit(1);
});
