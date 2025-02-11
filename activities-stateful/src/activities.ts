// in a stateless activity, you would do something like this
// export async function greet(name: string): Promise<string> {
//   return `Hello, ${name}!`;
// }

// in a stateful activity, you would do something like this
export class GreetingActivities {
  private count: number;

  constructor() {
    this.count = 0;
  }

  async greet(name: string): Promise<string> {
    this.count++;
    if (this.count === 5) {
      return `Hello, ${name}!`;
    } else {
      throw new Error('not yet');
    }
  }
}
