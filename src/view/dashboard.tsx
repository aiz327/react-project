import React, { MouseEventHandler, useCallback, useEffect, useMemo, useState } from "react";
import './dashboard.css'

type DragItem = {
  name: string,
  id: number
}

type DragItemProp = {
  data: DragItem,
  index: number,
  swapBoard: (delIndex: number, swapIndex: number) => void,
  // onClick: (event: React.MouseEvent, dragItem: DragItem) => void
  onClick(event: React.MouseEvent, dragItem?: DragItem): void,
  [key: string]: any
};

function useIsAdmin() {
  const [userAuth, setUserAuth] = useState("guest");
  useEffect(() => {
    setTimeout(() => {
      setUserAuth("admin")
    }, 1000);
  }, [])
  return userAuth
}

function DragItem(props: DragItemProp) {
  const [panel, setPanel] = useState(1)
  const { data, index: swapIndex, swapBoard, onClick, testFn } = props;

  const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    const target = event.target as HTMLDivElement;
    event.dataTransfer.setData("index", swapIndex + "");
    event.dataTransfer.effectAllowed = "all"
  }

  const handleDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move"
  }

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move"
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const target = event.target as HTMLDivElement;
    const delIndex = event.dataTransfer.getData("index")
    swapBoard(parseInt(delIndex), swapIndex)
  }

  const handlClick = (event: React.MouseEvent) => {
    onClick(event, data);
    console.log('testfn', testFn())
  }
  
  return (
    <div className="drag-item" 
      draggable 
      onClick={handlClick}
      onDragStart={handleDragStart}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDrop={handleDrop}>
      {data.name}
    </div>
  )
}

function DashBoardView() {
  const [board, setBoard] = useState<Array<DragItem>>([
    {
      id: 1,
      name: "面板1"
    },
    {
      id: 2,
      name: "面板2"
    },
    {
      id: 3,
      name: "面板3"
    }
  ])
  const [currentBoard, setCurrentBoard] = useState<DragItem>();

  const swapBoard = (delIndex: number, swapIndex: number) => {
    const swapObj = board[swapIndex]
    const deleteObj = board[delIndex]
    if (delIndex > swapIndex) {
      board.splice(delIndex, 1)
      board.splice(swapIndex, 0, deleteObj)
    } else {
      board.splice(swapIndex + 1, 0, deleteObj)
      board.splice(delIndex, 1)
    }
    setBoard([...board])
  }

  const memoValue = useMemo(() => currentBoard?.id, [currentBoard]);

  const boardClick = (event: React.MouseEvent, dragItem: DragItem) : void => {
    setCurrentBoard(dragItem)
  }

  const memoCallBack = useCallback(() => currentBoard?.id, [currentBoard])

  return (
    <div className="drop-container">
      {
        board.map((props, index) => <DragItem testFn={memoCallBack} onClick={boardClick} swapBoard={swapBoard} data={props} index={index}></DragItem>)
      }
      <div>
        <div>memo和callback</div>
        <div>{memoValue}</div>
      </div>
    </div>
  )
}

export default DashBoardView;