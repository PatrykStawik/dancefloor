// return random color eg: "#123456"
export const getRandomColor = (): string => `#${Math.floor(Math.random() * 16777215).toString(16)}`;