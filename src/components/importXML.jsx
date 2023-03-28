import React, { useRef } from 'react';
import { loadFile } from '../services/musicXMLImport';

export const ImportXML = () => {
  const ref = useRef();

  const handleFile = async (event) => {
    const fileList = event.target.files;
    const [file] = fileList;

    loadFile(ref.current, file);
  };

  return (
    <>
      <input type="file" onChange={handleFile} accept=".xml,.mxl,.musicxml" />
      <div ref={ref} />
    </>
  );
};
