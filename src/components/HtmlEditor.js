import '@reshuffle/code-transform/macro';
import React, { useEffect } from 'react';
import { GEditor } from 'grapesjs-react';
import GrapesJS from 'grapesjs';
import { saveHtmlFields } from '../../backend/backend';

export default function HtmlEditor() {
  useEffect(() => {
    const initEditorCommands = async () => {
      try {
        const editor = GrapesJS.editors[0];
        if (editor) {
          //Listener on changes in the editor
          editor.on('change:changesCount', async e => {
            await saveHtmlFields({
              html: editor.getHtml(),
              css: editor.getCss(),
              js: editor.getJs(),
            });
          });
        }
      } catch (error) {
        console.error(`An error at HtmlEditor on savePage, details: ${error}`);
      }
    };
    initEditorCommands();
  }, []);

  const storageManagerRemote = {
    id: 'grapes',
    type: 'remote',
    stepsBeforeSave: 1,
    autosave: true,
    autoload: true,
    urlStore: './store',
    urlLoad: './load',
  };

  return (
    <div className='container-fluid'>
      <div>
        <GEditor id='geditor' webpage storageManager={storageManagerRemote} />
      </div>
    </div>
  );
}
