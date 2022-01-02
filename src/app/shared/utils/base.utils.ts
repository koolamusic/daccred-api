export async function useAsyncHandler(callback: unknown) {
  try {
    const data = await callback;
    return [data, null];
  } catch (error) {
    console.error(error, `error log from async handler - ${callback}`);
    return [null, error];
  }
}
