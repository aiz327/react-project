import React, { useEffect, useState } from "react";
import './dashboard.css'

type DragItem = {
  name: string,
  id: number
}

type DragItemProp = {
  data: DragItem,
  index: number,
  swapBoard: (delIndex: number, swapIndex: number) => void
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
  const { data, index: swapIndex, swapBoard } = props;

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
  
  return (
    <div className="drag-item" 
      draggable 
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

  return (
    <div className="drop-container">
      {
        board.map((props, index) => <DragItem swapBoard={swapBoard} data={props} index={index}></DragItem>)
      }
    </div>
  )
}

export default DashBoardView;