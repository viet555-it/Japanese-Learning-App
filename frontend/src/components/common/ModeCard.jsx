import React from "react";
import { useNavigate } from "react-router-dom";

const ModeCard = ({ japanese, title, path }) => {
  const navigate = useNavigate();
  
  return (
    <div className="flex-1
                 flex flex-col items-center justify-center
                 h-32
                 text-white
                 hover:bg-white/10
                 transition duration-300
                 cursor-pointer"
         onClick={() => navigate(path)}
    >

      <span className="text-3xl mb-2">{japanese}</span>
      <span className="text-xl font-light">{title}</span>
    </div>
  );
};

export default ModeCard;