import { OpenSheetMusicDisplay } from 'opensheetmusicdisplay';

const getXML = (file) => {
  const fileName = file.name.toLowerCase();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target.result) resolve(e.target.result);
      else reject(new Error('No data found'));
    };

    if (fileName.indexOf('.xml') > 0 || fileName.indexOf('.musicxml') > 0) {
      reader.readAsText(file);
    } else if (fileName.indexOf('.mxl') > 0) {
      reader.readAsBinaryString(file);
    } else {
      reject(new Error('Not a valid .xml/.mxl/.musicxml file.'));
    }
  });
};

export const loadFile = async (container, file) => {
  const osmd = new OpenSheetMusicDisplay(container);
  osmd.setOptions({
    backend: 'svg',
    drawTitle: true,
  });

  const xmlFile = await getXML(file);
  await osmd.load(xmlFile);

  osmd.render();
};
