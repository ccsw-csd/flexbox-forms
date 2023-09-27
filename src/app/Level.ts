export class Level {
    id: number = 0;
    description: string = '';
    templateCode: string = '';
    templateStyle: string = '';

    checkTags: string[] = [];
    decodeCode?: string = '';

    public constructor(init?:Partial<Level>) {
        Object.assign(this, init);
    }
}