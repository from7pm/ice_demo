import { CKEditor as BaseCKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import React from 'react';

class DemoUploadAdapter {
  constructor(loader) { this.loader = loader; }
  upload() { return this.loader.file.then((file) => ({ default: URL.createObjectURL(file) })); }
  abort() {}
}
function DemoUploadAdapterPlugin(editor) {
  editor.plugins.get('FileRepository').createUploadAdapter = (loader) => new DemoUploadAdapter(loader);
}
export default function Editor({ onContentChange }) {
  return (
    <div className="smart-editor-wrapper" style={{ width: '100%' }}>
      <BaseCKEditor
        editor={ClassicEditor}
        config={{ licenseKey: 'GPL', extraPlugins: [DemoUploadAdapterPlugin], placeholder: '문의 내용을 입력해주세요.', toolbar: ['heading', '|', 'bold', 'italic', 'link', 'uploadImage', 'insertTable', '|', 'undo', 'redo'] }}
        data=""
        onChange={(_, editor) => onContentChange?.(editor.getData())}
      />
    </div>
  );
}
