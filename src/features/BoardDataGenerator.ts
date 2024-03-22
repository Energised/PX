export default class BoardDataGenerator{

    width: number;
    height: number;

    boardState: boolean[][];
    columnHints: number[][];
    rowHints: number[][];

    constructor(width: number, height: number){
        this.width = width;
        this.height = height;

        this.boardState = [];
        this.columnHints = [];
        this.rowHints = [];

        this.generateBoardState();
        this.generateColumnHints();
        this.generateRowHints();
    }

    // build picross data

    generateBoardState() : void{
        let newRow : boolean[] = [];
        let newState : boolean = false;
        for(let h = 0; h < this.height; h++){
            for(let w = 0; w < this.width; w++){
                newState = this.getRandomBlockValue();
                newRow.push(newState);
            }
            this.boardState.push(newRow);
            newRow = [];
        }
    }

    generateColumnHints() : void{
        
    }

    generateRowHints() : void{

    }

    // general methods

    getRandomBlockValue() : boolean{
        let valueAsNumber : number = this.randomNumberFrom0To(100) % 2;
        return !!valueAsNumber; // bang bang you're a boolean (actually works and is favourable in ts)
    }

    randomNumberFrom0To(value: number): number{
        return Math.floor(Math.random() * value);
    }

}