const LoadMoreDataBtn = ({ state, fetchDataFun }) => {
  if (state !== null && state.totalDocs > state.results.length) {
    return (
      <div className="flex ">
        <button
          className=" text-xl pb-8 text-dark-grey"
          onClick={() => fetchDataFun({ page: state.page + 1 })}
        >
          Load More
        </button>
      </div>
    );
  }
  return;
};

export default LoadMoreDataBtn;
