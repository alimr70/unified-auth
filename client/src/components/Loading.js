const Loading = () => {
  return (
    <div className="loading">
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
      </div>
      <p className="loading-title">Getting some data from server</p>
    </div>
  );
};

export default Loading;
