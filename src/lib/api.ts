import { PUBLIC_API_URL } from "$env/static/public";

export function cdn(absolutePath: string) {
    return PUBLIC_API_URL.concat(absolutePath);
}