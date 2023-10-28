import moo from "moo";

export let lexer = moo.compile({
    WS: /[ \t]+/,
    number: /0|[1-9][0-9]*/,
    lparam: '(',
    rparam: ')',
    lbraket: '[',
    rbraket: ']',
    lbrace: '{',
    rbrace: '}',
    bold: /\*\*/,
    underline: "__",
    italics: "_",
    spoiler: '||',
    strike: '~~',
    quote: />\s+/,
    bullet: /-\s+/,
    h1: /#\s+/,
    h2: /##\s+/,
    keyword: ['@center', '@img', '@url', '@rgb', '@animatedrgb'],
    NL: { match: /\n/, lineBreaks: true },
    char: /./
});

class State {
    nl_stack: Array<string>;
    bold: boolean;
    underline: boolean;
    italics: boolean;
    spoiler: boolean;
    strike: boolean;
    keyword: string | undefined;
    constructor() {
        this.nl_stack = Array();
        this.bold = false;
        this.underline = false;
        this.italics = false;
        this.spoiler = false;
        this.strike = false;
    }

    popNL(): string {
        const nlpre = this.nl_stack.reverse().join('');
        this.nl_stack = Array();
        return nlpre;
    }
}

export function linoParse(lexer: moo.Lexer): string {
    let content = "";
    let state = new State();

    let token = lexer.next();
    while (token) {
        switch (token.type) {
            case "char":
            case "WS":
            case "number":
                content += token.value;
                break;
            case "NL":
                content += state.popNL();
                content += '\n';
            case "keyword":
                switch (token.value) {
                    case "@center":
                        break;
                    case "@img":
                        break;
                    case "@link":
                        break;
                    case "@rgb":
                        break;
                }
                break;
            case "bold":
                if (!state.bold) {
                    content += '<span class="__lino_bold">';
                } else {
                    content += '</span>';
                }
                state.bold = !state.bold;
                break;
            case "italics":
                if (!state.italics) {
                    content += '<span class="__lino_italics">';
                } else {
                    content += '</span>';
                }
                state.italics = !state.italics;
                break;
            case "underline":
                if (!state.underline) {
                    content += '<span class="__lino_underline">';
                } else {
                    content += '</span>';
                }
                state.underline = !state.underline;
                break;
            case "spoiler":
                if (!state.underline) {
                    content += '<span class="__lino_spoiler">';
                } else {
                    content += '</span>';
                }
                state.underline = !state.underline;
                break;
            case "bullet":
                content += '<span class="__lino_bullet">';
                state.nl_stack.push('</span>');
                break;
            case "h1":
                content += '<span class="__lino_h1">';
                state.nl_stack.push('</span>');
                break;
            case "h2":
                content += '<span class="__lino_h2">';
                state.nl_stack.push('</span>');
                break;

        }
        token = lexer.next();
    }

    return content;
}