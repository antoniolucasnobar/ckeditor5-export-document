
/**
 * @module exportDocument/exportDocumentcommand
 */

import Command from '@ckeditor/ckeditor5-core/src/command';
import download from 'downloadjs'

/**
 * The Export Document command. It is used by the {@link module:exportDocument/exportDocumentediting~ExportDocumentEditing feature}
 * to export current document.
 *
 * editor.execute( 'export-document', { export : () => {} , mime : 'application/rtf', extension: 'rtf' } );
 *
 * @extends module:core/command~Command
 */
export default class ExportDocumentCommand extends Command {
	/**
	 * @inheritDoc
	 */
	refresh() {
		this.isEnabled = true;
	}

	/**
	 * Executes the command.
	 *
	 * @param {module exportDocument/exportDocument~ExportDocumentOption} [options] Options for the executed
	 * command.
	 *
	 * @fires execute
	 */
	execute( options ) {
		const exportedDocument = options.export(this.editor.getData());
		const blob = new Blob([exportedDocument], {type: options.mime} );
		download(blob, 'documento.' + options.extension , options.mime);
	}
}
