export class Listpkm {
    count:    number;
    next:     string;
    previous: null;
    results:  Result[];

    constructor() {
        this.count = 0;
        this.next = '';
        this.previous = null;
        this.results = [];
    }
}

export class Result {
    name: string;
    url:  string;
    img!: string;

    constructor() {
        this.name = '';
        this.url = '';
    }
}
