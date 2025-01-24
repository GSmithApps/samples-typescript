export async function myActivity(value: string): Promise<string> {
  return new Promise(resolve => setTimeout(() => resolve(`Activity finished with value ${value}`), 1 * 1000));
}
