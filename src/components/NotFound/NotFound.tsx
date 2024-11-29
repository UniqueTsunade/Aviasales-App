import React from "react";
import style from "../../styles/components/not-found.module.scss";
import detective from "../../assets/detective.png";

const NotFound = () => {
  return (
    <div className={style.banner}>
      <p>Рейсов, подходящих под заданные фильтры, не найдено</p>
      <img src={detective} alt="Detective" />
    </div>
  );
};

export default NotFound;
