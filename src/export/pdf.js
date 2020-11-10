import htmlToPdfmake from "html-to-pdfmake";
import pdfMake from 'pdfmake/build/pdfmake';
import vfs from '../fonts/vfs_fonts';

export default function generatePdf(editorData) {
    const fonts = {
        CourierNew: {
            normal: 'courier-new.ttf',
            bold: 'courier-new-grassetto.ttf',
            italics: 'courier-new-corsivo.ttf',
            bolditalics: 'courier-new-grassetto-corsivo.ttf'
        },
        TimesNewRoman: {
            normal: 'times-new-roman.ttf',
            bold: 'times-new-roman-grassetto.ttf',
            italics: 'times-new-roman-corsivo.ttf',
            bolditalics: 'times-new-roman-grassetto-corsivo.ttf'
        }
    };

    const html = htmlToPdfmake( editorData, {
        defaultStyles: {
            p: {marginBottom:5, marginTop:5, margin:''},
            img: { maxWidth: 200, _maxWidth: 200},
            figure: { maxWidth: 200, _maxWidth: 200}
        }
    } );


    const docDefinition = {
        content: html,
        defaultStyle: {
            font: 'CourierNew'
        }
    };

    pdfMake.createPdf(docDefinition, null, fonts, vfs)
        .download('documento.pdf');
}
