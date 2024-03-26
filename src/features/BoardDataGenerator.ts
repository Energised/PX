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

    // regenerate board

    update(width: number, height: number): void{
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

    /* 
     * By default boardState is row-aligned - meaning each sub-array represents a row on
     * the Picross board from top to bottom
     */
    generateColumnHints() : void{
        let vm = this;
        let boardStateAsColumns : boolean[][] = getColumnAlignedBoardState();
        this.columnHints = generateColumnHints();
        this.applyPreceedingZeroesToHints(this.columnHints);

        function getColumnAlignedBoardState() : boolean[][]{
            let columnAlignedBoardState : boolean[][] = [];
            let column : boolean[] = [];

            for(let w = 0; w < vm.width; w++){
                for(let h = 0; h < vm.height; h++){
                    column.push(vm.boardState[h][w]);
                }
                columnAlignedBoardState.push(column);
                column = [];
            }

            return columnAlignedBoardState;
        }

        function generateColumnHints() : number[][]{
            let columnHints : number[][] = [];
            
            let columnAsHints : number[] = [];
            let countsOfOne = 0;
            for(let w = 0; w < vm.width; w++){
                let boardStateColumn : boolean[] = boardStateAsColumns[w];
                for(let h = 0; h < vm.height; h++){
                    // if current element is true
                    if(boardStateColumn[h]){
                        countsOfOne++;
                    }
                    // if current run of trues is finished
                    if(boardStateColumn[h] == false && countsOfOne != 0){
                        columnAsHints.push(countsOfOne);
                        countsOfOne = 0;
                        continue;
                    }
                }
                // if the row/column ended on a one
                if(countsOfOne > 0){
                    columnAsHints.push(countsOfOne);
                    countsOfOne = 0;
                }
                columnHints.push(columnAsHints);
                columnAsHints = [];
            }
            return columnHints;
        }
    }

    generateRowHints() : void{
        let vm = this;
        this.rowHints = generateRowHints();
        this.applyPreceedingZeroesToHints(this.rowHints);

        function generateRowHints() : number[][]{
            let rowHints : number[][] = [];

            let rowAsHints : number[] = [];
            let countsOfOne = 0;
            for(let h = 0; h < vm.height; h++){
                let boardStateColumn : boolean[] = vm.boardState[h];
                for(let w = 0; w < vm.width; w++){
                    // if current element is true
                    if(boardStateColumn[w]){
                        countsOfOne++;
                    }
                    // if current run of trues is finished
                    if(boardStateColumn[w] == false && countsOfOne != 0){
                        rowAsHints.push(countsOfOne);
                        countsOfOne = 0;
                        continue;
                    }
                }
                // if the row/column ended on a one
                if(countsOfOne > 0){
                    rowAsHints.push(countsOfOne);
                    countsOfOne = 0;
                }
                rowHints.push(rowAsHints);
                rowAsHints = [];
            }
            return rowHints;
        }
    }

    // general methods

    getRandomBlockValue() : boolean{
        let valueAsNumber : number = this.randomNumberFrom0To(100) % 2;
        return !!valueAsNumber; // bang bang you're a boolean (actually works and is favourable in ts)
    }

    randomNumberFrom0To(value: number): number{
        return Math.floor(Math.random() * value);
    }

    applyPreceedingZeroesToHints(hints : number[][]) : void{
        let longestHintList : number = Math.max(...hints.map(h => h.length));

        for(let hintArray of hints){
            if(hintArray.length < longestHintList){
                let numberOfZerosToAdds = longestHintList - hintArray.length;
                hintArray.unshift(...Array(numberOfZerosToAdds).fill(0));
            }
        }
    }

}