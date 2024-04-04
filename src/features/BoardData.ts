import { BlockState } from "./BlockState"

export class BoardData{

    width: number;
    height: number;

    boardState: BlockState[][];
    columnHints: number[][];
    rowHints: number[][];

    // useful for validation, not used for board display
    solvedBoardState: BlockState[][];
    solvedBoardStateAsColumns: BlockState[][];

    constructor(width: number, height: number){
        this.width = width;
        this.height = height;

        this.boardState = [];
        this.solvedBoardState = [];
        this.solvedBoardStateAsColumns = [];
        this.columnHints = [];
        this.rowHints = [];

        this.generateBoardState();
        this.generateSolvedBoardState();
        this.generateColumnHints();
        this.generateRowHints();
    }

    // regenerate board

    update(width: number, height: number): void{
        this.width = width;
        this.height = height;
        
        this.boardState = [];
        this.solvedBoardState = [];
        this.solvedBoardStateAsColumns = [];
        this.columnHints = [];
        this.rowHints = [];

        this.generateBoardState();
        this.generateSolvedBoardState();
        this.generateColumnHints();
        this.generateRowHints();
    }

    generateBoardState() : void{
        let newRow : BlockState[] = [];
        let newState : BlockState = BlockState.Empty;
        for(let h = 0; h < this.height; h++){
            for(let w = 0; w < this.width; w++){
                newRow.push(newState);
            }
            this.boardState.push(newRow);
            newRow = [];
        }
    }

    generateSolvedBoardState() : void{
        let newRow : BlockState[] = [];
        let newState : BlockState = BlockState.Empty;
        for(let h = 0; h < this.height; h++){
            for(let w = 0; w < this.width; w++){
                newState = this.getRandomBlockValueAsBlockState();
                newRow.push(newState);
            }
            this.solvedBoardState.push(newRow);
            newRow = [];
        }
    }

    /* 
     * By default boardState is row-aligned - meaning each sub-array represents a row on
     * the Picross board from top to bottom
     */
    generateColumnHints() : void{
        let vm = this;
        this.solvedBoardStateAsColumns = this.generateColumnAlignedBoardState();
        this.columnHints = generateColumnHints();
        this.applyPreceedingZeroesToHints(this.columnHints);

        function generateColumnHints() : number[][]{
            let columnHints : number[][] = [];
            
            let columnAsHints : number[] = [];
            let countsOfOne = 0;
            for(let w = 0; w < vm.width; w++){
                let boardStateColumn : BlockState[] = vm.solvedBoardStateAsColumns[w];
                for(let h = 0; h < vm.height; h++){
                    // if current element is true
                    if(boardStateColumn[h] == BlockState.Filled){
                        countsOfOne++;
                    }
                    // if current run of trues is finished
                    if(boardStateColumn[h] == BlockState.Empty && countsOfOne != 0){
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
                let boardStateColumn : BlockState[] = vm.solvedBoardState[h];
                for(let w = 0; w < vm.width; w++){
                    // if current element is true
                    if(boardStateColumn[w] == BlockState.Filled){
                        countsOfOne++;
                    }
                    // if current run of trues is finished
                    if(boardStateColumn[w] == BlockState.Empty && countsOfOne != 0){
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

    generateColumnAlignedBoardState() : BlockState[][]{
        let columnAlignedBoardState : BlockState[][] = [];
        let column : BlockState[] = [];

        for(let w = 0; w < this.width; w++){
            for(let h = 0; h < this.height; h++){
                column.push(this.solvedBoardState[h][w]);
            }
            columnAlignedBoardState.push(column);
            column = [];
        }

        return columnAlignedBoardState;
    }

    getRandomBlockValueAsBlockState() : BlockState{
        let valueAsNumber : number = this.randomNumberFrom0To(100) % 2;
        return valueAsNumber == 1 ? BlockState.Filled : BlockState.Empty;
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