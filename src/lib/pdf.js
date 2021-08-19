import PdfPrinter from "pdfmake"


const fonts = {
    Roboto: {
        normal: "Helvetica",
        bold: "Helvetica-Bold",
        italics: "Helvetica-Oblique",
        bolditalics: "Helvetica-BoldOblique",
    },
}

export const getPDFReadableStream = async (blog) => {
    const printer = new PdfPrinter(fonts)

    const docDefinition = {
        content: [
            {
                text: blog.title,
                style: 'header',
                margin: [5, 2, 10, 20]
            },
            {

                image: blog.cover,
                width: 500
            },
            {
                text: ` \nby ${blog.content}`,

            },


        ],
        styles: {
            header: {
                fontSize: 18,
                bold: true
            },

        }
    }

    const options = {}
    const pdfReadableStream = printer.createPdfKitDocument(docDefinition, options)

    pdfReadableStream.end()
    return pdfReadableStream
}