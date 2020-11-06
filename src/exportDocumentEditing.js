/**
 * @module exportDocument/exportDocumentediting
 */

import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import htmlToRtf from 'html-to-rtf-browser';
import rtfIcon from '../theme/icons/rtf.svg'
import ExportDocumentCommand from './exportDocumentCommand';

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
					export: (editorData) => htmlToRtf.convertHtmlToRtf(editorData),
					mime: 'application/rtf'
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
