describe('functions', () => {

    it('overloading (spoiler: you cannot do it)', () => {

        function formatName(first: string, last: string, mi?: string): string {
            let fullName = `${last}, ${first}`;
            if (mi) { // mi !== null || mi !== undefined || mi !== ""
                fullName += ` ${mi}.`;
            }
            return fullName;
        }

        expect(formatName('Han', 'Solo')).toBe('Solo, Han');
        expect(formatName('Han', 'Solo', 'D')).toBe('Solo, Han D.');
    });

    it('default values for parameters', () => {

        function add(a: number = 2, b: number = 10): number {
            return a + b;
        }

        expect(add()).toBe(12);
        expect(add(undefined, undefined)).toBe(12);
        expect(add(10)).toBe(20);
        expect(add(undefined, 10)).toBe(12);
    });

    it('rest operator', () => {
        function add(a: number, b: number, ...rest: number[]) {
            const firstTwo = a + b;
            return rest.reduce((s, n) => s + n, firstTwo);
        }

        expect(add(2, 2)).toBe(4);
        expect(add(1, 2, 3, 4, 5, 6, 7, 8, 9)).toBe(45);
    });

});


describe('array methods', () => {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    it('visiting each element of an array', () => {
        numbers.forEach((e) => {
            console.log('Got', { e });
        });

        numbers.forEach((v, i, a) => {
            console.log('Got', { v, i, a });
        });
    });

    describe('array methods that return a new array', () => {

        it('has filter', () => {

            const evens = numbers.filter(n => n % 2 === 0);

            expect(evens).toEqual([2, 4, 6, 8]);

        });

        it('has map', () => {
            // transform one array to another
            const astrings = numbers.map((n) => n.toString());
            expect(astrings).toEqual(['1', '2', '3', '4', '5', '6', '7', '8', '9']);

            const doubled = numbers.map(n => n * 2);
            expect(doubled).toEqual([2, 4, 6, 8, 10, 12, 14, 16, 18]);
        });

        describe('that return a single (scalar) ', () => {

            it('tallying a shopping cart', () => {

                interface CartItem {
                    id: string;
                    description: string;
                    qty: number;
                    price: number;
                }

                const cart: CartItem[] = [
                    { id: '1', description: 'Beer', qty: 1, price: 6.99 },
                    { id: '2', description: 'Shampoo', qty: 2, price: 4.50 },
                    { id: '3', description: 'Soap', qty: 12, price: 1.99 },
                ];

                function itemPrice(item: CartItem): number {
                    return item.qty * item.price;
                }

                const total = cart.reduce((amount: number, item: CartItem) => amount + itemPrice(item), 0);

                expect(total).toEqual(39.87);
            });

            it('bowling scores', () => {

                interface BowlingGame {
                    name: string;
                    score: number;
                }

                const games: BowlingGame[] = [
                    { name: 'Jeff', score: 127 },
                    { name: 'Stacy', score: 223 },
                    { name: 'Violet', score: 187 },
                    { name: 'Henry', score: 270 }
                ];

                //const highScorers = games.reduce(() =>)

                //expect(highScorers).toEqual(['Henry got a 270', 'Stacy got 223']);

                interface Summary {
                    highScorer: string;
                    highScore: number;
                    lowScorer: string;
                    lowScore: number;
                }

                const initialSummary: Summary = {
                    highScore: -1,
                    highScorer: null,
                    lowScore: 301,
                    lowScorer: null
                }

                const result: Summary = games.reduce((summary: Summary, next: BowlingGame) => {
                    return {
                        highScore: next.score > summary.highScore ? next.score : summary.highScore,
                        highScorer: next.score > summary.highScore ? next.name : summary.highScorer,
                        lowScore: next.score < summary.lowScore ? next.score : summary.lowScore,
                        lowScorer: next.score < summary.lowScore ? next.name : summary.lowScorer,
                    }
                }, initialSummary);

                expect(result).toEqual({
                    highScore: 270,
                    highScorer: 'Henry',
                    lowScore: 127,
                    lowScorer: 'Jeff'
                });

            });

        });

    });

});

describe('higher order functions', () => {

    it('an imperative tagMaker', () => {


        // <element>content</element>
        function tagMaker(element: string, content: string) {
            return `<${element}>${content}</${element}>`;
        }

        expect(tagMaker('name', 'Bob Smith')).toBe('<name>Bob Smith</name>');
        expect(tagMaker('pay', '$4,231.52')).toBe('<pay>$4,231.52</pay>');
        expect(tagMaker('pay', '$500')).toBe('<pay>$500</pay>');
        expect(tagMaker('pay', '$4')).toBe('<pay>$4</pay>');

    });

    it('an object oriented approach', () => {

        class TagMaker {
            // private element:string;

            // constructor(element: string) {
            //     this.element = element;
            // }

            constructor(private element: string) { }

            make(content: string) {
                return `<${this.element}>${content}</${this.element}>`;
            }
        }

        const nameMaker = new TagMaker('name');
        const payMaker = new TagMaker('pay');

        expect(nameMaker.make('Bob Smith')).toBe('<name>Bob Smith</name>');
        expect(nameMaker.make('Dale Cooper')).toBe('<name>Dale Cooper</name>');
        expect(payMaker.make('$23.00')).toBe('<pay>$23.00</pay>');


    });

    it('a functional approach', () => {
        function tagMaker(element: string): (content: string) => string {
            return function (content: string) {
                return `<${element}>${content}</${element}>`;
            }
        }

        const nameMaker = tagMaker('name');
        const payMaker = tagMaker('pay');

        expect(nameMaker('Leland')).toBe('<name>Leland</name>');
        expect(nameMaker('Harry S. Truman')).toBe('<name>Harry S. Truman</name>');
        expect(payMaker('$32.52')).toBe('<pay>$32.52</pay>');
    });

    it('funtion that takes a function', () => {
        function formatName(first: string, last: string, decorator: (n: string) => string = (n) => n) {
            return decorator(`${last}, ${first}`);
        }

        expect(formatName('Han', 'Solo')).toBe('Solo, Han');
        expect(formatName('Han', 'Solo', padForCheck)).toBe('***Solo, Han***');
        expect(formatName('Han', 'Solo', x => x.toUpperCase())).toBe('SOLO, HAN');


        function padForCheck(name: string): string {
            return '***' + name + '***';
        }
    });
});