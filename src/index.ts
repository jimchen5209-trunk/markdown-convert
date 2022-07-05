import pdf, { CreateOptions } from 'html-pdf';
import markdownIt from 'markdown-it';
import { readFileSync, writeFileSync } from 'fs';
import { join, parse } from 'path';

const readMdFile = (file: string):string => {
    return readFileSync(file, 'utf8');
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
        const md = new markdownIt();
        
        const files = process.argv.slice(3);

        files.forEach(file => {
            const mdString = readMdFile(file);

            // render to html
            const htmlString = md.render(mdString);

            switch (process.argv[2]) {
                case 'html':
                    writeFileSync(join(parse(file).dir, `${parse(file).name}.html`), htmlString);
                    console.log(`File exported to ${join(parse(file).dir, `${parse(file).name}.html`) }`);
                    break;
                case 'pdf':
                    const options = { format: "A4" } as CreateOptions;
                    pdf.create(htmlString, options).toFile(join(parse(file).dir, `${parse(file).name}.pdf`), function (err, res) {
                        if (err) return console.log(err);
                        console.log(`File exported to ${res.filename}`);
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