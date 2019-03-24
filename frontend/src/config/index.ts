

export const server_port: number = 4000 || location.port;
export const server_url = `${location.protocol}//${location.hostname}:${server_port}`;
export const server_ws = `${location.protocol}//${location.hostname}:${server_port}/ws`;
