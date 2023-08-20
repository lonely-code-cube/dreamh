import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load({ url, fetch }) {
    const src = url.searchParams.get('src');
    const isJson = url.searchParams.get('json') || false;
    console.log(src, isJson);
    if (src) {
        try {
            new URL(src);
        } catch {
            throw error(400, "Invalid video source/config");
        }
        if (!isJson) {
            return {
                m3u8: true,
                json: false,
                src: src,
            }
        } else {
            let res;
            try {
                res = await fetch(src);
            } catch {
                throw error(424, "Failed to load stream config");
            }
            if (res.ok) {
                let config;
                try {
                    config = await res.json();
                } catch {
                    throw error(424, "Could not parse config json");
                }
                return {
                    m3u8: false,
                    json: true,
                    src,
                    config,
                }
            } else {
                throw error(424, `Invalid config status code [${res.status}]`);
            }
        }
    }
    return {
        src: null,
    }
}