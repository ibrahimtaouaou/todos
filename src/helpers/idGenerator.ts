export function getNewID(): number {
  const lastIDData: string | null = localStorage.getItem("lastID");
  if (!lastIDData) return 1;
  const lastID: number = JSON.parse(lastIDData);
  return lastID + 1;
}
