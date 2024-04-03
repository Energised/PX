import { BoardData } from './BoardData'

export class BoardDataValidator{

    boardData: BoardData;
    checkValidRow: boolean[];
    checkValidColumn: boolean[];

    isValid: boolean;

    constructor(game: BoardData){
        this.boardData = game;
        this.checkValidRow = [];
        this.checkValidColumn = [];
        this.isValid = false;

        this.validate();
    }

    validate(){
        this.checkValidRow = [];
        this.checkValidColumn = [];
        this.isValid = false;

        this.boardData.boardState.forEach((row : boolean[], index : number) => {
            this.checkValidRow.push(this.isValidBoardStateArray(row, this.filterHintArray(this.boardData.rowHints[index])));
        });

        this.boardData.solvedBoardStateAsColumns.forEach((column : boolean[], index : number) => {
            this.checkValidColumn.push(this.isValidBoardStateArray(column, this.filterHintArray(this.boardData.columnHints[index])));
        });

        this.isValid = this.checkValidRow.every((value : boolean) => value)
                    && this.checkValidColumn.every((value : boolean) => value);
    }

    isValidBoardStateArray(boardArray : boolean[], hints : number[]) : boolean{
        let currentState : number[] = [];
        let countsOfOne = 0;
        for(let s of boardArray){
            if(s) countsOfOne++;
            if(!s && countsOfOne > 0){
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
}