import pdf from 'html-pdf-node-ts';
import markdownIt from 'markdown-it';
import { readFileSync, writeFileSync } from 'fs';
import { join, parse } from 'path';

const readFile = (file: string):string => {
    return readFileSync(file, 'utf8');
}

const readTemplateFile = (): string => {
    return readFile('template/template.html')
}

const main = () => {
    if (process.argv.length > 2)
    {
        if (process.argv[2] != "html" && process.argv[2] != "pdf")
        {
            console.log(`Invalid option ${process.argv[2]}.`);
            console.log('Usage: <html|pdf> <file1> ...');
            process.exit(1);
        }

        if (process.argv.length < 4) 
        {
            console.log('No input file.');
            console.log('Usage: <html|pdf> <file1> ...');
            process.exit(1);
        }

        // framework
        const md = new markdownIt({html: true});
        
        const files = process.argv.slice(3);

        files.forEach(file => {
            if (parse(file).ext !== '.md') {
                console.error(`Could not read ${parse(file).name}${parse(file).ext}: Only accepts .md files`);
                return;
            }

            const mdString = readFile(file);

            // render to html
            const htmlString = readTemplateFile()
                .replace("{markdownFile}", `${parse(file).name}${parse(file).ext}`)
                .replace("{body}", md.render(mdString));

            switch (process.argv[2]) {
                case 'html':
                    writeFileSync(join(parse(file).dir, `${parse(file).name}.html`), htmlString);
                    console.log(`File exported to ${join(parse(file).dir, `${parse(file).name}.html`) }`);
                    break;
                case 'pdf':
                    pdf.generatePdf({ content: htmlString }, { format: "A4" }).then(buffer => {
                        writeFileSync(join(parse(file).dir, `${parse(file).name}.pdf`), buffer);
                        console.log(`File exported to ${join(parse(file).dir, `${parse(file).name}.pdf`)}`);
                    });
                    break;
            }
        })
    } else {
        console.log('Usage: <html|pdf> <file1> ...');
        process.exit(1);
    }
}

main();