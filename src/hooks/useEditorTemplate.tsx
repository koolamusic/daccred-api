/* eslint-disable @typescript-eslint/no-explicit-any */
type TPage = { children: any[] };

export default function useEditorTemplate(store: any) {
  const appendTemplate = (json: JSON) => {
    const ids = store.pages.map((page: TPage) => page.children.map((child) => child.id)).flat();
    const hasObjects = ids?.length;

    if (hasObjects) {
      if (!window.confirm('Choosing this template will replace the existing design')) {
        return;
      }
    }
    store.loadJSON(json);
  };

  return { appendTemplate };
}
