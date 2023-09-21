export default function argsCurrent(): compileParse;
export declare function argsString(str: string): compileParse;
export declare function argsParser(args: string[]): compileParse;
interface compileParse {
    _: string[];
    [index: string]: string | boolean | string[];
}
export {};
