import { BoardData } from './BoardData'
import { BlockState } from './BlockState';

export class BoardDataValidator{

    boardData: BoardData;
    boardStateAsColumns: BlockState[][];
    checkValidRow: boolean[];
    checkValidColumn: boolean[];

    isValid: boolean;

    constructor(game: BoardData){
        this.boardData = game;
        this.boardStateAsColumns = [];
        this.checkValidRow = [];
        this.checkValidColumn = [];
        this.isValid = false;

        this.validate();
    }

    validate(){
        this.boardStateAsColumns = this.buildBoardStateAsColumns();
        this.checkValidRow = [];
        this.checkValidColumn = [];
        this.isValid = false;

        this.boardData.boardState.forEach((row : BlockState[], index : number) => {
            this.checkValidRow.push(this.isValidBoardStateArray(row, this.filterHintArray(this.boardData.rowHints[index])));
        });

        this.boardStateAsColumns.forEach((column : BlockState[], index : number) => {
            this.checkValidColumn.push(this.isValidBoardStateArray(column, this.filterHintArray(this.boardData.columnHints[index])));
        });

        this.isValid = this.checkValidRow.every((value : boolean) => value)
                    && this.checkValidColumn.every((value : boolean) => value);
    }

    isValidBoardStateArray(boardArray : BlockState[], hints : number[]) : boolean{
        let currentState : number[] = [];
        let countsOfOne = 0;
        for(let s of boardArray){
            if(s == BlockState.Filled) countsOfOne++;
            if([BlockState.Empty, BlockState.Hinted, BlockState.Crossed].includes(s) && countsOfOne > 0){
                currentState.push(countsOfOne);
                countsOfOne = 0;
            }
        }
        if(countsOfOne > 0) currentState.push(countsOfOne);
        if(currentState.length != hints.length) return false;

        return JSON.stringify(hints) == JSON.stringify(currentState);
    }

    /* 
     * BoardData pads hint arrays with 0s for display purposes
     * Think I'll do away with this and redo it as part of the App rather than the data object 
     */

    filterHintArray(hintArray: number[]): number[]{
        return hintArray.filter(h => h != 0);
    }

    buildBoardStateAsColumns() : BlockState[][]{
        let columnAlignedBoardState : BlockState[][] = [];
        let column : BlockState[] = [];

        for(let w = 0; w < this.boardData.width; w++){
            for(let h = 0; h < this.boardData.height; h++){
                column.push(this.boardData.boardState[h][w]);
            }
            columnAlignedBoardState.push(column);
            column = [];
        }
        return columnAlignedBoardState;
    }
}