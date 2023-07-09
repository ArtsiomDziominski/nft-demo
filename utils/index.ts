export function addressForServer(address: string): string[] {
    const addressFirst = address.slice(0, 18);
    const addressEnd = address.slice(18);
    return [addressFirst, addressEnd]
}

export const dateAndTime = (date: string) => {
  return `${new Date(date).getMonth()}/${new Date(date).getDay()}/${new Date(date).getFullYear()}`
}