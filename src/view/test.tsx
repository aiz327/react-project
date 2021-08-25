import React, {DragEventHandler, useEffect, useState} from "react";
import './dashboard.css'

function useIsAdmin() {
  const [userAuth, setUserAuth] = useState("guest");
  useEffect(() => {
    setTimeout(() => {
      setUserAuth("admin")
    }, 1000);
  }, [])
  return userAuth
}

function PanelView() {
  const [panel, setPanel] = useState(1)
  const handleDrop = (event: any) => {
    console.log("element dropped", event)
  }
  const handleDragStart = (event: any) => {
    console.log("element drag start", event)
  }
  return (
    <div>
      <div>this is panel {panel}</div>
      <div className="panel" draggable onDragStart={handleDragStart}>this is draggable element</div>
      <div className="panel" onDrop={handleDrop}>this is container</div>
    </div>
  )
}

function DashBoardView() {
  const [board, setBoard] = useState(1)
  const isAdmin = useIsAdmin()
  return (
    <div>
      test board123, {isAdmin === 'admin' ? board : 'no auth'}
      <PanelView></PanelView>
    </div>
  )
}

export default DashBoardView;