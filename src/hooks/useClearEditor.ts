/* eslint-disable @typescript-eslint/no-explicit-any */
type TPage = { children: any[] };

export default function useClearEditor(store: any) {
  const handleClear = () => {
    const ids = store.pages.map((page: TPage) => page.children.map((child) => child.id)).flat();
    const hasObjects = ids?.length;

    if (hasObjects) {
      if (!window.confirm('Are you sure?')) {
        return;
      }
    }
    const pagesIds = store.pages.map((p: { id: any }) => p.id);
    store.deletePages(pagesIds);
    store.addPage();
  };

  return { handleClear };
}
