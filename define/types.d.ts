declare module '*/define.json' {
  const value: Define;
  export default value;
}

declare interface Define {
  flickr: {
    apiKey: string,
    userId: string
  }
}
