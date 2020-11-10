/**
 * @module exportDocument/exportDocumentediting
 */

import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import rtfIcon from '../theme/icons/rtf.svg'
import pdfIcon from '../theme/icons/pdf.svg'
import ExportDocumentCommand from './exportDocumentCommand';

import generatePdf from "./export/pdf";
import generateRtf from "./export/rtf";

/**
 *
 * @extends module:core/plugin~Plugin
 */
export default class ExportDocumentEditing extends Plugin {
	/**
	 * @inheritDoc
	 */
	static get pluginName() {
		return 'ExportDocumentEditing';
	}

	/**
	 * @inheritDoc
	 */
	constructor( editor ) {
		super( editor );

		editor.config.define( 'export-document', {
			options: [
				{
					extension: 'rtf',
					title: 'Export to RTF',
					icon: rtfIcon,
					export: (editorData) => generateRtf(editorData),
					mime: 'application/rtf'
				},
				{
					extension: 'pdf',
					title: 'Export to PDF',
					icon: pdfIcon,
					export: (editorData) => generatePdf(editorData),
					mime: 'application/pdf'
				},
			]
		} );
	}

	/**
	 * @inheritDoc
	 */
	init() {
		const editor = this.editor;
		editor.commands.add( 'export-document', new ExportDocumentCommand( editor ) );
	}
}
