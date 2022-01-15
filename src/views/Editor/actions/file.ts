/* eslint-disable @typescript-eslint/no-explicit-any */
export const loadJSONFile = (file: any, store: any) => {
  const reader = new FileReader();
  reader.onloadend = function () {
    const text = reader.result;
    let json;
    try {
      json = JSON.parse(text as any);
    } catch (e) {
      alert('Can not load the project.');
    }

    if (json) {
      store.loadJSON(json);
    }
  };
  reader.onerror = function () {
    alert('Can not load Polotno project file.');
  };
  reader.readAsText(file);
};

export const loadImageFile = (file: any, store: any) => {
  const reader = new FileReader();
  reader.onloadend = function () {
    const url = reader.result;
    const img = new Image();
    img.src = url as any;
    img.onload = () => {
      const scale = Math.min(1, store.width / img.width, store.height / img.height);
      store.activePage.addElement({
        type: 'image',
        width: img.width * scale,
        height: img.height * scale,
        src: url,
      });
    };
  };
  reader.onerror = function () {
    alert('Can not load image.');
  };
  reader.readAsDataURL(file);
};

export const loadFile = (file: any, store: any) => {
  if (file.type.indexOf('image') >= 0) {
    loadImageFile(file, store);
  } else {
    loadJSONFile(file, store);
  }
};
