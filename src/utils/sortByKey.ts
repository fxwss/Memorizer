export default function sortByKey<T>(items: T[], key: keyof T) {
  return items.sort((a, b) => {
    if (a[key] < b[key]) return -1;
    if (a[key] > b[key]) return 1;
    return 0;
  });
}
