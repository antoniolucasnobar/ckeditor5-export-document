import download from "downloadjs";
import htmlToRtf from "html-to-rtf-browser";

const mime = 'application/rtf';

export default function generateRtf(editorData) {
    const exportedDocument = htmlToRtf.convertHtmlToRtf(editorData);
    const blob = new Blob([exportedDocument], {type: mime} );
    download(blob, 'documento.rtf', mime);
}
