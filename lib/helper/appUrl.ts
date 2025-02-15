export function getAppUrl(path: string) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL;
  if (!appUrl) {
    throw new Error("APP_URL is not defined");
  }
  return `${appUrl}/${path}`;
}
