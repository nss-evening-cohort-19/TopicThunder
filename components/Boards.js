import React, { useEffect, useState } from 'react';
import { getAllBoards } from '../api/boardsData';
import BoardCard from './BoardCard';

export default function Boards() {
  const [boards, setBoards] = useState([]);

  const getAllThoseBoards = () => {
    getAllBoards().then(setBoards);
  };

  useEffect(() => {
    getAllThoseBoards();
  }, []);

  return (
    <>
      <div>boards</div>
      <div className="d-flex flex-wrap">
        {boards.map((board) => (
          <BoardCard boardObj={board} key={board.firebaseKey} src={board.image} onUpdate={getAllThoseBoards} />
        ))}
      </div>
    </>
  );
}
