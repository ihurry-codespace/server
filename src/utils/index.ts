export function range (start: number, end: number): any[] {
  return Array.from(
    Array(end - start + 1)
      .keys()
  ).map(i => i + start)
}
