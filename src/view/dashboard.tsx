import React, { useEffect, useState } from "react";
import './dashboard.css'

type DragItem = {
  name: string,
  id: number
}

type DragItemProp = {
  data: DragItem,
  index: number,
  swapBoard: object
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
  const { data, index } = props;

  const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    const target = event.target as HTMLDivElement;
    event.dataTransfer.setData("index", index + "");
    event.dataTransfer.effectAllowed = "move"
  }

  const handleDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move"
  }

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();

  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const target = event.target as HTMLDivElement;

    const id = event.dataTransfer.getData("text/plain")
    console.log("element dropped", event, id)
    // target.appendChild(document.getElementById(id) as Node)
  }
  
  return (
    <div className="drag-item" 
      draggable 
      onDragStart={handleDragStart}
      onDragEnter={handleDragEnter}>
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

  const swapBoard = (delIndex: string, swapIndex: string) => {
    // board.splice(parseInt(delIndex), 1, )
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