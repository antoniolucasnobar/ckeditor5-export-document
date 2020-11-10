CKEditor 5 Export Document feature
============================

This package implements Export Document support for CKEditor 5.

It could be called poor's man export (yes, this one is free! yay!). 
Maybe (probably), it is not as good as the CKEditor5 paid implementation:
 (https://ckeditor.com/docs/ckeditor5/latest/features/export-pdf.html and 
https://ckeditor.com/docs/ckeditor5/latest/features/export-word.html). 
I suggest you to check their solution!
But, if you can not pay or want to contribute to a new project, you are welcome! 

Right now, it supports RTF (using html-to-rtf-browser) and PDF (using html-to-pdfmake and pdfmake) conversion. More to come.

These two conversion examples does not need a server.  

You can add other conversions (with or without server) using the editor configuration. 
Just provide a callback to produce the conversion and you are done.

We need translators! If you want to translate to your language, open a PR!

## Installation
```shell script
$ npm install ckeditor5-export-document
```

then you can use in your build like this

```javascript
import ExportDocument from 'ckeditor5-export-document/src/exportDocument';
// it can be any CKEditor flavour
DecoupledEditor.builtinPlugins = [
//...
	ExportDocument,
]
//...
	toolbar: {
		items: [
			'export-document'
        ]
    }
```

## License

MIT
