describe('types in TypeScript', () => {
    describe('declaring variables and consts', () => {

        it('explicitly typed local variables', () => {
            let x: number | string; // union type Eg: allows both string and number
            x = 'Hello';
            expect(typeof (x)).toBe('string');
            x = 3.4;
            expect(typeof (x)).toBe('number');
        });

        it('implicitly typed local variables', () => {
            let x = 3.23;
            let z: number | string = 32;
            z = 'sjdfh';

            interface Movie {
                title: string,
                director: string,
                released: number
            }

            let movie1: Movie = {
                title: 'Movie1',
                director: 'Director1',
                released: 2019
            }
            expect(movie1.title).toBe('Movie1');
        });

        it('Constants', () => {
            const name = 'Joe';

            const task = {
                description: 'clean garage',
                completed: false
            }
            task.completed = true;

            const friend = ['Billy', 'Sean', 'Zac', 'Amy'];

            friend[2] = 'Emma';
            expect(friend).toEqual(['Billy', 'Sean', 'Emma', 'Amy']);


        });

    });

    describe('literals', () => {
        it('has string literals', () => {
            expect('tacos').toEqual("tacos");
            const quote = 'She said "it isn\'t over yet!"';
            const quote1 = `She said "it isn\'t over yet!"`;
            const name = "Flannery O'Connel";
            const someEscapeStuff = 'The story is this:\n\nIt was a dark and stormy night\n\n\t\tTHE END';
            console.log(quote);
            console.log(quote1);
            console.log(name);
            console.log(someEscapeStuff);
        });
        it('literal string (interpolated strings)', () => {

            const fragment = `<div>
        <h1>Hello</h1>
        <\div>`;
            console.log(fragment);

            const name = 'Bob';
            const age = 34;

            const message = 'The name is ' + name + ' and age is ' + age;
            const message1 = `The name is ${name} and age is ${age}`;
            expect(message).toEqual(message1);
        });

        it('numbers', () => {
            const n1 = 1;
            const n2 = 1.3;
            let nHex = 0xFF;// base 16
            let nOct = 0o22;// base 8
            let nBin = 0b010101; //base 2
            let nBigNumber = 123_233_232_232.65;
        });

        it('Booleans', () => {
            const isTrue = true;
            const isFalse = false;
            //any value can be implicitly converted to a boolean.
            const name = 'Bob';
            let nameExists = null;
            if (name) {
                nameExists = 'Yep';
            }

            expect(nameExists).toBe('Yep');

            expect("bob").toBeTruthy();
            expect("sue").toBeTruthy();
            expect('').toBeFalsy();
            expect(undefined).toBeFalsy();
            expect(NaN).toBeFalsy();
            expect(undefined).toBeFalsy();
            expect(10).toBeTruthy();
            expect(0).toBeFalsy();
            expect(true).toBeTruthy();
            expect(false).toBeFalsy();
        });

    });

    describe('array literals', () => {
        it('implicitly typed arrays', () => {
            const friends = ['Bill', 'Sara', 'Lee', 'Amy'];
            friends[0] = 'WEUYZ12';

            let luckyNumbers: number[];
            luckyNumbers = [1, 9, 10, 18];

            let otherLuckyNumbers: Array<number>;
            otherLuckyNumbers = [1, 12, 18];

            // union arrays
            let varied: (string | number)[];
            varied = [1, 'sd', 2];

            let varied2: Array<string | number>;
            varied2 = [213, '324', 'sfsd', 34];


        });

        it('array destructuring', () => {
            const films = ['Film1', 'Film2', 'Film3'];

            const [f1, , f2] = films;

            expect(f1).toBe('Film1');
            expect(f2).toBe('Film3');


            const stuffToDo = ['Clean', 'Wash', 'Fix'];
            const [first] = stuffToDo; // const first = stuffToDo[0]
            expect(first).toBe('Clean');


        });


    });

    describe('typed arrays (tuples)', () => {
        it('a practical example - not using a typed array', () => {
            interface FormattedName {
                fullName: string,
                numberOfLetters: number
            }

            function formatName(first: string, last: string): FormattedName {
                const fullName = `${last} ${first}`;
                const numberOfLetters = fullName.length;
                return { fullName, numberOfLetters }
            }

            const result: FormattedName = formatName('Han', 'Solo');
            expect(result.fullName).toBe('Solo Han');
            expect(result.numberOfLetters).toBe(8);

            const { numberOfLetters, fullName } = formatName('Ramesh', 'Lakshmi');

            expect(fullName).toBe('Lakshmi Ramesh');
            expect(numberOfLetters).toBe(14);

            const { fullName: detailedName } = formatName('Cherukuri', 'Lakshmi Ramesh');
            expect(detailedName).toBe('Lakshmi Ramesh Cherukuri');

        });

        it('the same thing as a typed array', () => {

            function formatName(first: string, last: string): [string, number] {
                const fullName = `${last} ${first}`;
                return [fullName, fullName.length];
            }

            const response = formatName('Sam', 'Berlino');
            expect(response[0]).toBe('Berlino Sam');
            expect(response[1]).toBe(11);

            const [name, letters] = formatName('Sam', 'Berlino');
            expect(name).toBe('Berlino Sam');
            expect(letters).toBe(11);

        });

        it('just another example', () => {
            type ArtistTuple = [string, string, string, number];

            let artist: ArtistTuple = ['SP', 'Balu', 'Singer', 70];

            type BirthDate = string | null;

            interface Person {
                name: string;
                dob: BirthDate;
            }

        });

        it('modifying an array in a non-destructive way', () => {
            const friends = ['Amy', 'Bill', 'David'];

            const friends2 = ['Harry', ...friends, 'Larry'];

            expect(friends).toEqual(['Amy', 'Bill', 'David']);
            expect(friends2).toEqual(['Harry', 'Amy', 'Bill', 'David', 'Larry']);

        });


    });

    describe('object literals', () => {
        it('have an implicit type', () => {
            const book = {
                title: 'Reality',
                author: 'Kingsley',
                publisher: 'Random House',
                year: 2008
            };

            //book.publischer = 'OO'; // notice the typo, typescript protects from such things
        });

        it('explicit object literals with an interface', () => {
            interface Book {
                title: string;
                author: string;
                publisher: string;
                year: number;
                subtitle?: string;
            };

            const book1: Book = {
                title: 'Reality',
                author: 'Kingsley',
                publisher: 'Random House',
                year: 2008,
                subtitle: 'cool stuff'
            };

            const book2: Book = {
                title: 'Reality',
                author: 'Kingsley',
                publisher: 'Random House',
                year: 2008
            };

        });

        it('expando objects', () => {
            interface Book {
                title: string;
                author: string;
                publisher: string;
                year: number;
                subtitle?: string;
                [key: string]: any;
            };

            const book1: Book = {
                title: 'Reality',
                author: 'Kingsley',
                publisher: 'Random House',
                year: 2008,
                subtitle: 'cool stuff',
                reviews: ['Interesting', 'A++'],
                genre: 'Philsophy'
            };

            interface Vehicle {
                vin: string;
                make: string;
                model: string;
            }

            interface Vehicles {
                [vin: string]: Vehicle;
            }

            const vehicles: Vehicles = {
                '928398298': { vin: '928398298', make: 'Honda', model: 'Pilot' },
                'J3779739': { vin: 'J3779739', make: 'Chevy', model: 'Bolt' }
            }

            expect(vehicles['J3779739'].model).toBe('Bolt');

            interface Dictionary<T> {
                [key: string]: T
            }

            const library: Dictionary<Book> = {
                'Reality': book1,
                'High Weirdness': { title: 'High Weirdness', author: 'Davis', publisher: 'MIT', year: 2018 }
            }

            expect(library['High Weirdness'].author).toBe('Davis');

        });

        it('structural typing - duck typing', () => {
            let x;

            x = [];
            x = {};

            interface ThingwithBody { body?: string }
            function logMessage(message: ThingwithBody) {

                if (message.body) {
                    console.log(`At ${new Date().toISOString()} you got the following message: ${message.body}`);
                } else {
                    console.log(`At ${new Date().toISOString()} you got the following message: NO BODY PROVIDED`);
                }
            }

            logMessage({ body: 'TACOS!!' });

            const phoneCall = {
                from: 'Mom',
                body: 'Call me, you slacker!'
            }

            logMessage(phoneCall);

            // const call2 = {
            //     from: 'Joe'
            // }
            // logMessage(call2)

            function logMessage2(body?: string) {
                if (body) {
                    console.log(`At ${new Date().toISOString()} you got the following message: ${body}`);
                } else {
                    console.log(`At ${new Date().toISOString()} you got the following message: NO BODY PROVIDED`);
                }
            }

            logMessage2('Hello. Can you bring me a pizza?');
            logMessage2();
        });

    });

    describe('function literals', () => {
        it('three different ways to declare them', () => {

            //Anonymous Functions
            const substract = (a: number, b: number): number => a - b;

            const multiply = function (a: number, b: number): number {
                return a * b;
            }

            expect(add(10, 2)).toBe(12);
            expect(multiply(3, 3)).toBe(9);

            // Named function
            function add(a: number, b: number): number {
                return a + b;
            }
        });

        it('a couple quick details about the syntax for arrow functions', () => {

            type MathOp = (a: number, b: number) => number;

            const add: MathOp = (a, b) => a + b;

            const division: MathOp = (a, b) => {
                if (b === 0) {
                    throw new Error('Are you tyring to open a black hole or something!!');
                } else {
                    return a / b;
                }
            }

            type Identity = (a: number) => number;


            const mockingBird: Identity = a => a;

        });

    });


});