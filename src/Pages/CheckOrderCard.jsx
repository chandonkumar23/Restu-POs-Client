// eslint-disable-next-line react/prop-types
const CheckOrderCard = () => {
 

  return (
    <div>
      <div className="stats stats-vertical lg: flex justify-center mx-autostats-horizontal shadow">
        <div className="stat">
          <div className="stat-title">Total Order</div>
          <div className="stat-value">50</div>
          <div className="stat-desc">Jan 1st - Feb 1st</div>
        </div>

        <div className="stat">
          <div className="stat-title">Total sell</div>
          <div className="stat-value">4,200</div>
          <div className="stat-desc">↗︎ 400 (22%)</div>
        </div>

        <div className="stat">
          <div className="stat-title">Today sell</div>
          <div className="stat-value">1,200</div>
          <div className="stat-desc">↘︎ 90 (14%)</div>
        </div>
      </div>
    </div>
  );
};

export default CheckOrderCard;
